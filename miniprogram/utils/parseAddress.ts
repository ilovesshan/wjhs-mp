export function parseAddress(address: string, name: string): Array<String> {

  const provinceIndex = address.indexOf("省") + 1;
  const cityIndex = address.indexOf("市") + 1;
  const areaIndex = address.indexOf("县") + 1 || address.indexOf("区") + 1;

  const province = address.substring(0, provinceIndex);
  const city = address.substring(provinceIndex, cityIndex);
  const area = address.substring(cityIndex, areaIndex);
  const detailAddress = address.substring(areaIndex) + name;
  
  return [province, city, area, detailAddress];
}