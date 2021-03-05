import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';

export default function detaljplanStyle() {
  return function styles(feature) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;
    let fill;
    let style;

    const korsmark = (function km() {
      canvas.width = 20 * pixelRatio;
      canvas.height = 20 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.beginPath();
      context.moveTo(0, 4 * pixelRatio);
      context.lineTo(8 * pixelRatio, 4 * pixelRatio);
      context.moveTo(4 * pixelRatio, 0);
      context.lineTo(4 * pixelRatio, 8 * pixelRatio);
      context.stroke();
      return context.createPattern(canvas, 'repeat');
    }());

    fill = new Fill({
      color: korsmark
    });
    style = new Style({
      fill
    });
    return style;
  };
}