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
  return JSON.stringify(result);
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
  return JSON.stringify(result);
}

const updateContent = async (data) => {
  const results = [];
  const records = [1,2];

  for(const record of records) {
    let content;

    if (record === 1) {
      content = data.one;
    } else if (record === 2) {
      content = data.two;
    }

    const blockStr = `block-${record}`;
    const params = {
      TableName:table,
      Key:{
        "id": record,
        "name": blockStr.toString()
      },
      UpdateExpression: "set content = :c",
      ExpressionAttributeValues:{
        ":c": content,

      },
      ReturnValues:"UPDATED_NEW"
    };

    const result = await docClient.update(params).promise();
    results.push(result);
  }

  return JSON.stringify(results);

}

const getMessage = async () => {
  const params = {
    TableName: table,
    Key: {
      "id": 4,
      "name": "message",
    },
  };

  const result = await docClient.get(params).promise();
  return JSON.stringify(result)
}

const updateMessage = async (data) => {
  const content = data.text;
  const params = {
    TableName:table,
    Key:{
      "id": 4,
      "name": "message"
    },
    UpdateExpression: "set content = :c",
    ExpressionAttributeValues:{
      ":c": content,

    },
    ReturnValues:"UPDATED_NEW"
  };

  const result = await docClient.update(params).promise();
  return JSON.stringify(result)
}

module.exports = {
  getBg,
  getBlock,
  updateContent,
  getMessage,
  updateMessage,
}
