import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

export { postSchema };
