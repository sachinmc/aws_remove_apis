const AWS = require('aws-sdk');
const { promisify } = require('util');
const getRegion = require('./getRegion');
AWS.config.apiVersion = 'latest';
AWS.config.region = getRegion(); 

const apigw = new AWS.APIGateway();
const asyncGetRestApis = promisify(apigw.getRestApis.bind(apigw));
const asyncDeleteRestApi = promisify(apigw.deleteRestApi.bind(apigw));

let data;
let time = 62000;
let restApiIds =[];
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

(async() => {
  data = await asyncGetRestApis();
  data.items.forEach((apis) => restApiIds.push(apis.id));
  for (let i = 0; i < restApiIds.length; i += 1) {
    try {
      await asyncDeleteRestApi({ restApiId: restApiIds[i] });
      console.log(`${restApiIds[i]} deleted`);
      await sleep(time);
    } catch(err) {
      console.log(err);
    }
  }
})();
