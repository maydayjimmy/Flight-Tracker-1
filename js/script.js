// IIFE - immediately invoked function expresion (all variables are local)
$(function() {

// Confirm JS is linked
console.log("js is working")


// Constants and Variables ---------------------------------------------
const API_URL = "https://airlabs.co/api/v9/flight?";
const fltIATA = "flight_iata="; // = aa354
const key = "&api_key=5e9bcac9-4573-44c1-892a-cd7da4fae82d"; // API Key


// Cache DOM Element Reference ---------------------------------------------
const $dpt = $('#dpt')
const $arr = $('#arr')
const $form = $('form') // Form is a section with the input boxes
const $airline = $('#airline')
const $fltnum = $('#fltnum')

// Register Event Listeners ---------------------------------------------
$form.on("submit", createURL)


// FUNCTIONS: -------------------------------------------------------------

// USE FILLER TEXT TO PREVENT UNNECESSARY REQUESTS

// Creates full API URL for ajax -------------------------------------------------------------
function createURL (event) {

    event.preventDefault();
    // stores input in userInput variable
    airline = $airline.val()
    fltnum = $fltnum.val()
    
    // if no input provided, do nothing
    if (airline === "" || fltnum ==="") return
    
    // Clear the input box after storing it as "userInput"
    // $airline.val('')
    // $fltnum.val('')

    // appends URL to the user inputted city and App ID code
    fullURL = API_URL+fltIATA+airline+fltnum+key

    console.log(fullURL)
    // format data to user friendly text

    // calls getData function 
    getData(fullURL)
}

// Gets data from API with ajax -------------------------------------------------------------
function getData(fullURL) {

    $.ajax(fullURL).then( ( data ) => {

        // if successful ajax, calls displayData function
        displayData(data)

    }, ( error ) => {

        // otherwise an error returned means bad connection
        console.log( 'bad request', error )
    } )
}

// Displays data to UI -------------------------------------------------------------
function displayData(data) {

    // Returns error if invalid flight is inputted
    if ('error' in data === true) { // if "error" key is in the "data" object
        $dpt.text("Flight Not Found")
        $arr.text("Flight Not Found")
    }

    else {
    // Display flight information
        console.log("ajax is working")
    
        // show departure airport name
        $dpt.text(data.response.dep_name)

        // show departure airport name
        $arr.text(data.response.arr_name)
    }
}
// -------------------------------------------------------------

})
