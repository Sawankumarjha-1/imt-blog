import mongoose from "mongoose";
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      default: new Date().toLocaleDateString(),
    },
    author: {
      type: String,
      required: true,
      default: "IMT-Blog",
    },
    image: {
      type: String,
      required: true,
    },
    smallContent: {
      type: String,
      required: true,
    },
    bigContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blogs", BlogSchema);
