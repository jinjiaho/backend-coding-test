const ITEMS_PER_PAGE = require("./constants").ITEMS_PER_PAGE;

exports.getRides = (db, page) => {
  return new Promise((resolve, reject) => {
    const after = (page - 1) * ITEMS_PER_PAGE;
    const afterStr = after ? `, ${after}` : '';
    const query = db.prepare(`SELECT * FROM Rides ORDER BY rideID LIMIT ?${afterStr}`);
    query.all(ITEMS_PER_PAGE, (err, rows) => {
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
  })
}

exports.getRideById = (db, id) => {
  return new Promise((resolve, reject) => {
    const query = db.prepare("SELECT * FROM Rides WHERE rideID=?");
    query.all(id, (err, rows) => {
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
  })
}

exports.saveRide = (db, values) => {
  return new Promise((resolve, reject) => {
    const statement = db.prepare('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)');
    statement.run(values, function(err) {
      if (err) {
          reject({
              error_code: 'SERVER_ERROR',
              message: 'Unknown error'
          });
      }
      const query = db.prepare('SELECT * FROM Rides WHERE rideID = ?');
      query.all(this.lastID, (queryErr, rows) => {
          if (queryErr) {
              reject({
                  error_code: 'SERVER_ERROR',
                  message: 'Unknown error'
              });
          }

          resolve(rows);
      });
    });
  })
}