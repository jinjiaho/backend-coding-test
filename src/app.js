'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { getRides, getRideById, saveRide } = require('./db');

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
            const page = req.query.page || 1;
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

const validateInt = (id, name) => {
    return new Promise((resolve, reject) => {
        if (isNaN(parseInt(id))) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: `${name} must be an integer`
            })
        }
        resolve();
    })
}

const validateLat = (value, startOrEnd)  => {
    return new Promise((resolve, reject) => {
        if (value < -90 || value > 90) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: `${startOrEnd} latitude must be between -90 - 90 degrees`
            });
        }
        resolve();
    })
}

const validateLong = (value, startOrEnd) => {
    return new Promise((resolve, reject) => {
        if (value < -180 || value > 180) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: `${startOrEnd} longitude must be between -180 - 180 degrees`
            });
        }
        resolve();
    })
}

const validateName = (string, person) => {
    return new Promise((resolve, reject) => {
        if (string.length < 1) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: `${person} name must be a non empty string`
            })
        }
        if (!string.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: `${person} name is an invalid input`
            })
        }
        resolve();
    })
}

const validateVehicle = (string) => {
    return new Promise((resolve, reject) => {
        if (string.length < 1) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Vehicle must be a non empty string'
            })
        }
        if (!string.match(/^[a-zA-Z0-9]+$/u)) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Vehicle is an invalid input'
            })
        }
        resolve();
    })
}