import { model, Schema, models } from 'mongoose';

const CarSchema = new Schema({
    imageFiles:{ 
        type: [String],
    },
});

const Car = models.Car || model('Car', CarSchema);
export default Car;
