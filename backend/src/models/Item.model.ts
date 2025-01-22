import mongoose, { Document, Schema } from 'mongoose';

interface IItem extends Document {
  name: string;
}

const ItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export const Item = mongoose.model<IItem>('Item', ItemSchema);
export default Item;
