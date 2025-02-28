"use client";

import useSession from "@/hooks/use-session";
import { auth } from "@/libs/firebase";
import { ROUTES } from "@/utils/constants";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

interface TLoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>();

  const { session } = useSession();

  const onSubmit = async (data: TLoginFormData) => {
    const res = await signInWithEmailAndPassword(data.email, data.password);

    if (res?.user) {
      const token = await res.user.getIdToken();

      Cookies.set("access_token", token, { expires: 1 });

      router.push(ROUTES.home);
    } else {
      alert("Login or password incorrect");
    }
  };

  useEffect(() => {
    if (session) {
      router.push(ROUTES.home);
    }
  }, [session, router]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-[500px]"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <h1 className="text-2xl font-semibold text-center mb-4 text-black">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="border p-2 rounded-lg text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors?.email?.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="border p-2 rounded-lg text-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors?.password?.message}</p>
          )}

          <motion.button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Do not have an account?
            <motion.button
              onClick={() => router.push(ROUTES.signup)}
              className="text-blue-500 hover:underline"
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
