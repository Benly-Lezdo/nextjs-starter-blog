"use client";

import { Box, Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { use, useEffect, useState } from "react";

export default function Post({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  console.log("id", id);

  const [val, setVal] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("loading", loading);

  useEffect(() => {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_URL + "/post/" + id)
      .then((res) => res.json())
      .then((res) => {
        setVal(res);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        {loading ?? (
          <Box>
            <Box className="container mx-auto px-4 py-6">
              <Skeleton height={50} />
              <Skeleton height={30} width={200} />
              <Skeleton height={250} width={350} />
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </Box>
          </Box>
        )}

        <main className="container mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold mb-4">{val?.title}</h2>
          <p className="text-gray-500">
            Published on {dayjs(val?.created_at).format("MMMM-DD-YYYY")}
          </p>
          <img
            width={350}
            height={200}
            src={val?.image}
            alt="Post Image"
            className=""
          />
          <p>{val?.description}</p>
        </main>
      </div>
    </>
  );
}
