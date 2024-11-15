import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

postSchema.virtual("short_description").get(function () {
  return this.description ? this.description.substr(0, 150) + "..." : "";
});

const PostModel = models.Post || model("Post", postSchema);

export default PostModel;
