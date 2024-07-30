// Interface

let Sloop = require('./index.js');
let Cars = new Sloop('Cars');

Cars.create({
    "id": 1234,
    "guid": "a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b",
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2019,
    "price": 20000
}).then(car => {
    console.log(car);
});

// all
Cars.all().then(cars => {
    console.log(cars);
});

// get by GUID
Cars.get('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b').then(car => {
    console.log(car);
});

// get by Lookup
Cars.lookup(1234).then(car => {
    console.log(car);
});

// update by GUID
Cars.update('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b', {
    "id": 1234,
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2019,
    "price": 20000
}).then(car => {
    console.log(car);
});

// update by Lookup
Cars.lookupUpdate(1234, {
    "id": 1234,
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2019,
    "price": 20000
}).then(car => {
    console.log(car);
});

// Delete by GUID
Cars.delete('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b').then(car => {
    console.log(car);
});

// Delete by Lookup
Cars.lookupDelete('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b').then(car => {
    console.log(car);
});