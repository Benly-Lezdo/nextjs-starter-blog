"use client";

import {
  Box,
  Button,
  Rating,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Form } from "react-bootstrap";
import Image from "next/image";

export default function Post({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [val, setVal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_URL + "/post/" + id)
      .then((res) => res.json())
      .then((res) => {
        setVal(res);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (email.length > 3) {
      setEmailErr(false);
    }
  }, [email]);

  const handleSave = async (e) => {
    e.preventDefault()

    if (email.length < 3) {
      setEmailErr(true);
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return setEmailErr("Please Enter the Correct Email");
    }
    if (email.length > 3) {
      try {
        let data = {
          post_id: id,
          email: email,
          rating: starValue,
        };
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/rating", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const response = await res.json();

        if (res?.status == 200) {
          toast.success(response.msg);
          setEmail("");
          setStarValue(0);
        } else {
          toast.error(response.msg);
        }
      } catch (e) {
        console.log("e", e);
      }
    }
  };

  return (
    <>
      <div>
        {loading ? (
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
        ) : (
          <main className="container mx-auto px-4 py-6">
            <h2 className="text-4xl font-bold mb-4">{val?.title}</h2>
            <p className="text-gray-500">
              Published on {dayjs(val?.created_at).format("MMMM-DD-YYYY")}
            </p>
            <Image
              width={350}
              height={200}
              src={val?.image}
              alt="Post Image"
            />
            <p className={show ? "" : "shade"}>{val?.description}</p>
            <Button variant="outlined" onClick={() => setShow(!show)} endIcon={
              <>
                {show ? <MdKeyboardArrowDown /> :
                  <MdKeyboardArrowUp />}
              </>
            }
            > {show ? "Show Less " : "Show More "}</Button>
          </main>
        )}
        <Stack spacing={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Rate us
              <Rating
                name="half-rating"
                value={starValue}
                onChange={(e, v) => {
                  setStarValue(v);
                }}
              />
            </Box>
            {starValue > 0 && (
              <>
                <Form onSubmit={handleSave}>
                  <TextField
                    size="small"
                    label="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailErr}
                  />
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {emailErr}
                  </Typography>
                  <Button
                    variant="contained"
                    className="mt-2"
                  >
                    Send
                  </Button>
                </Form>
              </>
            )}
          </Box>
        </Stack>
      </div>
    </>
  );
}
