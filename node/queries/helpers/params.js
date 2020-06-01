const constants = require('../../constants/events');

const paramBuilder = data => {
  let params;

  switch (data.query) {
    case constants.LIST_EVENTS:
      return params = {
        TableName: data.table,
        ProjectionExpression: 'title',
        FilterExpression: '#dt < :cur_dt',
        ExpressionAttributeNames: {
          '#dt': 'date',
        },
        ExpressionAttributeValues: {
          ':cur_dt': Date.now(),
        },
      }
      break;

    case constants.GET_EVENT:
      return params = {
        TableName: data.table,
        Key:{
          "id": data.id,
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
          date: parseInt(data.date),
          body: data.body,
        }
      }
      break;

    default:;
  }

};

module.exports = paramBuilder;