import { Schema, model, models } from "mongoose";

const ratingSchema = new Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RatingModel = models.rating || model("rating", ratingSchema);

export default RatingModel;
