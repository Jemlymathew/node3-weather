const request = require('request')

const forecast = (latitude,longitude,callback)  => {
   
    const url = 'https://api.darksky.net/forecast/1813b6d8bc976408a5f46b4e8ba7e560/' + latitude + ',' + longitude

    //const url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=72757ffa8345260f53ee558212cbc44e'
    request({url: url , json:true}, (error,{body}) => 
    {
        console.log(body)
        if(error) {
           return callback('Unable to connect to location services',undefined)
        }
       else if(body.error){
           return callback('Unable to find forecast location .Try another search' ,undefined)
        }
        callback(undefined, {
        
            temperature :body.currently.temperature,           
            summary: body.daily.data[0].summary
            
        })
    })
}

module.exports = forecast