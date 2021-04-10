const request=require("request");
//Geo-loction

const geocode=(address,callback)=>{
const url =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNodXRvc2hzaXR1MjAiLCJhIjoiY2tteXZ2dDY0MDd3dzJwcGZ2NmU0bjc1YiJ9.hu_IVYKdl9i6UrChgkAm-Q&limit=1";

request({ url, json: true }, (error, {body}) => {
  if (error) {
    callback("Check your Internet Connction",undefined);
  } else if (body.features.length === 0) {
    callback("Unable to find the location",undefined);
  } else {
    callback(undefined,
         { longitude:body.features[0].center[0],
             latitude:body.features[0].center[1],
             location:body.features[0].place_name,
  })
}
})
}



module.exports=geocode;