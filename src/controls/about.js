import { Component, Modal, Element as El, Button, dom } from '../ui';

const About = function About(options = {}) {
  let {
    buttonText,
    target
  } = options;
  const localization = options.localization;

  function localize(key) {
    return localization.getStringByKeys({ targetParentKey: 'about', targetKey: key });
  }
  const {
    content = '<p></p>',
    // icon = '#ic_info_outline_24px', //FM
    // title = 'Om kartan', //FM
    // style = options.style || '' //FM
    icon = '#ic_help_outline_24px',
    placement = ['menu'],
    title = localize('title'),
    style
  } = options;

  let viewer;
  let mapMenu;
  let menuItem;
  let modal;
  let mapTools;
  let screenButtonContainer;
  let screenButton;
  let modalStyle = '';
  switch (style) {
    case 'modal-full':
    {
      modalStyle = 'max-width:unset;width:98%;max-height:calc(100% - 5rem);height:98%;resize:both;overflow:auto;display:flex;flex-flow:column;';
      break;
    }
    default:
    {
      modalStyle = 'resize:both;overflow:auto;display:flex;flex-flow:column;';
      break;
    }
  }

  return Component({
    name: 'about',
    onAdd(evt) {
      if (!buttonText) buttonText = title;
      viewer = evt.target;
      /*
      target = viewer.getId();
      mapMenu = viewer.getControlByName('mapmenu');
      menuItem = mapMenu.MenuItem({
        click() {
          modal = Modal({
            title,
            content,
            target,
            style
          });
          this.addComponent(modal);
          mapMenu.close();
        },
        icon,
        title: buttonText,
        ariaLabel: title
      });
      this.addComponent(menuItem);
      */
      if (placement.indexOf('screen') > -1) {
        target = viewer.getId();
        mapTools = `${viewer.getMain().getMapTools().getId()}`;
        screenButtonContainer = El({
          tagName: 'div',
          cls: 'flex column'
        });
        screenButton = Button({
          cls: 'o-about padding-small icon-smaller round light box-shadow',
          click() {
            modal = Modal({
              title,
              content,
              target,
              style: modalStyle
            });
            this.addComponent(modal);
          },
          icon,
          tooltipText: title,
          tooltipPlacement: 'east'
        });
        this.addComponent(screenButton);
      }
      if (placement.indexOf('menu') > -1) {
        target = viewer.getId();
        mapMenu = viewer.getControlByName('mapmenu');
        menuItem = mapMenu.MenuItem({
          click() {
            modal = Modal({
              title,
              content,
              target,
              style: modalStyle
            });
            this.addComponent(modal);
            mapMenu.close();
          },
          icon,
          title: buttonText,
          ariaLabel: title
        });
        this.addComponent(menuItem);
      }
      this.render();
    },
    render() {
      if (placement.indexOf('screen') > -1) {
        let htmlString = `${screenButtonContainer.render()}`;
        let el = dom.html(htmlString);
        document.getElementById(mapTools).appendChild(el);
        htmlString = screenButton.render();
        el = dom.html(htmlString);
        document.getElementById(screenButtonContainer.getId()).appendChild(el);
      }
      if (placement.indexOf('menu') > -1) {
        mapMenu.appendMenuItem(menuItem);
      }
      this.dispatch('render');
    }
  });
};

export default About;
