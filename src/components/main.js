import { Component, Element as El } from '../ui';

export default function Main(options = {}) {
  const {
    cls: clsSettings = ''
  } = options;

  const cls = `${clsSettings} o-main transparent relative flex column grow transparent height-full no-margin`.trim();
  const navigation = El({ cls: 'o-navigation flex column relative transparent spacing-vertical-small' });
  const mapTools = El({ cls: 'o-maptools flex column relative transparent spacing-vertical-small' });
  const miscTools = El({ cls: 'o-misc flex column relative transparent spacing-vertical-small' });
  const bottomTools = El({ cls: 'o-tools-bottom absolute transparent bottom-left width-full no-margin' });
  // FM added cls falk-tools for external styling on menu button
  return Component({
    getBottomTools: () => bottomTools,
    getNavigation: () => navigation,
    getMapTools: () => mapTools,
    getMiscTools: () => miscTools,
    render: function render() {
      return `<div id=${this.getId()} class="${cls}">
                <div id="o-tools-left" class="box top-left-special transparent flex column falk-tools"> 
                  ${navigation.render()}
                  <div style="width: 34px">
                    ${mapTools.render()}
                  </div>
                  ${miscTools.render()}
                </div>
                <div id="o-tools-bottom" class="box bottom-center transparent width-full ">
                  ${bottomTools.render()}
                </div>
              </div>`;
    }
  });
}
