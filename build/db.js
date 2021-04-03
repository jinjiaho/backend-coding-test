"use strict";
var ITEMS_PER_PAGE = require("./constants").ITEMS_PER_PAGE;
exports.getRides = function (db, page) {
    return new Promise(function (resolve, reject) {
        var after = (page - 1) * ITEMS_PER_PAGE;
        var afterStr = after ? ", " + after : '';
        var query = db.prepare("SELECT * FROM Rides ORDER BY rideID LIMIT ?" + afterStr);
        query.all(ITEMS_PER_PAGE, function (err, rows) {
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
exports.getRideById = function (db, id) {
    return new Promise(function (resolve, reject) {
        var query = db.prepare("SELECT * FROM Rides WHERE rideID=?");
        query.all(id, function (err, rows) {
            if (err) {
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
            query.finalize();
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
        var statement = db.prepare('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)');
        statement.run(values, function (err) {
            if (err) {
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }
            var query = db.prepare('SELECT * FROM Rides WHERE rideID = ?');
            query.all(this.lastID, function (queryErr, rows) {
                if (queryErr) {
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
