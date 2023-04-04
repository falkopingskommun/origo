import getcenter from './geometry/getcenter';
import getarea from './geometry/getarea';
import getarea_ha from './geometry/getarea_ha';
import getlength from './geometry/getlength';

const geom = {};
geom.center = getcenter;
geom.area = getarea;
geom.area_ha = getarea_ha;
geom.length = getlength;

export default geom;
