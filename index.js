import pgPromise from 'pg-promise';
import express from 'express';
import { engine } from 'express-handlebars';


import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import Routes from './routes/routes.js';

const pgp = pgPromise();

const connectionOptions = {
    connectionString: process.env.DATABASE_URL || 'postgres://gkuzsncs:iJWuNWE-_VGMguWosvyaMLXhskDYmUfz@flora.db.elephantsql.com/gkuzsncs',
    ssl: process.env.NODE_ENV === 'production', // Enable SSL in production
};

const db = pgp(connectionOptions);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption);
const routes = Routes(fuelConsumptionAPI);

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(express.static('public'));

app.use(express.json());

app.get('/', async function(req, res){
    let vehicles = await fuelConsumption.vehicles();
    res.render('allVehicles', {cars: vehicles})
})
app.get('/api/vehicles', routes.home);
app.get('/api/vehicle', routes.specificVehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

