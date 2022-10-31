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
import op_mineralStyle from './stylefunctions/falk_op_sgumineral_hatch';
import op_grundvattenStyle from './stylefunctions/falk_op_grundvatten_hatch';
import op_fortatningStyle from './stylefunctions/falk_op_fortatning_hatch';
import op_jordbruksmarkStyle from './stylefunctions/falk_op_jordbruksmark_hatch';
import op_markradonStyle from './stylefunctions/falk_op_markradon_hatch';
import op_spillvattenStyle from './stylefunctions/falk_op_spillvatten_hatch';
import op_dagvattenStyle from './stylefunctions/falk_op_dagvatten_hatch';
import op_dricksvattenStyle from './stylefunctions/falk_op_dricksvatten_hatch';
import mex_belastningStyle from './stylefunctions/falk_mex_bel_mod';
import upplatelseStyle from './stylefunctions/falk_upplatelse_mod';
import ritlager_ytaStyle from './stylefunctions/falk_ritlager_yta';
import ritlager_linjeStyle from './stylefunctions/falk_ritlager_linje';
import ritlager_punktStyle from './stylefunctions/falk_ritlager_punkt';
import markplanering_ytaStyle from './stylefunctions/falk_markplanering_y';

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
  op_bitopskydd: op_bitopskyddStyle,
  op_mineral: op_mineralStyle,
  op_grundvatten: op_grundvattenStyle,
  op_fortatning: op_fortatningStyle,
  op_jordbruksmark: op_jordbruksmarkStyle,
  op_markradon: op_markradonStyle,
  op_spillvatten: op_spillvattenStyle,
  op_dagvatten: op_dagvattenStyle,
  op_dricksvatten: op_dricksvattenStyle,
  mex_belastningStyle: mex_belastningStyle,
  upplatelseStyle: upplatelseStyle,
  ritlager_yta: ritlager_ytaStyle,
  ritlager_linje: ritlager_linjeStyle,
  ritlager_punkt: ritlager_punktStyle,
  markplanering_yta: markplanering_ytaStyle,
  
};

export default function styleFunctions(customStyle, params) {
  if (customStyle in customStyles) {
    return customStyles[customStyle](params);
  }
  return customStyles.default(params);
}
