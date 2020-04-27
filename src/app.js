const forecast = require('./utils/forecast')

const geocode = require('./utils/geocode')

const express = require('express')

const path  =require('path')

const app = express()
const hbs = require('hbs')

//define paths for Express Config
const viewspath = path.join(__dirname, '../templates')
const partialspath = path.join(__dirname,'../templates/partial')


//setup handlebars engine and view locations
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(path.join(__dirname , '../public')))

//app.com
//app.com/help
//app.com/about

app.get('',(req, res) => {
   // res.send('Hello Node Express')
   res.render('index',{
       title: 'Weather App',
       name: 'Jemly'
   })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Jemly'
    })
}

)

app.get('/about', (req,res) => {
   // res.send('<h1><u>About Page</u></h1>')

   res.render('about',{
    title: 'About Me',
    name: 'Jemly'
})
}

)


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        
        return res.send({
            error: 'You must provide an address!'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address, (error, { latitude , longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(location + '  ' +forecastData)
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
        res.send({
            products: {}
        })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'Jemly',
        errorMessage :'Help not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404', {
        title:'404',
        name:'Jemly',
        errorMessage :'Page not found'
    })
}


)

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})