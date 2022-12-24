const request = require('request');
const parseString = require('xml2js').parseString;
const url = "https://assignments.reaktor.com/birdnest/drones"
const url2 = "https://assignments.reaktor.com/birdnest/pilots/"


module.exports = {
    droneData: function () {
        return new Promise(resolve => {
            request(url, (error, response, body) => {
                if (error) { resolve(null) }
                if (response != undefined ){
                    parseString(body, function (error, result) {
                        if (error) { resolve(null)}
                        if (result != undefined) {
                            var drones = result.report.capture[0].drone
                            resolve(drones);
                        }

                    });
                }
            })
        })
    },
    pilotData: function (droneSerialNumber) {
        return new Promise(resolve => {
            request((url2 + droneSerialNumber),{json: true}, (error, response) => {
                if (error) { resolve(null) }
                resolve(response.body) 
            })
        })
    }
}




