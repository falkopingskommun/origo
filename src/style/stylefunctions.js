import defaultStyle from './stylefunctions/default';
import detaljplanStyle from './stylefunctions/falk_dp_hatch';
import prickmarkStyle from './stylefunctions/falk_dp_hatch_prickmark';
import korsmarkStyle from './stylefunctions/falk_dp_hatch_korsmark';
import op_naturStyle from './stylefunctions/falk_op_natur_hatch';
import op_kulturmiljoStyle from './stylefunctions/falk_op_kulturmiljo_hatch';
import op_naturvardStyle from './stylefunctions/falk_op_naturvard_hatch';
import op_friluftslivStyle from './stylefunctions/falk_op_friluftsliv_hatch';
import op_n2000fagStyle from './stylefunctions/falk_op_n2000fag_hatch';
import op_n2000habStyle from './stylefunctions/falk_op_n2000hab_hatch';
import op_skyddavlanStyle from './stylefunctions/falk_op_skyddavlan_hatch';
import op_naturreservatStyle from './stylefunctions/falk_op_naturreservat_hatch';
import op_strandskyddStyle from './stylefunctions/falk_op_strandskydd_hatch';
import op_bitopskyddStyle from './stylefunctions/falk_op_biotopskydd_hatch';

const customStyles = {
  default: defaultStyle,
  falk_dp_hatch: detaljplanStyle,
  falk_dp_hatch_prickmark: prickmarkStyle,
  falk_dp_hatch_korsmark: korsmarkStyle,
  op_natur: op_naturStyle,
  op_kulturmiljovard: op_kulturmiljoStyle,
  op_naturvard: op_naturvardStyle,
  op_friluftsliv: op_friluftslivStyle,
  op_n2000fag: op_n2000fagStyle,
  op_n2000hab: op_n2000habStyle,
  op_skyddavlan: op_skyddavlanStyle,
  op_naturreservat: op_naturreservatStyle,
  op_strandskydd: op_strandskyddStyle,
  op_bitopskydd: op_bitopskyddStyle
};

export default function styleFunctions(customStyle, params) {
  if (customStyle in customStyles) {
    return customStyles[customStyle](params);
  }
  return customStyles.default(params);
}
