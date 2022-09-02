import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

// Used with colorpicker (attr: farg) and slider (attr: opacity)
export default function ritlager_yta_style() {
  return function styles(feature) {
    let style;
    let colorvalue = feature.get('farg');
    let opacity = feature.get('opacity');
    let linecolor = colorvalue + Math.floor(opacity / 100 * 255).toString(16).padStart(2, 0);
    let fillcolor = colorvalue + Math.floor(opacity / 100 * 255).toString(16).padStart(2, 0);

    //Legacy support for old color choices
    if (colorvalue == 'Svart') {
      fillcolor = [0, 0, 0, 0.8]
      linecolor = [0, 0, 0, 0.4]
    }

    else if (colorvalue == 'Röd') {
      fillcolor = [250, 0, 0, 0.8]
      linecolor = [250, 0, 0, 0.4]
    }

    else if (colorvalue == 'Blå') {
      fillcolor = [0, 0, 250, 0.8]
      linecolor = [0, 0, 250, 0.4]
    }

    else if (colorvalue == 'Grön') {
      fillcolor = [0, 250, 0, 0.8]
      linecolor = [0, 250, 0, 0.4]
    }

    else if (colorvalue == 'Gul (mörk)') {
      fillcolor = [240, 179, 50, 0.8]
      linecolor = [240, 179, 50, 0.4]
    }

    else if (colorvalue == 'Gul (ljus)') {
      fillcolor = [239, 200, 121, 0.8]
      linecolor = [239, 200, 121, 0.4]
    }

    else if (colorvalue == 'Orange (mörk)') {
      fillcolor = [234, 84, 49, 0.8]
      linecolor = [234, 84, 49, 0.4]
    }

    else if (colorvalue == 'Orange (ljus)') {
      fillcolor = [239, 143, 118, 0.8]
      linecolor = [239, 143, 118, 0.4]
    }

    else if (colorvalue == 'Lila (mörk)') {
      fillcolor = [166, 66, 121, 0.8]
      linecolor = [166, 66, 121, 0.4]
    }

    else if (colorvalue == 'Lila (ljus)') {
      fillcolor = [154, 116, 142, 0.8]
      linecolor = [154, 116, 142, 0.4]
    }

    else if (colorvalue == 'Grön (mörk)') {
      fillcolor = [59, 159, 106, 0.8]
      linecolor = [59, 159, 106, 0.4]
    }

    else if (colorvalue == 'Grön (ljus)') {
      fillcolor = [178, 194, 162, 0.8]
      linecolor = [178, 194, 162, 0.4]
    }

    else if (colorvalue == 'Blå (mörk)') {
      fillcolor = [44, 88, 141, 0.8]
      linecolor = [44, 88, 141, 0.4]
    }

    else if (colorvalue == 'Blå (ljus)') {
      fillcolor = [143, 168, 200, 0.8]
      linecolor = [143, 168, 200, 0.4]
    }

    else if (colorvalue == 'Grå (mörk)') {
      fillcolor = [140, 130, 132, 0.8]
      linecolor = [140, 130, 132, 0.4]
    }

    else if (colorvalue == 'Grå (ljus)') {
      fillcolor = [230, 227, 228, 0.8]
      linecolor = [230, 227, 228, 0.4]
    }

    const fill = new Fill({
      color: fillcolor,
      width: 3,
    });
    const stroke = new Stroke({
      color: linecolor,
      width: 3,
    });
    style = new Style({
      fill,
      stroke
    });
    return style

  };
}


