import mongoose, { Schema } from 'mongoose';

const cartItemSchema = new Schema(
  {
    cart: { type: Schema.Types.ObjectId, ref: 'Carts' },
  },
  { _id: false }
);

const docSchema = new Schema(
  {
    name: { type: String},
    reference: { type: String},
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    age: { type: Number },
    password: { type: String, require: true },
    resetPasswordToken: { type: String },
    cart: {
      type: [cartItemSchema],
      default: [],
    },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'premium'] },
    provider: { type: String, default: 'local' },
    documents: {
      type: [docSchema],
      default: [],
    },
    last_connection: { type: Date, default: Date.now }
  },
  { timestamps: true, versionKey: false }
);

/* userSchema
  .pre('find', function () {
    this.populate('cart.cartId');
  })
  .pre('findById', function () {
    this.populate('cart.cartId');
  }); */
export default mongoose.model('User', userSchema);
