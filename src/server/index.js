import App from "./core/initApp.js";
import { generateRestFul } from "./core/api.js";
console.log("123=========================================================");

//load models;
import { Models } from './models/registerModel.js';

Models.forEach(model => {
    generateRestFul(model.collectionName, App, model);
});

App.listen(3000);
console.log('[demo] start-quick is starting at port 3000')
