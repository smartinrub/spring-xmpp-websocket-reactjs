/**
 * @file Local storage helper.
 */

class Storage {
  /**
   * Sets a local storage item with a given key and value.
   * @param {string} key - The key under which the item will be stored.
   * @param {*} value - The value that will be stored under the given key.
   */
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Returns the value of a given key.
   * @param {string} key - The key of which value we're looking for.
   * @param {*} defaultVal - An optional value in case the given key doesn't exist.
   */
  get(key, defaultVal = null) {
    try {
      if (!this.has(key)) {
        return defaultVal;
      }

      return JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if a given key exists.
   * @param {string} key - The key against which the check will be run.
   */
  has(key) {
    return window.localStorage.getItem(key) !== null;
  }

  /**
   * Clears a given key.
   * @param {string} key - The key to be removed from local storage.
   */
  forget(key) {
    window.localStorage.removeItem(key);
  }

  /**
   * Clears all stored keys.
   */
  destroy() {
    window.localStorage.clear();
  }
}

export default new Storage();
