import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

export default function hatch_style() {
  return function styles(feature) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;
    let fill;
    let style;

    // Generate a canvasPattern
    const linje_fyllnad = (function km() {
      canvas.width = 20 * pixelRatio;
      canvas.height = 20 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.strokeStyle = '#1b531b';
      context.beginPath();
      context.moveTo(0, 4 * pixelRatio);
      context.lineTo(8 * pixelRatio, 4 * pixelRatio);
      context.moveTo(4 * pixelRatio, 0);
      context.lineTo(4 * pixelRatio, 8 * pixelRatio);
      context.stroke();
      return context.createPattern(canvas, 'repeat');

    }());

    // Generate a outline
    const stroke = new Stroke({
      color: '#1b531b',
      width: 2
    });

    fill = new Fill({
      color: linje_fyllnad
    });
    style = new Style({
      fill,
      stroke
    });
    return style;
  };
}