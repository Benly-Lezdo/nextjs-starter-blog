"use client";

import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "../common/Buttons/LoadingButton";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name?.length < 3 || email?.length < 3 || message.length < 3) {
      toast.error("Please fill all the fields");
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return toast.error("Please Enter the Correct Email");
    }
    setLoading(true);
    try {
      let data = {
        name: name,
        email: email,
        message: message,
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      console.log("response", response);
      if (res.status == 200) {
        toast.success(response.msg);
        setLoading(false);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setLoading(false);
        toast.error(response.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form className="w-full max-w-lg">
          <div className="flex items-center mb-4">
            <label className="w-1/4">Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/4">Email:</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/4">Message:</label>
            <textarea
              type="text"
              placeholder="Enter Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              className="border rounded px-2 py-1 w-3/4"
              rows="4"
            />
          </div>
          <LoadingButton
            label="Submit"
            loading={loading}
            onClick={handleSubmit}
          />
        </form>
      </main>
    </>
  );
}
