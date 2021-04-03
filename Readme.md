# Backend coding test

## Setup

`git clone https://github.com/jinjiaho/backend-coding-test`
`cd backend-coding-test`
`npm install`

## Run

`npm start`

## Build

`npm run build`

## Test

`npm test`

## Lint

`npm run lint`

## API Reference

### GET /health

GET /health takes no arguments and returns status code 200 with text "Healthy".

Query params: none
Example Response: `Healthy`

### GET /rides

GET /rides takes in an optional parameter `page` and returns an array of results with length not exceeding the preset number of items per page. If `page` is undefined, default to 1.

Query params: `{ page: number }`
Example Response:

```[
    {
        "rideID": 1,
        "startLat": 50,
        "startLong": 100,
        "endLat": 60,
        "endLong": 120,
        "riderName": "Jim",
        "driverName": "Jam",
        "driverVehicle": "SGD1000K",
        "created": "2021-04-03 10:29:13"
    },
    {
        "rideID": 2,
        "startLat": 60,
        "startLong": 120,
        "endLat": 70,
        "endLong": 140,
        "riderName": "Tim",
        "driverName": "Tam",
        "driverVehicle": "SGD1000M",
        "created": "2021-04-03 10:29:13"
    }
]
```

### POST /rides

POST /rides takes in ride details and saves it in the database, returning an array containing the saved result.

Example body:

```{
    "start_lat": 40,              // -90 <= start_lat <= 90
    "start_long": 100,            // -180 <= start_long <= 180
    "end_lat": 60,                // -90 <= end_lat <= 90
    "end_long": 160,              // -180 <= end_long <= 180
    "rider_name": "Tim",          // Must be non-empty
    "driver_name": "Tam",         // Must be non-empty
    "driver_vehicle": "SGD1000K"  // Must be non-empty
}
```

Example response:

```[
    {
        "rideID": 3,
        "startLat": 40,
        "startLong": 100,
        "endLat": 60,
        "endLong": 160,
        "riderName": "Tim",
        "driverName": "Tam",
        "driverVehicle": "SGD1000K",
        "created": "2021-04-03 09:24:03"
    }
]
```

### GET /rides/:id

GET /rides/:id gets a ride by id.

Example query: `GET http://localhost:8010/rides/3`
Example response:

```[
    {
        "rideID": 3,
        "startLat": 70,
        "startLong": 140,
        "endLat": 80,
        "endLong": 160,
        "riderName": "Mic",
        "driverName": "Mac",
        "driverVehicle": "SGD1000B",
        "created": "2021-04-03 11:10:18"
    }
]
```
