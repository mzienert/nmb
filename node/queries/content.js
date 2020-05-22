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

const getBlock = async (id) => {
  const idInt = parseInt(id);
  const blockStr = `block-${id}`;
  const params = {
    TableName: table,
    Key: {
      "id": idInt,
      "name": blockStr.toString(),
    },
  };

  const result = await docClient.get(params).promise();
  return JSON.stringify(result)
}

module.exports = {
  getBg,
  getBlock,
}
