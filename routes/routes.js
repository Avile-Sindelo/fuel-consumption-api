import axios from "axios";

export default function Routes(){
    //Home
        //Make the Axios call to the API
        //render the all vehicles view and pass the vehicle data in the object
    //Home ends
    async function home(req, res){
        let vehicles;
        
        // Make a GET request
        axios.get('/api/vehicles')
            .then(function(response){
            console.log('Response:', response.data);
                vehicles = response.data;
            })
            .catch(function(error){
            console.error('Error:', error);
            });


        res.render('allVehicles', {cars: vehicles});
    }

    //Specific vehicle
        //Call the API method responsible and store the result in a variable - using Axios
        //Render the all vehicles view and pass the returned data in the object
    //Specific vehicle ends
    async function specificVehicle(req, res){
        
        let vehicle = await fuelConsumptionAPI.vehicle;
        
    }

    return {
        home,
        specificVehicle
    }
}