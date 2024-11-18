import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  method: 'credit_card' | 'paypal' | 'crypto';
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    method: { type: String, enum: ['credit_card', 'paypal', 'crypto'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
    transactionId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
