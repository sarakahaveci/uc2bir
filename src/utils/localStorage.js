// use this class to access localStorage in the whole project in order to use desktop/key type namespace distinction between keys that are set by
// ng-bilyoner mobile project that lives on the same domain
class LocalStorage {
  get = (key) => {
    return JSON.parse(localStorage?.getItem(`${key}`));
  };

  set = (key, value) => {
    return localStorage?.setItem(`${key}`, JSON.stringify(value));
  };

  remove = (key, value) => {
    // if remove func have a value, this method deletes the value from the object
    if (value) {
      const item = JSON.parse(localStorage?.getItem(`${key}`));

      if (item) {
        delete item[value];
      }
      return localStorage?.setItem(`${key}`, JSON.stringify(item));
      // else, this method deletes the all object
    }
    return localStorage?.removeItem(`${key}`);
  };

  clear = () => {
    return localStorage?.clear();
  };
}

export default new LocalStorage();
