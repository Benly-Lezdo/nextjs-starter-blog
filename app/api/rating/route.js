import RatingModel from "@/models/ratingModal";
import connectMoongo from "@/utils/connectMongo";

export async function POST(req) {
  try {
    const { post_id, email, rating } = await req.json();
    const rat = { post_id, email, rating };

    // Connect to the database
    await connectMoongo();

    // Check if the email already exists
    const existingRating = await RatingModel.findOne({ email });
    if (existingRating) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Rating already submitted",
          email: existingRating.email,
        }),
        { status: 422 }
      );
    }

    // Create a new contact
    await RatingModel.create(rat);

    return new Response(
      JSON.stringify({
        success: true,
        msg: "Rating submitted Successfully",
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        success: false,
        error: e.message,
      }),
      { status: 500 }
    );
  }
}
