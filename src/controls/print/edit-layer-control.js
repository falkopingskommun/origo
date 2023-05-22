// FMB
import Button from '../../ui/button';

export default function EditLayerControl(options = {}) {
  let {
    showEditLayer
  } = options;

  const checkIcon = '#ic_check_circle_24px';
  const uncheckIcon = '#ic_radio_button_unchecked_24px';

  const getCheckIcon = (visible) => {
    const isVisible = visible ? checkIcon : uncheckIcon;
    return isVisible;
  };

  return Button({
    cls: 'round small icon-smaller no-shrink',
    click() {
      showEditLayer = !showEditLayer;
      this.setIcon(getCheckIcon(showEditLayer));
      this.dispatch('change:check', { showEditLayer });
    },
    style: {
      'align-self': 'center'
    },
    icon: getCheckIcon(showEditLayer)
  });
}
// FMS