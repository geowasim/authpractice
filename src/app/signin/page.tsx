"use client";

import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    console.log("submit");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-8"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border rounded border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          type="submit"
          className="hover:text-black cursor-pointer p-3 rounded text-white font-medium transition bg-blue-600 hover:bg-blue-400"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Page;
