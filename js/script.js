// IIFE - immediately invoked function expresion (all variables are local)
$(function() {

document.querySelector('.content').style.visibility = 'hidden'

// Confirm JS is linked
console.log("js is working")


// Constants and Variables ---------------------------------------------
const API_URL = "https://airlabs.co/api/v9/flight?";
const fltIATA = "flight_iata="; // = aa354
const key = "&api_key=5e9bcac9-4573-44c1-892a-cd7da4fae82d"; // API Key


// Cache DOM Element Reference ---------------------------------------------
const $logo = $('#logo')

const $flight = $('#flight')
const $fltcode = $('#fltcode')
const $status = $('#status')
const $date = $('#date')

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

const $calculated = $('#calculated')

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
            document.querySelector('.content').style.visibility = 'visible'

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
            console.log("error")

            $flight.text("Flight Not Found")
            $(logo).attr("src", "./pics/default.png");
            $fltcode.text("")
            $status.text("-")
            $date.text("-")
            $dptapt.text("-")
            $arrapt.text("")
            $dptgate.text("-")
            $arrgate.text("-")
            $schdpt.text("-")
            $scharr.text("-")
            $accdpt.text("-")
            $accarr.text("-")
            $estdpt.text("-")
            $estarr.text("-")
            $calculated.text("")
            $aircraft.text("-")
            $speed.text("-")
            $altitude.text("-")
            $heading.text("-")
        }

        else {
        // Display flight information
            console.log("ajax is working")

            $calculated.text("")

            // Flight Info ------------------

            // show airline logo
            
            switch (data.response.airline_iata) {
                case "AA":
                    $(logo).attr("src", "./pics/aa.png");
                    break;      
                case "B6":
                    $(logo).attr("src", "./pics/b6.png");
                    break;      
                case "DL":
                    $(logo).attr("src", "./pics/dl.jpg");
                    break;      
                case "UA":
                    $(logo).attr("src", "./pics/ua.png");
                    break;      
                case "WN":
                    $(logo).attr("src", "./pics/wn.png");
                    break;
                case "AS":
                    $(logo).attr("src", "./pics/as.webp");
                    break;
                case "AC":
                    $(logo).attr("src", "./pics/ac.png");
                    break;
                case "NK":
                    $(logo).attr("src", "./pics/nk.png");
                    break;
                case "BA":
                    $(logo).attr("src", "./pics/ba.svg");
                    break;
                case "LH":
                    $(logo).attr("src", "./pics/lh.png");
                    break;
                case "AF":
                    $(logo).attr("src", "./pics/af.png");
                    break;
                case "KL":
                    $(logo).attr("src", "./pics/kl.png");
                    break;
                default: 
                    $(logo).attr("src", "./pics/default.png");
                // Need to code for flight not found, and airline logo does not exist
            }

            // show airline name and flight number
            $flight.text(data.response.airline_name + " " + data.response.flight_number)

            // show flight iata/icao number
            $fltcode.text(`(${data.response.flight_icao}/${data.response.flight_iata})`)

            // show flight status
            $status.text(data.response.status.toUpperCase())

            // Airport Info ------------------
        
            // show dep airport and arr airport details
            $dptapt.text(`${data.response.dep_name} (${data.response.dep_icao}) - ${data.response.dep_city}, ${data.response.dep_country}`)
            $arrapt.text(`--> ${data.response.arr_name} (${data.response.arr_icao}) - ${data.response.arr_city}, ${data.response.arr_country}`)

            // show dep and arr gate/terminal details
            // Check if gate/terminal values are null, then display them based which are defined
            // Departure Gate/Terminal
            if (data.response.dep_gate !== null && data.response.dep_gate !== undefined) {

            $dptgate.text(`${data.response.dep_gate}`)
    
                if (data.response.dep_terminal !== null && data.response.dep_terminal !== undefined) {
    
                    $dptgate.text(`${data.response.dep_gate} (Terminal ${data.response.dep_terminal})`)
                }
            }
            else {
                $dptgate.text("-")
            }

            // Arrival Gate/Terminal
            if (data.response.arr_gate !== null && data.response.arr_gate !== undefined) {

                $arrgate.text(`${data.response.arr_gate}`)
        
                    if (data.response.arr_terminal !== null && data.response.arr_terminal !== undefined) {
        
                        $arrgate.text(`${data.response.arr_gate} (Terminal ${data.response.arr_terminal})`)
                    }
            }
            else {
                $arrgate.text("-")
            }

            // Time Values ------------------

            // Scheduled
            // check if time values are null
            if (data.response.dep_time !== null && data.response.dep_time !== undefined) {
                // pulls time/date out of API time value using a substring
                schDepDate = new Date(data.response.dep_time.substring(0,10))
                schDepTime = data.response.dep_time.substring(11,17)

                // Show departure date
                $date.text(data.response.dep_time.substring(0,10))

                // Show departure time
                $schdpt.text(schDepTime)
            }
            else {
                $schdpt.text("-")
                $date.text("-")
            }

            if (data.response.arr_time !== null && data.response.arr_time !== undefined) {
                schArrDate = new Date(data.response.arr_time.substring(0,10))
                schArrTime = data.response.arr_time.substring(11,17)

                $scharr.text(schArrTime)

                // Check if arrival date is one day later
                // calculate time b/w sch dep date and arr date
                schTimeDiff = schDepDate.getTime() - schArrDate.getTime();
                // calculate days b/w sch dep date and arr date
                schDateDiff = schTimeDiff / (1000 * 3600 * 24);
                // difference is not equal to 0, then display date difference +1
                if (schDateDiff !== 0 ) {
                    $scharr.text(`${schArrTime} (+1)`)
                }
            }
            else {
                $scharr.text("-")
            }
            
            // Estimated
            if (data.response.dep_estimated !== null && data.response.dep_estimated !== undefined) {
                estDepDate = new Date(data.response.dep_estimated.substring(0,10))
                estDepTime = data.response.dep_estimated.substring(11,17)

                $estdpt.text(estDepTime)
            }
            else {
                $estdpt.text("-")
            }

            if (data.response.arr_estimated !== null && data.response.arr_estimated !== undefined) {
                estArrDate = new Date(data.response.arr_estimated.substring(0,10))
                estArrTime = data.response.arr_estimated.substring(11,17)

                $estarr.text(estArrTime)

                // Calculate (early, on-time, delayed) -----------------------
                // Calculate time difference (hrs/mins) between scheduled arrival and estimated arrival
                if (data.response.arr_time !== null && data.response.arr_time !== undefined) {

                    schArr = new Date(data.response.arr_time)

                    estArr = new Date(data.response.arr_estimated)

                    let diff = (schArr - estArr) / 1000 / 60 / 60

                    // Flight is Delayed
                    if (diff < 0) {

                        diff = Math.abs(diff)

                        // Minutes Late
                        if (diff < 1) {

                            minutes = Math.round(diff * 60)

                            $calculated.text(`(${minutes} Minutes Late)`)
                            $(calculated).css('color', 'red');
                        }

                        // Hour + Minutes Late
                        else if (diff >= 1 && diff < 2) {

                            minutes = (Math.round(diff * 60))-60

                            $calculated.text(`(1 Hour ${minutes} Minutes Late)`)
                            $(calculated).css('color', 'red');
                        }

                        // Hours + Minutes Late
                        else if (diff >= 2) {

                            totalMinutes = (Math.round(diff * 60))
                            hours = Math.floor(totalMinutes/60)
                            minutes = totalMinutes % 60

                            $calculated.text(`(${hours} Hours ${minutes} Minutes Late)`)
                            $(calculated).css('color', 'red');
                        }
                    }

                    // Flight is On-Time
                    else if (diff === 0) {
                        $calculated.text(`(On-Time)`)
                        $(calculated).css('color', 'green');
                    }

                    // Flight is Early
                    else if (diff > 0) {

                        // Minutes Early
                        if (diff < 1) {

                            minutes = Math.round(diff * 60)

                            $calculated.text(`(${minutes} Minutes Early)`)
                            $(calculated).css('color', 'green');
                        }

                        // Hour + Minutes Early
                        else if (diff >= 1 && diff < 2) {

                            minutes = (Math.round(diff * 60))-60

                            $calculated.text(`(1 Hour ${minutes} Minutes Early)`)
                            $(calculated).css('color', 'green');
                        }
                    }
                }
                else {
                    $calculated.text("")
                }

                // Check if arrival date is one day later
                // calculate time b/w sch dep date and arr date
                estTimeDiff = estDepDate.getTime() - estArrDate.getTime();
                // calculate days b/w sch dep date and arr date
                estDateDiff = estTimeDiff / (1000 * 3600 * 24);
                // difference is not equal to 0, then display date difference +1
                if (estDateDiff !== 0 ) {
                    $estarr.text(`${estArrTime} (+1)`)
                }
            }
            else {
                $estarr.text("-")
            }

            // Actual
            if (data.response.dep_actual !== null && data.response.dep_actual !== undefined) {
                accDepDate = new Date(data.response.dep_actual.substring(0,10))
                accDepTime = data.response.dep_actual.substring(11,17)

                $accdpt.text(accDepTime)
            }
            else {
                $accdpt.text("-")
            }

            if (data.response.arr_actual !== null && data.response.arr_actual !== undefined) {
                accArrDate = new Date(data.response.arr_actual.substring(0,10))
                accArrTime = data.response.arr_actual.substring(11,17)

                $accarr.text(accArrTime)

                // Check if arrival date is one day later
                // calculate time b/w sch dep date and arr date
                accTimeDiff = accDepDate.getTime() - accArrDate.getTime();
                // calculate days b/w sch dep date and arr date
                accDateDiff = accTimeDiff / (1000 * 3600 * 24);
                // difference is not equal to 0, then display date difference +1
                if (accDateDiff !== 0 ) {
                    $accarr.text(`${accArrTime} (+1)`)
                }
            }
            else {
                $accarr.text("-")
            }
            
            // Aircraft Stats ------------------

            // check if aircraft stat values are null
            if (data.response.aircraft_icao !== null && data.response.aircraft_icao !== undefined) {
                $aircraft.text(`${data.response.aircraft_icao}`)
            }
            else {
                $aircraft.text("-")
            }

            if (data.response.speed !== null && data.response.speed !== undefined) {
                $speed.text(`${data.response.speed} kph`)
            }
            else {
                $speed.text("-")
            }

            if (data.response.alt !== null && data.response.alt !== undefined) {
                $altitude.text(`${data.response.alt} ft`)
            }
            else {
                $altitude.text("-")
            }

            if (data.response.dir !== null && data.response.dir !== undefined) {
                $heading.text(`${data.response.dir} deg`)
            }
            else {
                $heading.text("-")
            }

        }
    }
// -------------------------------------------------------------

})
