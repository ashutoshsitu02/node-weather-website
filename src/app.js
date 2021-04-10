const express=require("express");
const path=require("path")
const hbs=require('hbs');
const forecast = require("../src/utils/forecast");
const geocode = require("../src/utils/geocode");


const app=express();

const indexPath=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partiles")

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(indexPath));

app.get('',(req,res)=>{
    res.render("index",{
        "title":"Weather",
        "name":"Ashutosh"
    });
}) 

app.get('/about',(req,res)=>{
    res.render('about',{
        "title":"About Me",
        "name":"Ashutosh"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        "Branch":"India",
        "Contact":"Number Does not Exist",
        "title":"Help",
        "name":"Ashutosh"
    })
})

app.get('/weather',(req,res)=>{
        if(!req.query.address){
          return  res.send({
              error:"Please provide the address"
            });
        }
      geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
          if(error){
              res.send({error});
          }
          forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
          })
      })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        "title":"404",
        "name":"Ashutosh",
        "errorMsg":"Help article not found"
    });
})

app.get("*",(req,res)=>{
    res.render("404",{
        "title":"404",
        "name":"Ashutosh",
        "errorMsg":"Page not found"
    });
})

app.listen(3000,()=>console.log("Hey we are back online"));

