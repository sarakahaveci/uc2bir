// use this class to access localStorage in the whole project in order to use desktop/key type namespace distinction between keys that are set by
// ng-bilyoner mobile project that lives on the same domain
/* eslint-disable no-use-before-define */
class LocalStorage {
  get = (key) => {
    const data = JSON.parse(localStorage?.getItem(`${key}`));
    if (data?.__expireDate) {
      const now = new Date();
      const expireDate = new Date(data.__expireDate);
      if (now < expireDate) {
        return data;
      } else {
        this.remove(key);
        return null;
      }
    } else {
      return data;
    }
  };
  set = (key, value, expireMinute) => {
    if (expireMinute) {
      //+ expireMinute dakika sonra expire ol
      var now = new Date();
      now.setMinutes(now.getMinutes() + expireMinute);
      const newDate = new Date(now);
      return localStorage?.setItem(
        `${key}`,
        JSON.stringify({ ...value, __expireDate: newDate })
      );
    } else {
      return localStorage?.setItem(`${key}`, JSON.stringify(value));
    }
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
