class Cache {

  set(key: string, value: any): void {
    wx.setStorageSync(key, JSON.stringify(value));
  }

  get(key: string): any {
    const value = wx.getStorageSync(key)
    if (value) {
      return JSON.parse(value)
    }
    return null;
  }

  remove(key: string): void {
    wx.removeStorageSync(key);
  }

  clear(): void {
    wx.clearStorage();
  }
}

export default new Cache()