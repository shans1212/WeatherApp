console.log('Client Side JavaScript Loaded Successfully')




// Fetching a JS representation of the Form element.
const weatherForm = document.querySelector('form')
// Fetching the entered value
const searchTerm = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchTerm.value
    
    messageOne.textContent = 'loading.....'
    messageTwo.textContent = ''
        fetch('http://localhost:3000/weather?address=' + location).then( (response) => {
        response.json().then( (data) => {
            if(data.error)
            {
                // return console.log('An Error Occured While Processing Request.')
               return messageTwo.textContent = 'An Error Occured While Processing Request.'
            }
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
        })
    })
})








