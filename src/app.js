const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const geoCode = require('../../weather-app/utils/geocode')

const app = express() 
// Setting up port to use either the port value provided by Heroku or local port if running on local 
const port = process.env.PORT || 3000 
 
const viewDirectory = path.join(__dirname, '../templates/views') // temeplates/views is the directory where our views are stored. Renamed views to templates.
const partialsDirectory = path.join(__dirname, '../templates/partials') // For partials. 

// Setup handlebars engine and views directory and hbs partials.
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialsDirectory)

// Setup public directory to serve static assets. 
const publicDirectoryPath = path.join(__dirname, '../public') // Storing the path inside a variable.

app.use(express.static(publicDirectoryPath))  // Loading the static asset. 

// Index or home page route using hbs view engine. Here we render it dynamically instead of serving up static page.  
app.get('', (req,res) => {   
    res.render('index', {           // Param 1 is the name of view file, param 2 is an object having the values for variables that we want to show.           
        title: 'Weather.',
        name: 'Shans121'
    })   
})


// About route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shans121'
    })
})

// Help Route
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        helpTxt: 'Just Enter A Location and Press Search. It Will Fetch The Current Weather Details.',
        name: 'Shans121'
    })
})

// Weather Route
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send( {
            error: 'Address Must Be Provided.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error){
            return res.send( {
                error: 'An error occcured during geocoding.'
            })   
        }
      
        forecast(longitude,latitude, (error, forecastData) => {
            if(error){
               return res.send({
                    error
                })  
            }
            res.send({
                forecast: forecastData,
                location: "Result fetched for the following location: " +location,  //Shorthand as property and value name are same location: location
                address: "<p>Address</p>"+ req.query.address
            })
        })
    } )
  
})

app.get('/products', (req, res) => {
    if (!req.query.search)
    {
        return res.send( {
            error: 'Search Term Cannot Be Empty.'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

// Page sub-section 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorTxt: 'Help Article Not Found.',
        name: 'Shans121'
    })
})

// 404
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorTxt: 'Page Not Found. (Error 404)',
        name: 'Shans121'
    })
})


app.listen(port, () => {
    console.log("Server is up on port: " + port)
})

