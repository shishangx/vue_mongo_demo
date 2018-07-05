﻿# vue_mongo_demo

> Vue + Express + MongoDB

> support register | search.
> part of codes from https://github.com/qiusuo8/vue-express-login-demo, thanks for the author.if any question, please contact me.

## Setup
``` bash
# init vue project
npm i -g vue-cli
vue init webpack vue_mongo_demo

# run vue project
cd vue_mongo_demo
npm run dev

# install express
npm install express -save

# install MongoDB
npm install mongoose -save

# install mongo and start mongo database service
for example:mongod --dbpath d:\data\db

# run server
cd server
node index

# browser the website
http://localhost:8080/#/  or http://yourIP:8080/#/

```

## cross-domain
you can change the localhost to your owner ip for other people browser the website. 
```
proxyTable: {
      '/api': {
        target: 'http://localhost:8089/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
```

## Vue Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
