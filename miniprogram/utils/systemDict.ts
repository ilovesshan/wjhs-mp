import cache from "./cache";

export function getStringByCode(code: string): string {
  const systemDictList = cache.get("systemDict");
  const finedDict = systemDictList.filter((item: any) => item.dictCode == code)[0]
  return finedDict == null ? "" : finedDict.dictDescribe;
}