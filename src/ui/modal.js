import Component from './component';
import Element from './element';
import Button from './button';
import { html } from './dom/dom';
import utils from '../utils';
import isEmbedded from '../utils/isembedded';

/**
 * Creates a modal and displays it. The modal is created as a div tag that is attached to the DOM as a child of the options.target element.
 * @param {any} options Object containing options for the modal. Valid options are:
 *  title: Title of modal
 *  content: The content to display. String containing html
 *  contentElement: HTMLElement containing the content. If specified the 'content' param is ignored.
 *  cls: Optional classes to append to the modal container div
 *  static: true if modal must be explicitly closed
 *  target: ID of DOM element to wich modal div is appended as a child. Required. Most likely the viewer element.
 *  closeIcon: name of icon to use as close button. Defaults to a cross.
 *  style: html style attributes to add to modal div
 *  newTabUrl: URL to create a link button to
 *  @returns {any} A Component representing the modal.
 */
export default function Modal(options = {}) {
  const {
    title = '',
    content = '',
    contentElement,
    contentCmp,
    cls = '',
    contentCls = '',
    isStatic = options.static,
    target,
    closeIcon = '#ic_close_24px',
    style = '',
    newTabUrl = '',
    copyInputfield = false
  } = options;

  let modal;
  let screenEl;
  let titleEl;
  let headerEl;
  let contentEl;
  let closeButton;
  let newTabButton;

  /** The component itself. Used to enable events */
  let component;

  const closeModal = function closeModal() {
    modal.parentNode.removeChild(modal);
  };

  const getEmbedded = function getEmbedded() {
    return isEmbedded(this.getTarget());
  };

  return Component({
    closeModal,
    /** Hides the modal (does not close it) */
    hide() {
      modal.classList.add('o-hidden');
    },
    /** Shows the modal if it has been hidden */
    show() {
      modal.classList.remove('o-hidden');
    },
    onInit() {
      screenEl = Element({
        cls: 'o-modal-screen'
      });

      const headerCmps = [];

      titleEl = Element({
        cls: 'flex row justify-start margin-y-smaller margin-left text-weight-bold',
        style: 'width: 100%;',
        innerHTML: `${title}`
      });
      headerCmps.push(titleEl);

      if (newTabUrl) {
        newTabButton = Button({
          cls: 'small round margin-top-smaller margin-bottom-auto margin-right icon-smaller grey-lightest no-shrink',
          icon: '#ic_launch_24px',
          click() {
            window.open(newTabUrl);
          }
        });
        headerCmps.push(newTabButton);
      }
      // FM Copy to clipboard
      async function copyInput() {
        const copyText = document.getElementById('input-sharemap');
        copyText.select();
        copyText.setSelectionRange(0, 9999);
        try {
          await navigator.permissions.query({ name: 'clipboard-write' });
          await navigator.clipboard.writeText(copyText.value);
          copyText.setSelectionRange(0, 9999);
        } catch (err) {
          console.error('Fel vid kopiering av text: ', err);
        }
      }
      // FM bacause of iframe clipboard security policys only show copy input button when not embedd
      if (copyInputfield && getEmbedded === false) {
        const copyInputfieldBtn = Button({
          cls: 'small round margin-top-smaller margin-bottom-auto margin-right icon-smaller grey-lightest no-shrink',
          icon: '#ic_content_copy_24px',
          click() {
            copyInput();
          }
        });
        headerCmps.push(copyInputfieldBtn);
      }

      closeButton = Button({
        cls: 'small round margin-top-smaller margin-bottom-auto margin-right icon-smaller grey-lightest no-shrink',
        icon: closeIcon,
        validStates: ['initial', 'hidden'],
        ariaLabel: 'Stäng',
        click() {
          closeModal();
          component.dispatch('closed');
        }
      });
      headerCmps.push(closeButton);

      headerEl = Element({
        cls: 'flex row justify-end grey-lightest draggable',
        components: headerCmps
      });
      const elOptions = { cls: 'o-modal-content' };
      if (contentCmp) {
        elOptions.components = [contentCmp];
      } else if (content) {
        elOptions.innerHTML = `${content}`;
      }
      contentEl = Element(elOptions);

      this.addComponent(screenEl);
      this.addComponent(headerEl);
      this.addComponent(contentEl);

      this.on('render', this.onRender);
      document.getElementById(target).appendChild(html(this.render()));
      // Now the modal exists in DOM. Append the DOM content (if any).
      if (contentElement) {
        const contentDOMEl = document.getElementById(contentEl.getId());
        contentDOMEl.innerHTML = '';
        contentDOMEl.appendChild(contentElement);
      }
      this.dispatch('render');
      component = this;
    },
    onRender() {
      modal = document.getElementById(this.getId());
      const modalBox = modal.getElementsByClassName('o-modal')[0];
      utils.makeElementDraggable(modalBox);
      document.getElementById(screenEl.getId()).addEventListener('click', () => {
        if (!isStatic) {
          closeButton.dispatch('click');
        }
      });
    },
    render() {
      let addStyle;
      if (style !== '') {
        addStyle = `style="${style}"`;
      } else {
        addStyle = '';
      }
      return `<div id="${this.getId()}" class="${cls} flex">
                  ${screenEl.render()}
                  <div class="o-modal ${contentCls}" ${addStyle}>
                    ${headerEl.render()}
                    ${contentEl.render()}
                  </div>
                </div>`;
    }
  });
}
