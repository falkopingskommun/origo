import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';

export default function detaljplanStyle() {
  return function styles(feature) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;
    let fill;
    let style;

    // Generate a canvasPattern with two circles on white background
    const prickmark = (function pm() {
      canvas.width = 8 * pixelRatio;
      canvas.height = 8 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.beginPath();
      context.arc(4 * pixelRatio, 4 * pixelRatio, 1 * pixelRatio, 0, 2 * Math.PI);
      context.fill();
      return context.createPattern(canvas, 'repeat');
    }());

    fill = new Fill({
      color: prickmark
    });
    style = new Style({
      fill
    });
    return style;
  };
}