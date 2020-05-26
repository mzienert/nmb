const { constants } = require('../../constants/events');

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
    case constants.CREATE_EVENT:

    default:;
  }


};

module.exports = paramBuilder;
