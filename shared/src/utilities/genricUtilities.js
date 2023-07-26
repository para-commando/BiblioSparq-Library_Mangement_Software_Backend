module.exports.cleanObject = function cleanObject(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value == null || value === '' || Number.isNaN(value)) {
        delete obj[key];
      }
    });
    return obj;
  };