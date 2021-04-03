'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { getRides, getRideById, saveRide } = require('./db');
const { validateInt, validateLat, validateLong, validateName, validateVehicle } = require('./utils');

module.exports = (db) => {
    app.get('/health', (req, res) => res.send('Healthy'));

    app.post('/rides', jsonParser, async (req, res) => {
        try {
            const startLatitude = Number(req.body.start_lat);
            const startLongitude = Number(req.body.start_long);
            const endLatitude = Number(req.body.end_lat);
            const endLongitude = Number(req.body.end_long);
            const riderName = req.body.rider_name;
            const driverName = req.body.driver_name;
            const driverVehicle = req.body.driver_vehicle;

            await validateLat(startLatitude, 'Start');
            await validateLong(startLongitude, 'Start');
            await validateLat(endLatitude, 'End');
            await validateLong(endLongitude, 'End');
            await validateName(riderName, 'Rider');
            await validateName(driverName, 'Driver');
            await validateVehicle(driverVehicle);
    
            var values = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle];
            const rows = await saveRide(db, values);
            res.send(rows);

        } catch(err) {
            return res.send(err);
        }
    });

    app.get('/rides', async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            await validateInt(page, 'Page');
            const rows = await getRides(db, page);
            res.send(rows);
        } catch(err) {
            return res.send(err);
        }
    });

    app.get('/rides/:id', async (req, res) => {
        try {
            await validateInt(req.params.id, 'Ride ID');
            const rows = await getRideById(db, Number(req.params.id));
            res.send(rows);
        } catch(err) {
            return res.send(err)
        }
    })

    return app;
};