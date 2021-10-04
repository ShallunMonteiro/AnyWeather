const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')

const app = express()
const port= process.env.PORT || 3000

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Home',
        name: 'Shallun King Monteiro'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name: 'Shallun King Monteiro'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helpText:'',
        title:'Help',
        name: 'Shallun King Monteiro'
    })
})

app.get('/products',(req,res)=>{

    if (!req.query.search){
            return res.send({
                 error:'You must provide a search term.'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    res.render('weather',{
        title:'Weather',
        name:'Shallun King Monteiro'
    })
})

app.get('/weatherforecast',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                latitude,longitude,
                address:req.query.address
            })
        })
    })
     
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Shallun King Monteiro',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Shallun Monteiro',
        errorMessage:'Page Not Found.'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port+'.')
})