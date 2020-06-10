const constants = require('../../constants/events');

const paramBuilder = data => {
  let params;

  switch (data.query) {
    case constants.LIST_EVENTS:
      return params = {
        TableName: data.table,
      }
      break;

    case constants.GET_EVENT:
      return params = {
        TableName: data.table,
        Key:{
          "id": parseInt(data.id),
          "date": data.date,
        }
      };
      break;

    case constants.GET_MAX_EVENT_ID:
      return params = {
        TableName: data.table,
        ProjectionExpression: 'id',
      }
      break;

    case constants.CREATE_EVENT:
      return params = {
        TableName: data.table,
        Item: {
          id: parseInt(data.newId),
          title: data.title,
          date: data.date,
          description: data.body,
          type: data.type,
          allDay: data.allDay,
          endTime: data.endTime,
        }
      }
      break;

    default:;
  }

};

module.exports = paramBuilder;
