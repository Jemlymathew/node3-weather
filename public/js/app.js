console.log('Client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
   response.json().then((data) => {
       console.log(data)
   })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Loading..'
messageTwo.textContent =''

weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()

    const location = search.value
    console.log(location)

    if(!location){
        messageOne.textContent ='Enter a location'
    }
    else {

   
    url ='http://api.weatherstack.com/current?access_key=88d5255b23ddc1b74a85b0c1f9d8f76d&query='+location+'&units=f'

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            messageOne.textContent =data.error
        }
        else
        {
            messageOne.textContent = data.current.temperature
            messageTwo.textContent =data.current.weather_descriptions 
        }

        
    
    })
}) }
})