import App from "./core/initApp.js";
import { generateRestFul } from "./core/api.js";
import genenrateWechatApis from "./wechat/wanchehui.api.js";
import homeRoute from './routes/home.js';
import approute from './routes/app.js';
import apiRoute from './routes/api/api.js';

//load models;
import { Models } from './models/registerModel.js';
import { validClient } from "./middles/serverkey.js";
import mobile_sms_route from "./routes/api/mobile_sms.js";
import simple from "./routes/api/simple.js";

console.log("=========================================================");


genenrateWechatApis(App);


App.use(apiRoute.routes()).use(apiRoute.allowedMethods())
App.use(approute.routes()).use(approute.allowedMethods())
App.use(homeRoute.routes()).use(homeRoute.allowedMethods())
App.use(mobile_sms_route.routes()).use(mobile_sms_route.allowedMethods());
App.use(simple.routes()).use(mobile_sms_route.allowedMethods());

App.use(validClient);
Models.forEach(model => {
    generateRestFul(model.collectionName, App, model);
});





App.listen(1235);

console.log("=========================================================");

console.log('应用启动在端口1235， 请确保端口不被占用')
