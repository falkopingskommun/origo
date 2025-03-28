import Component from './component';
import cuid from './utils/cuid';
import { createStyle } from './dom/dom';

export default function Collapse(options = {}) {
  let {
    expanded = false
  } = options;
  const {
    bubble = false,
    cls = '',
    collapseX = true,
    collapseY = true,
    contentComponent,
    headerComponent,
    footerComponent,
    contentCls = '',
    contentStyle: contentStyleOptions = {},
    data = {},
    style: styleSettings,
    tagName = 'div',
    containerCls = 'collapse-container',
    mainCls = 'collapse'
  } = options;

  const style = createStyle(styleSettings);
  const contentStyle = createStyle(contentStyleOptions);
  const toggleEvent = 'collapse:toggle';
  const collapseEvent = 'collapse:collapse';
  const containerId = cuid();
  let collapseEl;
  let containerEl;
  let contentEl;

  // Restore auto size after transition
  const onTransitionEnd = function onTransitionEnd() {
    containerEl.removeEventListener('transitionend', onTransitionEnd);
    if (collapseY) containerEl.style.height = null;
    if (collapseX) containerEl.style.width = null;
  };

  // Set tabindex for all buttons to include or exclude in taborder depending on if expanded or not
  const setTabIndex = function setTabIndex(idx) {
    for (let i = 0; i < containerEl.getElementsByTagName('button').length; i += 1) {
      // Checks if the button is a direct child of the opened group and not a grandchild which shouldn't be activated until that group is opened
      if (containerEl.id === containerEl.getElementsByTagName('button')[i].closest('.collapse-container').id) {
        containerEl.getElementsByTagName('button')[i].tabIndex = idx;
      }
    }
  };

  const expand = function expand() {
    //if (!expanded) {
    if (!collapseEl.classList.contains("expanded")) { // FM
      collapseEl.classList.add('expanded');
      const newHeight = contentEl.offsetHeight;
      const newWidth = contentEl.scrollWidth;
      if (collapseY) containerEl.style.height = `${newHeight}px`;
      if (collapseX) containerEl.style.width = `${newWidth}px`;
      containerEl.addEventListener('transitionend', onTransitionEnd);
      setTabIndex(0);
    }
    expanded = true;
  };

  const collapse = function collapse() {
    //if (expanded) {
    if (collapseEl.classList.contains("expanded")) { // FM
    const collapseSize = 0;
      collapseEl.classList.remove('expanded');
      const currentHeight = contentEl.offsetHeight;
      const currentWidth = contentEl.scrollWidth;
      const elementTransition = containerEl.style.transition;
      containerEl.style.transition = '';
      setTabIndex(-1);
      requestAnimationFrame(() => {
       // if (collapseY) containerEl.style.height = `${currentHeight}px`;
       // if (collapseX) containerEl.style.width = `${currentWidth}px`;
        containerEl.style.transition = elementTransition;

        requestAnimationFrame(() => {
          console.log("y",collapseY,"x",collapseX)
          if (collapseY) containerEl.style.height = `${collapseSize}px`;
          if (collapseX) containerEl.style.width = `${collapseSize}px`;
        });
      });
    }
    expanded = false;
  };

  const toggle = function toggle(evt) {
    evt.preventDefault();
    if (!bubble) evt.stopPropagation();
    //  if (expanded) {
    if ((collapseEl.classList.contains("expanded"))) { // FM
      this.collapse();
    } else {
      this.expand();
    }
    this.dispatch(toggleEvent);
  };

  return Component({
    collapse,
    data,
    expand,
    containerId,
    onInit() {
      if (contentComponent) {
        if (headerComponent) { this.addComponent(headerComponent); }
        if (footerComponent) { this.addComponent(footerComponent); }
        this.addComponent(contentComponent);
      } else {
        throw new Error('Content component is missing in collapse');
      }
    },
    onRender() {
      collapseEl = document.getElementById(this.getId());
      collapseEl.addEventListener(toggleEvent, this.toggle.bind(this));
      collapseEl.addEventListener(collapseEvent, this.collapse.bind(this));
      containerEl = document.getElementById(containerId);
      contentEl = document.getElementById(contentComponent.getId());
      if (expanded) {
        setTabIndex(0);
      } else {
        setTabIndex(-1);
      }
      this.dispatch('render');
    },
    render: function render() {
      const height = !expanded && collapseY ? 'height: 0;' : '';
      const width = !expanded && collapseX ? 'width: 0;' : '';
      const isExpanded = expanded ? 'expanded' : '';
      const header = headerComponent ? headerComponent.render() : '';
      const footer = footerComponent ? footerComponent.render() : '';
      return `<${tagName} id="${this.getId()}" class="${mainCls} ${cls} ${isExpanded}" style="${style}">
                ${header}
                <div id="${containerId}" class="${containerCls} ${contentCls}" style="${height} ${width} ${contentStyle}">
                  ${contentComponent.render()}
                </div>
                ${footer}
              </${tagName}>`;
    },
    toggle
  });
}
