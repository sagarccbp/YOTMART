const { initializeApp } = require('firebase-admin/app');
const FCM = require('fcm-node');
var serverKey = require('../api/json/food_delivery.json');
var fcm = new FCM(serverKey)

module.exports = function (deviceToken,title,description,body) { 
    console.log(deviceToken,title,description,body);
    const message = {
        to: deviceToken,
        notification: {
            title: title,
            body:description,
        },
        data : body
    }
    console.log('Inside exporting function.. ');
    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!"+err);
            console.log("Respponse:! "+response);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

};
