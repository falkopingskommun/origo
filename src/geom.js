import getcenter from './geometry/getcenter';
import getarea from './geometry/getarea';
import getarea_ha from './geometry/getarea_ha';

const geom = {};
geom.center = getcenter;
geom.area = getarea;
geom.area_ha = getarea_ha;

export default geom;
