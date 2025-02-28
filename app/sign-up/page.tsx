"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ROUTES } from "@/utils/constants";
import { auth } from "@/libs/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Cookies from "js-cookie";
import { useEffect } from "react";
import useSession from "@/hooks/use-session";
import { FirebaseError } from "firebase/app";

interface TSignUpFormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const { session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpFormData>();

  const onSubmit = async (data: TSignUpFormData) => {
    try {
      const res = await createUserWithEmailAndPassword(
        data.email,
        data.password
      );

      if (res?.user) {
        const token = await res.user.getIdToken();

        Cookies.set("access_token", token, { expires: 1 });

        router.push(ROUTES.login);
      } else {
        alert("This email is already registered. Please log in instead.");

        router.push(ROUTES.login);
      }
    } catch (e) {
      console.error(e);
      if ((e as FirebaseError).message === "EMAIL_EXISTS") {
        alert("This email is already registered. Please log in instead.");

        router.push(ROUTES.login);
      } else {
        console.error(e);
        alert("An error occurred while signing up. Please try again.");
      }
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
          Sign Up
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
            Sign Up
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <motion.button
              onClick={() => router.push(ROUTES.login)} // Redirect to login page
              className="text-blue-500 hover:underline"
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
