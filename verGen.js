#!/usr/bin/env
let fileJson =  "package.json";
let fileIndexHtml =  "dist/lk7-front/index.html";
let strParam = '{version}';

const fs = require('fs');

try {
  const data = fs.readFileSync(fileJson, 'utf8');
  const jsonData = JSON.parse(data);
  console.log('', jsonData.version);
  let dataIndex = fs.readFileSync(fileIndexHtml, 'utf8');
  dataIndex = dataIndex.replace(strParam, jsonData.version);
  fs.writeFile(fileIndexHtml, dataIndex, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Работа сделанна');
  })
}
catch (e) {
    console.error('Ошибка при подмене версии.');
}

return null;
