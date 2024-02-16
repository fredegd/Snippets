"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TitleLogo from "@/app/_components/TitleLogo";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const emailIsValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = user.name;
    const email = user.email;
    const password = user.password;

    if (!email || !name || !password) {
      setError("All fields are required");
      return;
    }

    if (!emailIsValid(email)) {
      setError("Email is invalid");
      return;
    }

    if (password.length < 8) {
      setError("Password is invalid");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }).then((res) => {
        console.log(res, "response from server");
        if (res.status === 400) {
          setError("This email is already registered");
        }
        if (res.status === 200 || res.status === 201) {
          setError("");
          router.push("/login");
        }
      });
    } catch (error) {
      setError("Error,please try again");
      console.log(error, "error from server response");
    } finally {
      setLoading(false);
      setUser({ name: "", email: "", password: "" });
    }
  };

  return (
    status !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-center p-10">
        <TitleLogo />
        <div className=" my-auto p-8 rounded shadow-md w-96 border border-orange-400">
          <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              value={user.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              value={user.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              value={user.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500"
            >
              {loading ? "processing..." : "Register"}
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-orange-400 hover:underline mt-2"
            href="/login"
          >
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  );
};

export default Register;
