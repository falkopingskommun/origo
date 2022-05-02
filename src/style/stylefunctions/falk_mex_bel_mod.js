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
    let linecolor;

    // Generate a canvasPattern
    const anl_arrenden  = (function pm() {
      canvas.width = 8 * pixelRatio;
      canvas.height = 8 * pixelRatio;
      context.fillStyle = 'rgb(102, 136, 197)'; //6688c5
      context.beginPath();
      context.arc(4 * pixelRatio, 4 * pixelRatio, 2 * pixelRatio, 0, 2 * Math.PI);
      context.fill();
      return context.createPattern(canvas, 'repeat');
    }());

    const jor_arrenden = (function pm() {
      canvas.width = 8 * pixelRatio;
      canvas.height = 8 * pixelRatio;
      context.fillStyle = 'rgb(153, 198, 153)'; //99c699
      context.beginPath();
      context.arc(4 * pixelRatio, 4 * pixelRatio, 2 * pixelRatio, 0, 2 * Math.PI);
      context.fill();
      return context.createPattern(canvas, 'repeat');
    }());

    const lag_arrenden = (function pm() {
      canvas.width = 8 * pixelRatio;
      canvas.height = 8 * pixelRatio;
      context.fillStyle = 'rgb(197, 127, 127)'; //c57f7f
      context.beginPath();
      context.arc(4 * pixelRatio, 4 * pixelRatio, 2 * pixelRatio, 0, 2 * Math.PI);
      context.fill();
      return context.createPattern(canvas, 'repeat');
    }());

    const jak_arrenden = (function pm() {
        canvas.width = 8 * pixelRatio;
        canvas.height = 8 * pixelRatio;
        context.fillStyle = 'rgb(226, 154, 57)'; //99c699
        context.beginPath();
        context.arc(4 * pixelRatio, 4 * pixelRatio, 3 * pixelRatio, 0, 2 * Math.PI);
        context.fill();
        return context.createPattern(canvas, 'repeat');
      
    }());

    const avt_ledning = (function km() {
      canvas.width = 15 * pixelRatio;
      canvas.height = 15 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.strokeStyle = '#6b0707';
      context.beginPath();
      context.moveTo(0 * pixelRatio,  0 * pixelRatio);
      context.lineTo(15 * pixelRatio, 15 * pixelRatio);
      context.stroke();
      return context.createPattern(canvas, 'repeat');
    }());

    const avt_servitut = (function km() {
      canvas.width = 15 * pixelRatio;
      canvas.height = 15 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.strokeStyle = '#5e8932';
      context.beginPath();
      context.moveTo(0 * pixelRatio,  0 * pixelRatio);
      context.lineTo(15 * pixelRatio, 15 * pixelRatio);
      context.stroke();
      return context.createPattern(canvas, 'repeat');
    }());

    const ben_nytt = (function km() {      
      canvas.width = 15 * pixelRatio;
      canvas.height = 15 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.strokeStyle = '#1d1d77';
      context.beginPath();
      context.moveTo(0 * pixelRatio,  0 * pixelRatio);
      context.lineTo(15 * pixelRatio, 15 * pixelRatio);
      context.stroke();
      return context.createPattern(canvas, 'repeat');
    }());

    const par_nytt = (function km() {      
      canvas.width = 15 * pixelRatio;
      canvas.height = 15 * pixelRatio;
      context.fillStyle = 'rgb(0, 0, 0)';
      context.strokeStyle = '#ff0000';
      context.beginPath();
      context.moveTo(0 * pixelRatio,  0 * pixelRatio);
      context.lineTo(15 * pixelRatio, 15 * pixelRatio);
      context.stroke();
      return context.createPattern(canvas, 'repeat');
    }());

    if (feature.get('rattighetstyp') == 'Anläggningsarrende') {
    fill = new Fill({
      color: anl_arrenden
    });
    linecolor = '#6688c5'
    }
    else if (feature.get('rattighetstyp') == 'Jordbruksarrende') {
      fill = new Fill({
        color: jor_arrenden
      });
      linecolor = '#99c699'
    }
    else if (feature.get('rattighetstyp') == 'Lägenhetsarrende') {
      fill = new Fill({
        color: lag_arrenden
      });
      linecolor = '#c57f7f'
    }
    else if (feature.get('rattighetstyp') == 'Jakträtt') {
      fill = new Fill({
        color: jak_arrenden
      });
      linecolor = '#e2a439'
    }
    else if (feature.get('rattighetstyp') == 'Ledningsrätt') {
      fill = new Fill({
        color: avt_ledning
      });
      linecolor = '#6b0707'
    }
    else if (feature.get('rattighetstyp') == 'Servitut') {
      fill = new Fill({
        color: avt_servitut
      });
      linecolor = '#5e8932'
    }
    else if (feature.get('rattighetstyp') == 'Benefik nyttjanderätt') {
      fill = new Fill({
        color: ben_nytt
      });
      linecolor = '#1d1d77'
    }
    else if (feature.get('rattighetstyp') == 'Partiell nyttjanderätt') {
      fill = new Fill({
        color: par_nytt
      });
      linecolor = '#ff0000'
    }
    else{
      fill = new Fill({
        color: jor_arrenden
      });
      linecolor = '#AA2323'
    }

    const stroke = new Stroke({
      color: linecolor,
      width: 2,
    });
    style = new Style({
      fill,
      stroke
    });
    return style;
  };
}