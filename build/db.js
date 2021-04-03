"use strict";
var ITEMS_PER_PAGE = require("./constants").ITEMS_PER_PAGE;
exports.getRides = function (db, page) {
    return new Promise(function (resolve, reject) {
        var after = (page - 1) * ITEMS_PER_PAGE;
        db.all("SELECT * FROM Rides ORDER BY rideID LIMIT " + ITEMS_PER_PAGE + (after ? ", " + after : ''), function (err, rows) {
            if (err) {
                return reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
            if (rows.length === 0) {
                return reject({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }
            resolve(rows);
        });
    });
};
exports.getRideById = function (db, id) {
    return new Promise(function (resolve, reject) {
        db.all("SELECT * FROM Rides WHERE rideID='" + id + "'", function (err, rows) {
            if (err) {
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
            if (rows.length === 0) {
                reject({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }
            resolve(rows);
        });
    });
};
exports.saveRide = function (db, values) {
    return new Promise(function (resolve, reject) {
        db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
            if (err) {
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
            db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                if (err) {
                    reject({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }
                resolve(rows);
            });
        });
    });
};
