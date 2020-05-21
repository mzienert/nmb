const docClient = require('../config/db');
const table = 'Content';

const getBg = async () => {
  const params = {
    TableName: table,
    Key:{
      "id": 3,
      "name": 'bg-img',
    },
  };

  const result = await docClient.get(params).promise();
  return JSON.stringify(result)
}

const getBlockOne = async () => {
  const params = {
    TableName: table,
    Key: {
      "id": 1,
      "name": "block-1",
    },
  };

  const result = await docClient.get(params).promise();
  return JSON.stringify(result)
}

const getBlockTwo = async () => {
  const params = {
    TableName: table,
    Key: {
      "id": 2,
      "name": "block-2",
    },
  };

  const result = await docClient.get(params).promise();
  return JSON.stringify(result)
}

module.exports = {
  getBg,
  getBlockOne,
  getBlockTwo,
}
