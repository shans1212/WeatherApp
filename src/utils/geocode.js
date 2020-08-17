const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhbnMxMjEiLCJhIjoiY2tja210djkxMXZuazJ0bzh5eDdmaDBhZCJ9.-cUCrLUil6mXq69JAbZF6A&limit=1'
    request({url, json: true}, (error, { body} = {} ) => {
        if (error){
            callback("Unable To Connect To Location Service.", undefined)
        }
        else if (body.features.length === 0)
        {
            callback("Locaton Not Found. Please Check The Location.", undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode


