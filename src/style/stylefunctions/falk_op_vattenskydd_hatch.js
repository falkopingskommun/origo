import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

export default function HatchStyle() {
  return function styles() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    // Generate a canvasPattern
    const LineFill = (function km() {
      canvas.width = 15 * pixelRatio;
      canvas.height = 15 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.strokeStyle = '#0069d4';
      context.beginPath();
      context.moveTo(0 * pixelRatio, 0 * pixelRatio);
      context.lineTo(15 * pixelRatio, 15 * pixelRatio);
      context.stroke();
      return context.createPattern(canvas, 'repeat');
    }());

    // Generate a outline
    const stroke = new Stroke({
      color: '#0069d4',
      width: 2
    });

    const fill = new Fill({
      color: LineFill
    });
    const style = new Style({
      fill,
      stroke
    });
    return style;
  };
}
