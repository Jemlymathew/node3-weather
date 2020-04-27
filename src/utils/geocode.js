const request = require('request')

const geocode = (address,callback)  => {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiamVtbHlqZXJyeSIsImEiOiJjazhvdDZpemQxY2U5M2twZ3A1YnoxaTlvIn0.ZCLdKNJUK-Fr1zLQG33gFw'

     request({url: url , json:true}, (error,{body}) => {
        if(error) {
            return callback('Unable to connect to location services',undefined)
        }
        else if(body.features.length == 0 ){
            console.log(body.features)        
            return callback('Unable to find location ' + address + ' .Try another search' ,undefined)

        }
      
        callback(undefined, {
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode

