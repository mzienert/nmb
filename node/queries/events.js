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
  console.log('param query data', paramData)
  const params = paramBuilder(paramData);

  const result = await docClient.get(params).promise();
  return JSON.stringify(result);
}

const createEvent = async (eventData) => {
  let paramData = {
    table,
    query: constants.GET_MAX_EVENT_ID,
  };
  let params = paramBuilder(paramData);
  const idResult = await docClient.scan(params).promise();
  const idList = [];
  for (const item of idResult.Items) {
    idList.push(item.id)
  }
  const maxId = idList.length ? idList.sort((a, b) => b - a )[0] : 0;
  paramData = {
    table,
    newId: maxId + 1,
    date: eventData.date,
    title: eventData.title,
    body: eventData.body,
    type: eventData.type,
    allDay: eventData.allDay,
    endTime: eventData.endTime,
    query: constants.CREATE_EVENT,
  }

  params = paramBuilder(paramData);
  const insertResult = await docClient.put(params).promise();
  return JSON.stringify(insertResult);
}

module.exports = {
  listAll,
  getEvent,
  createEvent,
}
