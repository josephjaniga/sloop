// Interface

let Sloop = require('./index.js');

let Cars = new Sloop('Cars', '00000.test.00000.safe.to.delete');

//
// // all
// Cars.all().then(cars => {
//     console.log(cars);
// });
//
// // get by GUID
// Cars.get('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b').then(car => {
//     console.log(car);
// });
//
// // get by Lookup
// Cars.lookup(1234).then(car => {
//     console.log(car);
// });
//
// // update by GUID
// Cars.update('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b', {
//     "id": 1234,
//     "brand": "Toyota",
//     "model": "Corolla",
//     "year": 2019,
//     "price": 20000
// }).then(car => {
//     console.log(car);
// });
//
// // update by Lookup
// Cars.lookupUpdate(1234, {
//     "id": 1234,
//     "brand": "Toyota",
//     "model": "Corolla",
//     "year": 2019,
//     "price": 20000
// }).then(car => {
//     console.log(car);
// });
//
// // Delete by GUID
// Cars.delete('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b').then(car => {
//     console.log(car);
// });
//
// // Delete by Lookup
// Cars.lookupDelete('a1b4b3b4-1b1b-4b1b-8b1b-1b1b1b1b1b1b').then(car => {
//     console.log(car);
// });

async function main() {

    // // GET ALL TEST
    // await Cars.all().then(cars => {
    //     cars.map(car=>console.log(car.id));
    // });

    // // CREATE ONE TEST
    // let createTest = await Cars.create({
    //     "id": 4334,
    //     "brand": "Toyotazzz",
    //     "model": "Corollazzzz",
    //     "year": 2033,
    //     "price": 20123,
    //     // "guid": "aaaaaaaa-1b1b-4b1b-8b1b-1b1b1b1b1b1b",
    // });
    //
    // let oneTest = await Cars.get(createTest.guid);
    // console.log(oneTest);

    // LOOKUP ONE TEST
    let lookupTest = await Cars.lookup(1);
    console.log(lookupTest);

}

(async () => {
    await main();
})();
