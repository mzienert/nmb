const docClient = require('../config/db');
const table = 'Events';

const listAll = async () => {
  const params = {
    TableName: table,
    ProjectionExpression: "title",
    FilterExpression: "#dt < :cur_dt",
    ExpressionAttributeNames: {
      "#dt": "date",
    },
    ExpressionAttributeValues: {
      ":cur_dt": Date.now(),
    }
  };

  const result = await docClient.scan(params).promise();
  return JSON.stringify(result)
}

const getEvent = async (id, date) => {
  const params = {
    TableName: table,
    Key:{
      "id": id,
      "date": date,
    }
  };

  const result = await docClient.get(params).promise();
  return JSON.stringify(result)
}

module.exports = {
  listAll,
  getEvent
}
