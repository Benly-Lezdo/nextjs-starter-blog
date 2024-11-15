import connectMoongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";

export async function GET(req) {
  const query = req.nextUrl.searchParams.get("bp");
  console.log("query", query);
  try {
    await connectMoongo();
    const postData = await PostModel.find({});
    return Response.json(postData);
  } catch (e) {
    return Response.json({ message: e.message });
  }
}
