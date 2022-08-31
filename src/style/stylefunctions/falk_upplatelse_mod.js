import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

export default function hatch_style() {
  return function styles(feature) {
    let fill;
    let style;
    let linecolor;
    let today = new Date().toISOString().slice(0, 10);
    let emptyImgStyle = new Style({ image: '' });


    if (feature.get('datum_till') > today && feature.get('typ') == 'Marktillstånd, Allmän mark') {
    fill = new Fill({
      color: [247, 148, 62, 0.8]
    });
    linecolor = 'black'
    }

    else if (feature.get('datum_till') > today && feature.get('typ') == 'Nyttjanderätt kommunal mark') {
      fill = new Fill({
        color: [153, 123, 252, 0.8]
      });
      linecolor = 'black'
    }

      else if (feature.get('datum_till') > today && feature.get('typ') == 'Ospec') {
      fill = new Fill({
        color: 'grey'
      });
      linecolor = 'black'
    }

    else {
      feature.setStyle(emptyImgStyle);
    }

    const stroke = new Stroke({
      color: linecolor,
      width: 2,
    });
    style = new Style({
      fill,
      stroke
    });
    return style
    
  };
}


