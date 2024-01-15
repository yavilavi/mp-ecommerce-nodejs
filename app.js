import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path';
import { fileURLToPath } from 'url';
import { createPreference } from './controllers/mercado-pago/create-preference.controller.js';
import { handleInstantPaymentNotification } from './controllers/mercado-pago/handle-instant-payment-notification.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const port = process.env.PORT || 3000

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/payment-summary', function (req, res) {
    res.render('payment-summary', req.query);
});

app.post('/api/createPreference', createPreference);

app.post('/api/ipn', handleInstantPaymentNotification);


app.listen(port);