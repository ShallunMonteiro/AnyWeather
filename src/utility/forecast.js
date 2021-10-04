const request = require('postman-request')

const forecast=(latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=80313d5d853197d753419c8930424c85&query='+latitude+','+longitude+'&units=m'
    
    request( {url, json:true}, (error, {body}={} ) => {
        if(error){
            callback('Cannot connect to server check your network connection.', undefined)
        }
        else if(body.error){
            callback('Weather services unavailable for your location. Try a different location.',undefined)
        }
        else{
            callback(undefined,
                body.current.weather_descriptions[0]+".\nThe current temperature is "+body.current.temperature+
                " degree celsius. \nIt feels like "+body.current.feelslike+" degree Celsius. \nThe Humidity is "+body.current.humidity+"%."
            )
        }
    })
}



module.exports=forecast