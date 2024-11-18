import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  name: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  genre: string;
  maxPlayers: number;
  currentPlayers: mongoose.Types.ObjectId[];
  status: 'waiting' | 'in_progress' | 'completed';
  winner: mongoose.Types.ObjectId | null;
}

const gameSchema = new Schema<IGame>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    genre: { type: String, required: true },
    maxPlayers: { type: Number, required: true },
    currentPlayers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['waiting', 'in_progress', 'completed'], default: 'waiting' },
    winner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

export const Game = mongoose.model<IGame>('Game', gameSchema);
