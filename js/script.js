


// LETS CHANGE THIS API TO AIRLABS.CO

console.log("js is working")

///////////
// VARIABLES
///////////
const API_URL = "https://airlabs.co/api/v9/flight?";
const fltIATA = "flight_iata=aa354"; // = aa354
const key = "&api_key=5e9bcac9-4573-44c1-892a-cd7da4fae82d"; // API Key

///////////
// ELEMENTS REF'D / CACHED ELEMENTS
///////////

const $dpt = $('#dpt')
const $arr = $('#arr')
const $form = $('form') // Form is a section with the input boxes


// ERROR IS INPUT IS NOT GETTING APPENDED ONTO URL (INPUT IS NOT BEING SET ITS EMPTY)
const $input = $('input[type="text"]')

///////////
// EVENT LISTENERS
$form.on("submit", getData)

///////////
// FUNCTIONS
///////////

// USE FILLER TEXT TO PREVENT UNNECESSARY REQUESTS

function getData(event) {
    console.log("hi")

    event.preventDefault();
    // stores input in userInput variable
    // userInput = $input.val()
    
    // if no input provided, do nothing
    // if (airline === "" || fltnum ==="") return
    
    // Clear the input box after storing it as "userInput"
    // $airline.val('')
    // $fltnum.val('')

    // appends URL to the user inputted city and App ID code
    fullURL = API_URL+fltIATA+key

    console.log(fullURL)
    // format data to user friendly text

    $.ajax(fullURL).then( ( data ) => {

        console.log("ajax is working")

        $dpt.text(data.response.dep_name)
        $arr.text(data.response.arr_name)

    }, ( error ) => {
        console.log( 'bad request', error )
    } )
}
