"use client";

import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(
      process.env.NEXT_PUBLIC_API_URL +
        "/posts?search=" +
        inputRef.current.value
    )
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
      });
  };

  return (
    <>
      <div>
        <main className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </main>
        <div className="flex justify-end px-4">
          <form onSubmit={handleSearch}>
            <input
              ref={inputRef}
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Search..."
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <>
              <Skeleton sx={{ height: "250px" }} />
              <Skeleton sx={{ height: "250px" }} />
              <Skeleton sx={{ height: "250px" }} />
            </>
          ) : (
            posts?.map((item, index) => (
              <Link
                key={index}
                href={"/post/" + item?._id}
                style={{ textDecoration: "none" }}
              >
                <div className="border border-gray-200 p-2 overflow-hidden">
                  <img
                    className="w-full h-48 object-cover mb-4 zoom-image"
                    src={item?.image}
                    alt="Post Image"
                  />
                  <h2
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#000080" }}
                  >
                    {item?.title}
                  </h2>
                  <p style={{ color: "rgb(69 153 175)" }}>
                    Plublished on{" "}
                    {dayjs(item?.created_at).format("MMMM-DD-YYYY")}
                  </p>
                  <p className="text-gray-600">{item?.short_description}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
