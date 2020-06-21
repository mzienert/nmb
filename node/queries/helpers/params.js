const eventConstants = require('../../constants/events');
const imageConstants = require('../../constants/images');

const paramBuilder = data => {
  let params;

  switch (data.query) {
    case eventConstants.LIST_EVENTS:
      return params = {
        TableName: data.table,
      }
      break;

    case eventConstants.GET_EVENT:
      return params = {
        TableName: data.table,
        Key:{
          "id": parseInt(data.id),
          "date": data.date,
        }
      };
      break;

    case eventConstants.GET_MAX_EVENT_ID:
      return params = {
        TableName: data.table,
        ProjectionExpression: 'id',
      }
      break;

    case eventConstants.CREATE_EVENT:
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

    case imageConstants.LIST_IMAGES:
      return params = {
        TableName: 'Data',
        Key:{
          "page": 'Images',
          "type": 'Image',
        }
      }
      break;

    default:;
  }

};

module.exports = paramBuilder;
