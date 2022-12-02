// IIFE - immediately invoked function expresion (all variables are local)
$(function() {

// Confirm JS is linked
console.log("js is working")


// Constants and Variables ---------------------------------------------
const API_URL = "https://airlabs.co/api/v9/flight?";
const fltIATA = "flight_iata="; // = aa354
const key = "&api_key=5e9bcac9-4573-44c1-892a-cd7da4fae82d"; // API Key


// Cache DOM Element Reference ---------------------------------------------
const $flight = $('#flight')
const $fltcode = $('#fltcode')
const $status = $('#status')

const $dptapt = $('#dptapt')
const $arrapt = $('#arrapt')

const $dptgate = $('#dptgate')
const $arrgate = $('#arrgate')

const $schdpt = $('#schdpt')
const $scharr = $('#scharr')

const $accdpt = $('#accdpt')
const $accarr = $('#accarr')

const $estdpt = $('#estdpt')
const $estarr = $('#estarr')

const $aircraft = $('#aircraft')
const $speed = $('#speed')
const $altitude = $('#altitude')
const $heading = $('#heading')

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
        console.log("displays")
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
        $dptapt.text("Flight Not Found")
        $arrapt.text("Flight Not Found")
    }

    else {
    // Display flight information
        console.log("ajax is working")

        // show airline name and flight number
        $flight.text(data.response.airline_name + " " + data.response.flight_number)

        // show flight iata/icao number
        $fltcode.text(`(${data.response.flight_icao}/${data.response.flight_iata})`)

        // show flight status
        // Capitalize the first letter of the status //

        $status.text(data.response.status)
    
        // show dep airport and arr airport details
        console.log(data.response.dep_icao)

        $dptapt.text(`${data.response.dep_name} (${data.response.dep_icao}) - ${data.response.dep_city}, ${data.response.dep_country}`)
        $arrapt.text(`---------> ${data.response.arr_name} (${data.response.arr_icao}) - ${data.response.arr_city}, ${data.response.arr_country}`)

        // show dep and arr gate/terminal details
        $dptgate.text(`${data.response.dep_gate} (Terminal ${data.response.dep_terminal})`)
        $arrgate.text(`${data.response.arr_gate} (Terminal ${data.response.arr_terminal})`)

        // show times
        $schdpt.text(data.response.dep_time)
        $scharr.text(data.response.arr_time)
        $estdpt.text(data.response.dep_estimated)
        $estarr.text(data.response.arr_estimated)
        $accdpt.text(data.response.dep_actual)
        $accarr.text(data.response.arr_actual)

        // show current aircraft stats
        $aircraft.text(`${data.response.aircraft_icao}`)
        $speed.text(`${data.response.speed} kph`)
        $altitude.text(`${data.response.alt} ft`)
        $heading.text(`${data.response.dir} deg`)
        // 

    }
}
// -------------------------------------------------------------

})
