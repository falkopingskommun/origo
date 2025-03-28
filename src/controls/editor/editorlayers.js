import dropDown from '../../dropdown';
import dispatcher from './editdispatcher';
import utils from '../../utils';

const createElement = utils.createElement;

let viewer;
let dropdown;

export default function editorLayers(editableLayersParam, v, optOptions = {}) {
  viewer = v;
  const editableLayers = editableLayersParam.filter(layer => !viewer.getLayer(layer).get('secure')).reverse();
  function selectionModel(layerNames) {
    const selectOptions = layerNames.map((layerName) => {
      const obj = {};
      obj.name = viewer.getLayer(layerName).get('title');
      obj.value = layerName;
      return obj;
    });
    return selectOptions;
  }

  let active = false;
  const activeCls = 'o-active';
  const target = 'editor-toolbar-layers-dropdown';
  const defaultOptions = {
    target,
    selectOptions: selectionModel(editableLayers),
    activeLayer: editableLayers[0]
  };
  const renderOptions = Object.assign(defaultOptions, optOptions);

  function render(options) {
    const popover = createElement('div', '', {
      id: options.target,
      cls: 'falk-editor-layerlist'
    });
    const { body: popoverHTML } = new DOMParser().parseFromString(popover, 'text/html');
    document.getElementById('o-editor-layers').insertAdjacentElement('afterend', popoverHTML);
    dropdown = dropDown(options.target, options.selectOptions, {
      dataAttribute: 'layer',
      active: options.activeLayer
    });
  }

  function setActive(state) {
    if (state) {
      active = true;
      document.getElementById(target).classList.add(activeCls);
    } else {
      active = false;
      document.getElementById(target).classList.remove(activeCls);
    }
    dispatcher.emitChangeEdit('layers', active);
  }

  function onToggleEdit(e) {
    const { detail: { tool } } = e;
    if (tool === 'layers') {
      if (active) {
        setActive(false);
      } else {
        setActive(true);
      }
    }
    e.stopPropagation();
  }

  function onChangeEdit(e) {
    if (e.tool !== 'layers' && e.active === true) {
      setActive(false);
    }
    e.stopPropagation();
  }

  function addListener() {
    document.getElementById(target).addEventListener('changeDropdown', (e) => {
      e.stopImmediatePropagation(e);
      setActive(false);
      dispatcher.emitToggleEdit('edit', {
        currentLayer: e.detail.dataAttribute
      });
      editableLayers.forEach(layername => {
        viewer.getLayer(layername).setVisible(false);
      });
      viewer.getLayer(e.detail.dataAttribute).setVisible(true);
    });
    document.addEventListener('toggleEdit', onToggleEdit);
    document.addEventListener('changeEdit', onChangeEdit);
  }

  /**
   * Updates layer selection list to reflect the current setting
   * @param {any} layerName
   */
  function changeLayer(layerName) {
    dropdown.select(layerName);
  }

  render(renderOptions);
  addListener(target);
  return {
    changeLayer
  };
}
