const storage = {
    get: (key) => {
        return window.localStorage.getItem(key);
    },
    set: (key, value) => {
        window.localStorage.setItem(key, value);
    },
    remove: (key) => {
        window.localStorage.removeItem(key);
    },
    clearAll: () => {
        window.localStorage.clear();
    },
};

export default storage;