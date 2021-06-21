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
      canvas.width = 15 * pixelRatio;
      canvas.height = 15 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.strokeStyle = '#fc0808';
      context.beginPath();
      context.lineWidth = "1";
      context.moveTo(0 * pixelRatio, 15 * pixelRatio) ;
      context.lineTo(15 * pixelRatio, 0 * pixelRatio);
      context.stroke();
      
      return context.createPattern(canvas, 'repeat');
    }());

    // Generate a outline
    const stroke = new Stroke({
      color: '#fc0808',
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