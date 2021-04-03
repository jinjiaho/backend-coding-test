

exports.validateInt = (num, name) => {
  return new Promise((resolve, reject) => {
    if (!Number.isInteger(num)) {
      reject({
          error_code: 'VALIDATION_ERROR',
          message: `${name} must be an integer`
      })
    }
    resolve();
  })
}

exports.validateLat = (value, startOrEnd)  => {
  return new Promise((resolve, reject) => {
      if (isNaN(value)) {
          reject({
              error_code: 'VALIDATION_ERROR',
              message: `${startOrEnd} latitude must be a number`
          });
      }
      if (value < -90 || value > 90) {
          reject({
              error_code: 'VALIDATION_ERROR',
              message: `${startOrEnd} latitude must be between -90 - 90 degrees`
          });
      }
      resolve();
  })
}

exports.validateLong = (value, startOrEnd) => {
  return new Promise((resolve, reject) => {
      if (isNaN(value)) {
          reject({
              error_code: 'VALIDATION_ERROR',
              message: `${startOrEnd} longitude must be a number`
          });
      }
      if (value < -180 || value > 180) {
          reject({
              error_code: 'VALIDATION_ERROR',
              message: `${startOrEnd} longitude must be between -180 - 180 degrees`
          });
      }
      resolve();
  })
}

exports.validateName = (string, person) => {
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

exports.validateVehicle = (string) => {
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