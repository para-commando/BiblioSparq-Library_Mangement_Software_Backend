const { Op } = require('sequelize');
const sequelize = require('sequelize');

module.exports.getPropertiesWithValidValues =
  function getPropertiesWithValidValues(obj) {
    const newArray = Object.keys(obj)
      .filter((key) => obj[key]?.length >= 1 || obj[key] >= 1)
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});

    return newArray;
  };

  module.exports.getDateFilterValuesForBooKAddedDate =
  function getDateFilterValuesForBooKAddedDate({
    key,
    startYear = new Date().getFullYear(),
    endYear = new Date().getFullYear(),
  }) {
     const keyName =Object.keys(key)[0];
    // to prevent from entering 0 as value when choosing the condition 'LastXmonthsBack'
    key[keyName] = key[keyName]===0 ? 1 : key[keyName];
    const now = new Date();
    const month = 0; // January is month 0
    const day = 1;
    switch (keyName) {
      case 'between':
        return {
          [Op.between]: [
            new Date(startYear, month, day).toISOString(),
            new Date(endYear, month, day).toISOString(),
          ],
        };
      case 'after':
        return { [Op.gt]: new Date(startYear, month, day).toISOString() };

      case 'before':
        return { [Op.lt]: new Date(startYear, month, day).toISOString() };

      case 'on':
        return {
          [Op.between]: [
            new Date(`${startYear}-01-01T00:00:00.000Z`),
            new Date(`${startYear}-12-31T23:59:59.999Z`),
          ],
        };
      case 'lastSevenDays':
        return {
          [Op.gte]: new Date(now - 7 * 24 * 60 * 60 * 1000),
        };
      case 'thisMonth':
        return {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth(), 1),
        };
      case 'thisQuarter':
        return {
          [Op.gte]: new Date(
            now.getFullYear(),
            Math.floor(now.getMonth() / 3) * 3,
            1
          ),
        };
      case 'lastQuarter':
        return {
          [Op.gte]: new Date(
            now.getFullYear(),
            Math.floor(now.getMonth() / 3) * 3 - 3,
            1
          ),
          [Op.lt]: new Date(
            now.getFullYear(),
            Math.floor(now.getMonth() / 3) * 3,
            1
          ),
        };
      case 'thisYear':
        return {
          [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
        };
      case 'lastSixMonths':
        return {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth() - 5, 1),
        };
      case 'LastXmonthsBack':
       debugger  
        return {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth() - key[keyName]-1, 1),
        };
      default:
        throw new Error('Invalid key provided.');
    }
  };

module.exports.getDateFilterValuesForYearOfPublication =
  function getDateFilterValuesForYearOfPublication({
    key,
    startYear = new Date().getFullYear(),
    endYear = new Date().getFullYear(),
  }) {

    const now = new Date();

    switch (key) {
      case 'between':
        return sequelize.literal(
          `CAST("publishedYear" AS INTEGER) >= ${startYear} AND CAST("publishedYear" AS INTEGER) <= ${endYear}`
        );
      case 'after':
        return sequelize.literal(
          `CAST("publishedYear" AS INTEGER) > ${startYear}`
        );
      case 'before':
        return sequelize.literal(
          `CAST("publishedYear" AS INTEGER) < ${startYear}`
        );

      case 'on':
        return sequelize.literal(
          `CAST("publishedYear" AS INTEGER) = ${startYear}`
        );
      case 'lastSevenDays':
        return {
          [Op.gte]: new Date(now - 7 * 24 * 60 * 60 * 1000),
        };
      case 'thisMonth':
        return {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth(), 1),
        };
      case 'thisQuarter':
        return {
          [Op.gte]: new Date(
            now.getFullYear(),
            Math.floor(now.getMonth() / 3) * 3,
            1
          ),
        };
      case 'lastQuarter':
        return {
          [Op.gte]: new Date(
            now.getFullYear(),
            Math.floor(now.getMonth() / 3) * 3 - 3,
            1
          ),
          [Op.lt]: new Date(
            now.getFullYear(),
            Math.floor(now.getMonth() / 3) * 3,
            1
          ),
        };
      case 'thisYear':
        return {
          [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
        };
      case 'lastSixMonths':
        return {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth() - 5, 1),
        };
      default:
        throw new Error('Invalid key provided.');
    }
  };
