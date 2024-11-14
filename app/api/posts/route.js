import connectMoongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";

export async function GET() {
  try {
    await connectMoongo();
    const postData = await PostModel.find({});
    return Response.json(postData);
  } catch (e) {
    return Response.json({ message: e.message });
  }
}
 