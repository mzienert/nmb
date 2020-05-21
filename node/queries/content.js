const docClient = require('../config/db');
const table = 'Content';

const getBg = async () => {
  const params = {
    TableName: table,
    Key:{
      "id": 3,
      "name": 'bg-img',
    }
  };

  const result = await docClient.get(params).promise();
  return JSON.stringify(result)
}

module.exports = {
  getBg,
}
