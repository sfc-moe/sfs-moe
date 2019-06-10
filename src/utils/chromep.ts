// Convert Chrome API used into Promises

export default {
  storage: {
    local: {
      get: (keys: string | string[] | object | null): Promise<{ [key: string]: any }> => {
        return new Promise((resolve) => {
          chrome.storage.local.get(keys, (items) => {
            resolve(items);
          });
        });
      },
      set: (items: object) => {
        return new Promise((resolve) => {
          chrome.storage.local.set(items, () => {
            resolve();
          });
        });
      },
      remove: (keys: string | string[]) => {
        return new Promise((resolve) => {
          chrome.storage.local.remove(keys, () => {
            resolve();
          });
        });
      },
    },
  },
};
