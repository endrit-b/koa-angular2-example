const koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const port: number = process.env.PORT || 3000;
const app = koa();
const fs = require('fs');


const views = require("co-view");

const runServer = () => {
    const render = views("dist", {map: {html: 'swig'}});

   router.get('/', function *(next) {
        this.body = yield render("index");
   });

    app
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(port, function () {
        console.log('Web app is listening on port:' + port);
    });
};

runServer();
