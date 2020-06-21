const docClient = require('../config/db');
const paramBuilder = require('./helpers/params')
const constants = require('../constants/images');
const table = 'Data';

const listAll = async () => {
  const paramData = {
    table,
    query: constants.LIST_IMAGES,
  };
  const params = paramBuilder(paramData);

  const result = await docClient.scan(params).promise();
  return JSON.stringify(result);
}

module.exports = {
  listAll,
}
