const request = require('request');
const parseString = require('xml2js').parseString;
const url = "https://assignments.reaktor.com/birdnest/drones"
const url2 = "https://assignments.reaktor.com/birdnest/pilots/"


module.exports = {
    droneData: function () {
        return new Promise(resolve => {
            request(url, (error, response) => {
                if (response?.body){
                    parseString(response.body, function (error, result) {
                        resolve(result?.report?.capture[0]?.drone)
                    });
                }
                else {resolve(null)}
            })
        })
    },
    pilotData: function (droneSerialNumber) {
        return new Promise(resolve => {
            request((url2 + droneSerialNumber),{json: true}, (error, response) => {
                if (response?.body) {
                    resolve(response.body) 
                }
                else { resolve(null) }      
            })
        })
    }
}




