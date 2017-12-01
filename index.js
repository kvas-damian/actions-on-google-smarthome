'use strict';

const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

function mainIntent (app) {
    app.askWithList('What would you like to do?',
      app.buildList('Available options')
        .addItems([
            app.buildOptionItem("switch 2", ['heater']).setTitle('Turn on heating'),
            app.buildOptionItem("switch 1", ['water']).setTitle('Turn on water heating'),
            app.buildOptionItem("switch 3", ['circulation']).setTitle('Turn on water circulation'),
            app.buildOptionItem("switch 4").setTitle('Turn on test'),
    ]));
    
/*app.askWithCarousel('Which of these looks good?',
    app.buildCarousel()
         .addItems([
            app.buildOptionItem("2", ['heater']).setTitle('Turn on heating'),
            app.buildOptionItem("1", ['water']).setTitle('Turn on water heating'),
            app.buildOptionItem("3", ['circulation']).setTitle('Turn on water circulation'),
            app.buildOptionItem("4").setTitle('Turn on test'),
]));
*/}

function turnOn (app) {
    app.ask('Turning on ' + app.getArgument('device'));
}

function respond (app) {
    app.ask('Can\'t recognize what you want from me. You said ' + app.getRawInput());
}

function optionIntent (app) {
    app.tell(app.getSelectedOption() + ' is a great choice!');
}

// parse application/json
app.use(bodyParser.json());

app.all('*', (request, response) => {
console.log(request.body.inputs[0].rawInputs, request.body.inputs[0].arguments);
    const app = new ActionsSdkApp({request, response});
    

console.log(JSON.stringify(request.body));
    let actionMap = new Map();

    actionMap.set(app.StandardIntents.MAIN, mainIntent);
    actionMap.set('smarthome.action.devices.TURNON', turnOn);
    actionMap.set(app.StandardIntents.TEXT, respond);
    actionMap.set(app.StandardIntents.OPTION, optionIntent);


    app.handleRequest(actionMap);
});

app.listen(7600, () => console.log('Example app listening on port 7600!'));