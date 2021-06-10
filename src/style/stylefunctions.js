import defaultStyle from './stylefunctions/default';
import detaljplanStyle from './stylefunctions/falk_dp_hatch';
import prickmarkStyle from './stylefunctions/falk_dp_hatch_prickmark';
import korsmarkStyle from './stylefunctions/falk_dp_hatch_korsmark';
import op_natur from './stylefunctions/falk_op_natur_hatch';

const customStyles = {
  default: defaultStyle,
  falk_dp_hatch: detaljplanStyle,
  falk_dp_hatch_prickmark: prickmarkStyle,
  falk_dp_hatch_korsmark: korsmarkStyle,
  falk_op_natur_hatch: op_natur,
};

export default function styleFunctions(customStyle, params) {
  if (customStyle in customStyles) {
    return customStyles[customStyle](params);
  }
  return customStyles.default(params);
}
