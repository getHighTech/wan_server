import App from './core/initApp.mjs';
import { generateRestFul } from './core/api.mjs';

//load models;
import { Models } from './models/registerModel.mjs';

Models.forEach(model => {
    generateRestFul(model.collectionName, App, model);
});

App.listen(3000);
console.log('[demo] start-quick is starting at port 3000')
