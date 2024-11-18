import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  seller: mongoose.Types.ObjectId;
  stock: number;
  images: string[];
  rating: number;
  numReviews: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stock: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
