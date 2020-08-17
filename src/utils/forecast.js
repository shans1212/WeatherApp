const request = require('request')


const foreCast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2f3a22c7afec9f1ba6630b0801ac40ce&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + '&units=m'

    request({url, json:true}, (error, {body} = {} ) => {
        if (error)
        {
            callback("Unable To Connect To Weather Service.", undefined)
        }
        else if (body.error)
        {
            callback(body.error.info, undefined)
        }
        else{  
            //callback("Forecast for " + body.location.name + ", " + body.location.country + ", " + body.location.region + " is:" )
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature + " degrees out." + "It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = foreCast

