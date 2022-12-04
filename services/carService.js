const Car = require("../models/Car")

async function getAll(){
  return Car.find({}).lean()
}
async function getById(id){
    return Car.findById(id).lean()
}
  async function getByUserBooking(userId){
    return (await Car.find({booking: userId}).lean())
  }

async function create(car){
    return await Car.create(car);
}
async function update(id, car){
   const existing = await Car.findById(id);

    existing.name = car.name;
    existing.brand = car.brand;
    existing.imageUrl = car.imageUrl;
    existing.year = car.year;
    existing.licens = car.licens;
    existing.description = car.description
    
   await existing.save();
}

async function deleteById(id){
    await Car.findByIdAndRemove(id)
}
// async function bookRoom(carId, userId){
//     const car = await Car.findById(carId)
//     car.bookings.push(userId);
//     await car.save();
// }

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getByUserBooking
}