import connectMoongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";

export async function GET(req, { params }) {
  try {
    await connectMoongo();
    const { id } = await params;
    const postData = await PostModel.findOne({ _id: id });
    return Response.json(postData);
  } catch (e) {
    return Response.json({ message: e.message });
  }
}
