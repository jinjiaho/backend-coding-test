'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ITEMS_PER_PAGE = require("./constants").ITEMS_PER_PAGE;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var _a = require('./db'), getRides = _a.getRides, getRideById = _a.getRideById, saveRide = _a.saveRide;
module.exports = function (db) {
    app.get('/health', function (req, res) { return res.send('Healthy'); });
    app.post('/rides', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle, values, rows, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    startLatitude = Number(req.body.start_lat);
                    startLongitude = Number(req.body.start_long);
                    endLatitude = Number(req.body.end_lat);
                    endLongitude = Number(req.body.end_long);
                    riderName = req.body.rider_name;
                    driverName = req.body.driver_name;
                    driverVehicle = req.body.driver_vehicle;
                    return [4 /*yield*/, validateLat(startLatitude, 'Start')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, validateLong(startLongitude, 'Start')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, validateLat(endLatitude, 'End')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, validateLong(endLongitude, 'End')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, validateName(riderName, 'Rider')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, validateName(driverName, 'Driver')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, validateVehicle(driverVehicle)];
                case 7:
                    _a.sent();
                    values = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle];
                    return [4 /*yield*/, saveRide(db, values)];
                case 8:
                    rows = _a.sent();
                    console.log(rows);
                    res.send(rows);
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, res.send(err_1)];
                case 10: return [2 /*return*/];
            }
        });
    }); });
    app.get('/rides', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, rows, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    page = Number(req.query.page) || 1;
                    return [4 /*yield*/, getRides(db, page)];
                case 1:
                    rows = _a.sent();
                    res.send(rows);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, res.send(err_2)];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    app.get('/rides/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var rows, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getRideById(db, Number(req.params.id))];
                case 1:
                    rows = _a.sent();
                    res.send(rows);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    return [2 /*return*/, res.send(err_3)];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    return app;
};
var validateLat = function (value, startOrEnd) {
    return new Promise(function (resolve, reject) {
        if (value < -90 || value > 90) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: startOrEnd + " latitude must be between -90 - 90 degrees"
            });
        }
        resolve();
    });
};
var validateLong = function (value, startOrEnd) {
    return new Promise(function (resolve, reject) {
        if (value < -180 || value > 180) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: startOrEnd + " longitude must be between -180 - 180 degrees"
            });
        }
        resolve();
    });
};
var validateName = function (string, person) {
    return new Promise(function (resolve, reject) {
        if (string.length < 1) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: person + " name must be a non empty string"
            });
        }
        if (!string.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: person + " name is an invalid input"
            });
        }
        resolve();
    });
};
var validateVehicle = function (string) {
    return new Promise(function (resolve, reject) {
        if (string.length < 1) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Vehicle must be a non empty string'
            });
        }
        if (!string.match(/^[a-zA-Z0-9]+$/u)) {
            reject({
                error_code: 'VALIDATION_ERROR',
                message: 'Vehicle is an invalid input'
            });
        }
        resolve();
    });
};
