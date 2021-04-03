'use strict';

module.exports = (db) => {
    const createRideTableSchema = `
        CREATE TABLE Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `;

    db.run(createRideTableSchema);

    const populate = `
        INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES 
            (50, 100, 60, 120, "Jim", "Jam", "SGD1000K"), 
            (60, 120, 70, 140, "Tim", "Tam", "SGD1000M"), 
            (70, 140, 80, 160, "Mic", "Mac", "SGD1000B");
    `

    db.run(populate);

    return db;
};
