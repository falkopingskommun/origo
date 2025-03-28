import { Component, Button, dom } from '../ui';
import EditorToolbar from './editor/editortoolbar';
import EditHandler from './editor/edithandler';

const Editor = function Editor(options = {}) {
  const {
    autoForm = false,
    autoSave = true,
    isActive = true,
    featureList = true
  } = options;
  let editorButton;
  let target;
  let viewer;
  let isVisible = isActive;
  let editorToolbar;
  let toolbarVisible = false;
  /** Keeps track of the last selected item in featureinfo. We need to use our own variable for this
   * in order to determine if editor got activated directly from featureinfo or some other tool has been active between. */
  let lastSelectedItem;
  let lasteditlayer;

  /** The handler were all state is kept */
  let editHandler;
  const toggleState = function toggleState() {
    const detail = {
      name: 'editor',
      active: editorButton.getState() === 'initial'
    };
    // There are some serious event dependencies between viewer, editor, edithandler, editortoolbar, editorlayers, dropdown and editorbutton,
    // which makes it almost impossible to do things in correct order.
    isVisible = detail.active;
    // Actually, if we're going visible
    if (isVisible) {
      if (lastSelectedItem && lastSelectedItem.getLayer().get('editable') && !lastSelectedItem.getLayer().get('isTable')) {
        // Set a preselected feature. No use to set layer in handler as toolbar keeps state that will override a change of layer in handler anyway
        // when editor toolbar becomes visible.
        editHandler.preselectFeature(lastSelectedItem.getFeature());
        // Have to set layer in toolbar instead of handler.
        editorToolbar.changeActiveLayer(lastSelectedItem.getLayer().get('name'));
      }
    }
    viewer.dispatch('toggleClickInteraction', detail);
  };

  const onActive = function onActive() {
    editorToolbar.toggleToolbar(true);
    toolbarVisible = true;
  };

  const onInitial = function onInitial() {
    editorToolbar.toggleToolbar(false);
    toolbarVisible = false;
  };

  async function createFeature(layerName, geometry = null) {
    const feature = await editHandler.createFeature(layerName, geometry);
    return feature;
  }

  async function deleteFeature(featureId, layerName) {
    await editHandler.deleteFeature(featureId, layerName);
  }

  function editFeatureAttributes(featureId, layerName) {
    editHandler.editAttributesDialog(featureId, layerName);
  }

  // FMB Släcker det aktiva redigeringslagret och tänder
  const turnOnLastEditableLayer = function turnOnLastEditableLayer() {
    if (lasteditlayer) {
      lasteditlayer.setVisible(true);
    }
  };

  const turnOffEditableLayers = function turnOffEditableLayers() {
    const layers = viewer.getLayersByProperty('editable', true);
    layers.forEach((el) => {
      // eslint-disable-next-line no-underscore-dangle
      if (el.values_.visible === true) {
        lasteditlayer = el;
        el.setVisible(false);
      }
      el.setVisible(false);
    });
  };

  const setEditableLayers = function setEditableLayers() {
    const layers = viewer.getLayersByProperty('editable', true);
    layers.forEach((el) => {
      // eslint-disable-next-line no-underscore-dangle
      if (el.values_.visible === true) {
        lasteditlayer = el;
      }
    });
  };
  // FMS
  return Component({
    name: 'editor',
    onAdd(evt) {
      viewer = evt.target;
      target = `${viewer.getMain().getMapTools().getId()}`;
      const editableLayers = viewer.getLayersByProperty('editable', true, true);
      const editableFeatureLayers = editableLayers.filter(l => !viewer.getLayer(l).get('isTable'));
      const currentLayer = options.defaultLayer || editableLayers[0];
      const toolbarOptions = Object.assign({}, options, {
        autoSave,
        currentLayer,
        editableLayers: editableFeatureLayers,
        isActive,
        viewer,
        modifyTools: options.modifyTools
      });
      const handlerOptions = Object.assign({}, options, {
        autoForm,
        autoSave,
        currentLayer,
        editableLayers,
        isActive,
        featureList
      });
      editHandler = EditHandler(handlerOptions, viewer);
      // Relay selected features from handler to toolbar so toolbar can calculate which tools are available for the current situation
      editHandler.on('select', (f) => {
        editorToolbar.setSelection(f);
      });
      editorToolbar = EditorToolbar(toolbarOptions);
      // Set active modify tool when selected in toolbar
      editorToolbar.on('modifytoolchanged', (e) => {
        editHandler.setModifyTool(e);
      });

      // Set up eventhandler for when featureinfo selects (or highlights) a feature
      const featureInfo = viewer.getFeatureinfo();
      featureInfo.on('changeselection', detail => {
        if (isVisible) {
          // This can only happen if featureInfo.ShowFeatureInfo, featureInfo.showInfow or featureInfo.render is called
          // from api, as featureInfo component can not be active when editor is so the user can not click in the map to select anything.
          if (detail && detail.getLayer().get('editable') && !detail.getLayer().get('isTable')) {
            // Set a preselected feature.
            editHandler.preselectFeature(detail.getFeature());
            // Actually change active layer.
            editHandler.setActiveLayer(detail.getLayer().get('name'));
            // Have to update state in toolbar as well.
            editorToolbar.changeActiveLayer(detail.getLayer().get('name'));
            // Clear featureinfo to close the popup which otherwise would just be annoying
            featureInfo.clear();
          }
        } else {
          lastSelectedItem = detail;
        }
      });

      // Set up eventhandler for when featureinfo clears selection
      // Event is sent from featureinfo when popup etc is closed or cleared, but not when tool changes
      featureInfo.on('clearselection', () => {
        lastSelectedItem = null;
      });
      // FM Turn on and off last edited layer
      viewer.on('toggleClickInteraction', (detail) => {
        if (detail.name === 'editor' && detail.active) {
          editorButton.dispatch('change', { state: 'active' });
          turnOnLastEditableLayer();
        } else if (detail.name === 'editor') {
          turnOffEditableLayers();
          editorButton.dispatch('change', { state: 'initial' });
        } else {
          // Someone else got active. Ditch the last selected item as we don't go directly from featureinfo to edit
          lastSelectedItem = null;
          setEditableLayers();
          editorButton.dispatch('change', { state: 'initial' });
        }
      });
      this.addComponent(editorButton);
      this.addComponent(editorToolbar);
      this.render();
    },
    onInit() {
      const state = isActive ? 'active' : 'initial';
      editorButton = Button({
        cls: 'o-menu-button padding-small icon-smaller round light box-shadow o-tooltip',
        click() {
          toggleState();
        },
        icon: '#fa-pencil-ruler',
        tooltipText: 'Redigera',
        tooltipPlacement: 'east',
        state,
        methods: {
          active: onActive,
          initial: onInitial
        }
      });
    },
    hide() {
      document.getElementById(editorButton.getId()).classList.add('hidden');
      if (toolbarVisible) {
        editorToolbar.toggleToolbar(false);
      }
    },
    unhide() {
      document.getElementById(editorButton.getId()).classList.remove('hidden');
      if (toolbarVisible) {
        editorToolbar.toggleToolbar(true);
      }
    },
    render() {
      const htmlString = editorButton.render();
      const el = dom.html(htmlString);
      document.getElementById(target).appendChild(el);
      // Toolbar injects itself to DOM, so no need to handle return value
      editorToolbar.render();
      this.dispatch('render');
      viewer.dispatch('toggleClickInteraction', {
        name: 'editor',
        active: isActive
      });
    },
    createFeature,
    editFeatureAttributes,
    deleteFeature,

    changeActiveLayer: (layerName) => {
      // Only need to actually change layer if editor is active. Otherwise state is just set in toolbar and will
      // activate set layer when toggled visible
      if (isVisible) {
        editHandler.setActiveLayer(layerName);
      }
      editorToolbar.changeActiveLayer(layerName);
    }
  });
};

export default Editor;
