import { model, Schema, models } from 'mongoose';

const CarSchema = new Schema({
  imageFiles: {
    type: [String],
  },
  carId: {
    type: Number,
    required: true, 
  },
});

const Car = models.Car || model('Car', CarSchema);
export default Car;
