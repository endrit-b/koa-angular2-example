const koa = require('koa'),
    router = require('koa-router')(),
    serveStatic = require('koa-static');

const
    port: number = process.env.PORT || 3000;

const
    views = require("co-view");

const runServer = () => {

    const app = koa();
    const render = views("dist", {map: {html: 'swig'}});

   router.get('/', function *(next) {
        this.body = yield render("index");
   });

    app
        .use(serveStatic('./dist'))
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(port, function () {
        console.log('Web app is listening on port:' + port);
    });
};

runServer();
