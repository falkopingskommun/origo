import defaultStyle from './stylefunctions/default';
import detaljplanStyle from './stylefunctions/falk_dp_hatch';

const customStyles = {
  default: defaultStyle,
  falk_dp_hatch: detaljplanStyle
};

export default function styleFunctions(customStyle, params) {
  if (customStyle in customStyles) {
    return customStyles[customStyle](params);
  }
  return customStyles.default(params);
}
