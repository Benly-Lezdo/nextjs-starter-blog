import mongoose from "mongoose";

const connectMoongo = async () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then((con) => {
      console.log("MongoDB connected to Host mmbu " + con.connection.host);
    })
    .catch((e) => console.log("e", e));
};

export default connectMoongo;
