import mongoose, { Schema } from 'mongoose';

const prodItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema(
  { products: { type: [prodItemSchema], default: [] } },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Carts', cartSchema);