import connectMoongo from "@/utils/connectMongo";
import PostModel from "@/models/postModel";

export async function GET(req) {
  const query = req.nextUrl.searchParams.get("search");
  console.log("query", query);
  try {
    await connectMoongo();
    let postData;
    if (query) {
      postData = await PostModel.find({
        $or: [
          { title: new RegExp(query, "i") },
          { description: new RegExp(query, "i") },
        ],
      });
    } else {
      postData = await PostModel.find({});
    }

    return Response.json(postData);
  } catch (e) {
    return Response.json({ message: e.message });
  }
}
