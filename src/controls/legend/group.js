import { Component, Modal, Button, Collapse, CollapseHeader, dom } from '../../ui'; // FM 2021-06-15
import GroupList from './grouplist';
/**
 * The Group component can be a group or a subgroup,
 * defined by type group or grouplayer. If the
 * type is grouplayer, it will be treated as a subgroup
 * with tick all and untick check boxes.
 */
const Group = function Group(viewer, options = {}) {
  const {
    icon = '#ic_chevron_right_24px',
    cls = '',
    expanded = false,
    title,
    name,
    parent,
    abstract, // FM abstract visas direkt under lagret i legenden (orginal)
    abstractbtnurl, // FM, skapar infoknapp som öppnar url i modal
    abstractbtnmodal, // FM skapar infoknapp som öppnar abstract i modal
    abstractbtnug, // FM sätts till true om abstractmodal eller abstracturl används för temalager, info knappen hamnar under gruppen (ug)
    position = 'top',
    type = 'group',
    autoExpand = true,
    exclusive = false,
    toggleAll = true,
    draggable = false,
    zIndexStart = 0.1
  } = options;

  const stateCls = {
    none: 'initial',
    all: 'initial',
    mixed: 'disabled'
  };
  const checkIcon = '#ic_check_circle_24px';
  const uncheckIcon = '#ic_radio_button_unchecked_24px';
  let visibleState = 'all';
  let groupEl;
  let modal;
  let selectedItem;

  const listCls = type === 'grouplayer' ? 'divider-start padding-left padding-top-small' : '';
  const groupList = GroupList({ viewer, cls: listCls, abstract, abstractbtnurl, abstractbtnmodal, abstractbtnug });
  visibleState = groupList.getVisible();

  const getEl = () => groupEl;

  const getCheckIcon = (visible) => {
    const isVisible = visible === 'mixed' || visible === 'all' ? checkIcon : uncheckIcon;
    return isVisible;
  };

  const getOverlayList = () => groupList;

  const getVisible = () => visibleState;

  // FM skapar infoknapp
  const iframe1 = '<iframe width="600px" src="'
  const iframe2 = '"></iframe>'
  let modalstyle = ''
  let abstractcontent = ''
  if (!abstractbtnurl && !abstractbtnmodal) abstractcontent = title;
  if (abstractbtnurl) {
    abstractcontent = iframe1 + abstractbtnurl + iframe2;
    modalstyle = 'width:600px';
  }
  if (abstractbtnmodal) abstractcontent = abstractbtnmodal;

  const infoButton = Button({
    cls: 'icon-smaller compact round falk-linear', // FM
    icon: '#fa-info-circle',

    click() {
      modal = Modal({
        title: title,
        content: abstractcontent,
        newTabUrl: abstractbtnurl,
        style: modalstyle,
        target: viewer.getId(),
      });
      this.addComponent(modal);
    },
  });
  // FM slut
  const tickButton = !exclusive && toggleAll ? Button({
    cls: 'icon-smaller round small falk-linear', // FM
    click() {
      const eventType = visibleState === 'all' ? 'untick:all' : 'tick:all';
      const tickEvent = new CustomEvent(eventType, {
        bubbles: true
      });
      const el = document.getElementById(this.getId());
      el.dispatchEvent(tickEvent);
    },
    icon: '#ic_radio_button_unchecked_24px',
    iconCls: '',
    state: visibleState,
    style: {
      'align-self': 'flex-end',
      cursor: 'pointer'
    }
  }) : false;

  const SubGroupHeader = function SubGroupHeader() {
    const expandButton = Button({
      cls: 'icon-small compact round',
      icon,
      iconCls: 'rotate grey',
      style: {
        'align-self': 'flex-start'
      }
    });
    return Component({
      onInit() {
        this.addComponent(expandButton);
        if (abstractbtnurl || abstractbtnmodal) this.addComponent(infoButton); // FM
        if (tickButton) {
          this.addComponent(tickButton);
        }
      },
      onRender() {
        this.dispatch('render');
        const collapseEvent = 'collapse:toggle';
        const el = document.getElementById(this.getId());
        el.addEventListener('click', () => {
          const customEvt = new CustomEvent(collapseEvent, {
            bubbles: true
          });
          el.dispatchEvent(customEvt);
        });
      },
      render() {
        if (abstractbtnurl || abstractbtnmodal) { // FM start
          return `<div class="flex row align-center padding-left padding-right text-smaller pointer collapse-header grey-lightest hover rounded" style="width: 100%;">
                <div id="${this.getId()}" class="flex row align-center grow">
                   ${expandButton.render()}
                    <span class="grow padding-x-small falk_rubrik2"> ${title}</span>
               </div>
               ${tickButton ? tickButton.render() : ''}${infoButton.render()}    
              </div>`;
        } // FM slut
        else {
          return `<div class="flex row align-center padding-left text-smaller pointer collapse-header grey-lightest hover rounded" style="width: 100%; padding-right: 1.875rem">
          <div id="${this.getId()}" class="flex row align-center grow">
             ${expandButton.render()}
              <span class="grow padding-x-small falk_rubrik2" style="word-break: break-all;">${title}</span>
          </div>
          ${tickButton ? tickButton.render() : ''}
          </div>`;
          /* FM old code is falk_rubrik2 needed
          return `<div class="flex row align-center padding-left padding-right text-smaller pointer collapse-header grey-lightest hover rounded" style="width: 100%;">
                      <div id="${this.getId()}" class="flex row align-center grow">
                         ${expandButton.render()}
                          <span class="grow padding-x-small falk_rubrik2"> ${title}</span>
                      </div>
                      ${tickButton ? tickButton.render() : ''}
                      </div>`;
            */
        }
      }
    });
  };
  const GroupHeader = function GroupHeader() {
    const headerComponent = CollapseHeader({
      cls: 'hover padding-x padding-y-small grey-lightest border-bottom text-small falk_rubrik1',
      icon,
      title
    });
    return headerComponent;
  };

  const headerComponent = type === 'grouplayer' ? SubGroupHeader() : GroupHeader();

  const collapse = Collapse({
    cls: '',
    expanded,
    headerComponent,
    contentComponent: groupList,
    collapseX: false
  });

  const addGroup = function addGroup(groupCmp) {
    groupList.addGroup(groupCmp);
    this.dispatch('add:group');
  };

  const appendGroup = function appendGroup(targetCmp) {
    const html = dom.html(this.render());
    const targetEl = targetCmp.getEl();
    if (position === 'top') {
      targetEl.insertBefore(html, targetEl.firstChild);
    } else {
      targetEl.appendChild(html);
    }
    this.onRender();
  };

  const addOverlay = function addOverlay(overlay) {
    groupList.addOverlay(overlay);
    this.dispatch('add:overlay', overlay);
  };

  const removeOverlay = function removeOverlay(layerName) {
    groupList.removeOverlay(layerName);
  };

  const removeGroup = function removeGroup(group) {
    groupList.removeGroup(group);
  };

  const updateGroupIndication = function updateGroupIndication() {
    if (groupList.getVisible() === 'none') {
      groupEl.firstElementChild.classList.add('no-group-indication');
      groupEl.firstElementChild.classList.remove('group-indication');
    } else {
      groupEl.firstElementChild.classList.add('group-indication');
      groupEl.firstElementChild.classList.remove('no-group-indication');
    }
  };

  function orderZIndex(list, groupCmp) {
    const elementIds = [...list.children].map(x => x.id).reverse();
    const overlayArray = groupCmp.getOverlayList().getOverlays();
    overlayArray.forEach(element => {
      const layerIndex = 1 + elementIds.indexOf(element.getId());
      element.getLayer().setZIndex(zIndexStart + (layerIndex / 100));
    });
  }

  function handleDragStart(evt) {
    selectedItem = evt.target;
    selectedItem.classList.add('move-item');
  }

  function handleDragOver(evt) {
    const event = evt;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDragEnd(evt, groupCmp) {
    if (selectedItem) {
      selectedItem.classList.remove('move-item');
      orderZIndex(selectedItem.parentElement, groupCmp);
      selectedItem = null;
    }
  }

  function handleDragEnter(evt) {
    if (selectedItem) {
      const event = evt;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      const list = selectedItem.parentNode;
      const x = evt.clientX;
      const y = evt.clientY;
      let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
      if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
      }
    }
  }

  function enableDragItem(el, groupCmp) {
    const item = el;
    item.setAttribute('draggable', true);
    item.ondragstart = handleDragStart;
    item.ondragenter = handleDragEnter;
    item.ondragover = handleDragOver;
    item.ondragend = (evt) => { handleDragEnd(evt, groupCmp); };
  }

  return Component({
    addOverlay,
    getEl,
    getOverlayList,
    getVisible,
    getHeaderCmp() { return headerComponent; },
    name,
    exclusive,
    parent,
    title,
    type,
    draggable,
    addGroup,
    appendGroup,
    removeGroup,
    removeOverlay,
    onAdd(evt) {
      if (evt.target) {
        evt.target.on('render', this.onRender.bind(this));
      }

      // Add directly if target is available in the dom
      if (evt.target.getEl()) {
        this.appendGroup(evt.target);
      }
    },
    onInit() {
      this.addComponent(collapse);
      this.on('add:overlay', (overlay) => {
        visibleState = groupList.getVisible();
        if (tickButton) {
          tickButton.setState(stateCls[visibleState]);
          tickButton.setIcon(getCheckIcon(visibleState));
        }
        if (draggable && typeof overlay.getId === 'function') {
          const el = document.getElementById(overlay.getId());
          enableDragItem(el, this);
        }
      });
      this.on('add:group', () => {
        visibleState = groupList.getVisible();
        if (tickButton) {
          tickButton.setState(stateCls[visibleState]);
          tickButton.setIcon(getCheckIcon(visibleState));
        }
      });

      // only listen to tick changes for subgroups
      if (type === 'grouplayer') {
        this.on('untick:all', () => {
          const overlays = groupList.getOverlays();
          overlays.forEach((overlay) => {
            const layer = overlay.getLayer();
            layer.setVisible(false);
          });
          const groups = groupList.getGroups();
          groups.forEach((group) => {
            group.dispatch('untick:all');
          });
          if (visibleState !== 'none') {
            this.dispatch('change:visible', { state: 'none' });
            visibleState = 'none';
          }
          if (autoExpand) {
            collapse.collapse();
          }
        });
        this.on('tick:all', () => {
          const overlays = groupList.getOverlays();
          overlays.forEach((overlay) => {
            const layer = overlay.getLayer();
            layer.setVisible(true);
          });
          const groups = groupList.getGroups();
          groups.forEach((group) => {
            if (!group.exclusive) {
              group.dispatch('tick:all');
            }
          });
          if (visibleState !== 'all') {
            this.dispatch('change:visible', { state: 'all' });
            visibleState = 'all';
          }
          if (autoExpand) {
            collapse.expand();
          }
        });
      }
    },
    onRender() {
      groupEl = document.getElementById(collapse.getId());
      if (viewer.getControlByName('legend').getuseGroupIndication() && type === 'group') {
        updateGroupIndication();
        this.on('add:overlay', () => {
          updateGroupIndication();
        });
        groupEl.addEventListener('change:visible', (e) => {
          e.preventDefault();
          e.stopPropagation();
          updateGroupIndication();
        });
      }
      // only listen to tick changes for subgroups
      if (type === 'grouplayer') {
        groupEl.addEventListener('tick:all', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.dispatch('tick:all');
        });
        groupEl.addEventListener('untick:all', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.dispatch('untick:all');
        });
        groupEl.addEventListener('change:visible', (e) => {
          e.preventDefault();
          const newVisibleState = groupList.getVisible();
          if (visibleState !== newVisibleState) {
            visibleState = newVisibleState;
            if (tickButton) {
              tickButton.dispatch('change', { icon: getCheckIcon(visibleState) });
              tickButton.setState(stateCls[visibleState]);
            }
          } else {
            e.stopPropagation();
          }
        });
      }
      this.dispatch('render');
    },
    render() {
      this.dispatch('beforerender');
      const tagName = type === 'grouplayer' ? 'li' : 'div';
      return `<${tagName} id="${this.getId()}" class="${cls}">${collapse.render()}</${tagName}>`;
    }
  });
};

export default Group;
