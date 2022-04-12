import round from '../utils/round';

export default function getArea_ha(geometryIn, decimals) {
  let area_ha = geometryIn.getArea ? geometryIn.getArea() : 0;
  console.log("1", decimals)
  if (decimals) {
    area_ha = round(area_ha/10000, decimals);
  } else {
    area_ha = round(area_ha/10000, '2');
  }
  return area_ha;
}
