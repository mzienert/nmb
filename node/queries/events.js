const docClient = require('../config/db');
const paramBuilder = require('./helpers/params')
const constants = require('../constants/events');
const table = 'Events';

const listAll = async () => {
  const paramData = {
    table,
    query: constants.LIST_EVENTS,
  };
  const params = paramBuilder(paramData);

  const result = await docClient.scan(params).promise();
  return JSON.stringify(result);
}

const getEvent = async (id, date) => {
  const paramData = {
    table,
    id,
    date,
    query: constants.GET_EVENT,
  };
  const params = paramBuilder(paramData);

  const result = await docClient.get(params).promise();
  return JSON.stringify(result);
}

const createEvent = async () => {
  const paramData = {
    table,
    query: constants.GET_MAX_EVENT_ID,
  };
  const params = paramBuilder(paramData);
  const idResult = await docClient.scan(params).promise();
  const idList = [];
  for (const item of idResult.Items) {
    idList.push(item.id)
  }
  const maxId = idList.sort((a, b) => b - a )[0];


  return JSON.stringify(maxId);
}

module.exports = {
  listAll,
  getEvent,
  createEvent,
}
