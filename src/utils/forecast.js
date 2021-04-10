const request=require("request");

//weather_app

const forecast=(longitude,latitude,callback)=>{
const url =
  "http://api.weatherstack.com/current?access_key=fc60e52f97417d1d05ce6e01ed9945ab&query="+latitude+","+longitude+"&units=f";

request({ url, json: true }, (error, {body}) => {
  if (error) {
    callback("Internet Connection problem",undefined);
  } else if (body.success === false) {
    callback("Loction is not specified",undefined);
  } else {
    callback(undefined,
      `Weather is ${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out.`
    );
  }
});}


  module.exports=forecast