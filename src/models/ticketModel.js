import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema(
  {
    code: { type: String, unique: true, required: true },
    purchase_datetime: { type: Date, default: Date.now },
    purchaser: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Ticket', ticketSchema);
