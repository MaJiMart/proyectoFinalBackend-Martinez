import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: String, require: true },
    price: { type: Number, require: true },
    status: { type: String, default: 'active', enum: ['active', 'inactive'] },
    stock: { type: Number, require: true },
    category: {
      type: String,
      default: 'Others',
      enum: ['Personal-care', 'Home', 'Gifts', 'Others'],
    },
    thumbnail: { type: Array, default: [] },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
  }
  },
  { timestamps: true, versionKey: false }
);

ProductSchema
  .pre('find', function () {
    this.populate('owner.UserId');
  })
  .pre('findById', function () {
    this.populate('owner.UserId');
  });

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', ProductSchema);
