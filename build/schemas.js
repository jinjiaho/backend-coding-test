'use strict';
module.exports = function (db) {
    var createRideTableSchema = "\n        CREATE TABLE Rides\n        (\n        rideID INTEGER PRIMARY KEY AUTOINCREMENT,\n        startLat DECIMAL NOT NULL,\n        startLong DECIMAL NOT NULL,\n        endLat DECIMAL NOT NULL,\n        endLong DECIMAL NOT NULL,\n        riderName TEXT NOT NULL,\n        driverName TEXT NOT NULL,\n        driverVehicle TEXT NOT NULL,\n        created DATETIME default CURRENT_TIMESTAMP\n        )\n    ";
    db.run(createRideTableSchema);
    var populate = "\n        INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES \n            (50, 100, 60, 120, \"Jim\", \"Jam\", \"SGD1000K\"), \n            (60, 120, 70, 140, \"Tim\", \"Tam\", \"SGD1000M\"), \n            (70, 140, 80, 160, \"Mic\", \"Mac\", \"SGD1000B\");\n    ";
    db.run(populate);
    return db;
};
