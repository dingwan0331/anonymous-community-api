const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

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

module.exports = { postSchema };
