import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

// Used with colorpicker (attr: farg) and slider (attr: opacity)
export default function ritlager_linje_style() {
  return function styles(feature) {
    let style;
    let colorvalue = feature.get('farg');
    let opacity = feature.get('opacity');
    let linecolor = colorvalue + Math.floor(opacity / 100 * 255).toString(16).padStart(2, 0);

    //Legacy support for old color choices
    if (colorvalue == 'Svart') {
      linecolor = [0, 0, 0, 0.8]
    }
    else if (colorvalue == 'Röd') {
      linecolor = [255, 0, 0, 0.8]
    }
    else if (colorvalue == 'Grön') {
      linecolor = [0, 255, 0, 0.8]
    }
    else if (colorvalue == 'Blå') {
      linecolor = [0, 0, 255, 0.8]
    }
    else if (colorvalue == 'Gul (mörk)') {
      linecolor = [240, 179, 50, 0.8]
    }
    else if (colorvalue == 'Gul (ljus)') {
      linecolor = [239, 200, 121, 0.8]
    }
    else if (colorvalue == 'Orange (mörk)') {
      linecolor = [234, 84, 49, 0.8]
    }
    else if (colorvalue == 'Orange (ljus)') {
      linecolor = [239, 143, 118, 0.8]
    }
    else if (colorvalue == 'Lila (mörk)') {
      linecolor = [166, 66, 121, 0.8]
    }
    else if (colorvalue == 'Lila (ljus)') {
      linecolor = [154, 116, 142, 0.8]
    }
    else if (colorvalue == 'Grön (mörk)') {
      linecolor = [59, 159, 106, 0.8]
    }
    else if (colorvalue == 'Grön (ljus)') {
      linecolor = [178, 194, 162, 0.8]
    }
    else if (colorvalue == 'Blå (mörk)') {
      linecolor = [44, 88, 141, 0.8]
    }
    else if (colorvalue == 'Blå (ljus)') {
      linecolor = [143, 168, 200, 0.8]
    }
    else if (colorvalue == 'Grå (mörk)') {
      linecolor = [140, 130, 132, 0.8]
    }
    else if (colorvalue == 'Grå (ljus)') {
      linecolor = [230, 227, 228, 0.8]
    }
    const stroke = new Stroke({
      color: linecolor,
      width: 3,
    });
    style = new Style({
      stroke
    });
    return style

  };
}


