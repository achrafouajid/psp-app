"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import login from "../../../../server/auth/login";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function LoginForm() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ password, username }) => {
      setloading(true);
      try {
        const res = await axios.post("/api/login", {
          username,
          password,
        });

        if (res.data.success == false) {
          setloading(false);
          toast.error("Email ou mot de passe incorrect !");
        } else {
          router.push("/home");
          toast.success("Connexion réussie !");
        }
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
      onSubmit={formik.handleSubmit}
    >
      <input
        className="bg-transparent p-4 border border-[#396EA5] rounded-md text-[#116272] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        type="text"
        placeholder="Nom d'utilisateur"
        name="username"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        min="3"
      />
      <input
        className="bg-transparent p-4 border border-[#396EA5] rounded-md text-[#116272] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        type="password"
        readOnly={formik.isSubmitting}
        placeholder="Mot de passe"
        name="password"
        onChange={formik.handleChange}
      />
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
      >
        {formik.isSubmitting ? "Connection..." : "Se connecter"}
      </button>
      <span className="text-[#0c545c] uppercase">
        Vous n'avez pas un compte ?
        <Link
          href="/register"
          className="text-[#396EA5] no-underline font-bold"
        >
          Inscrivez vous !
        </Link>
      </span>
      <span className="text-[#0c545c] uppercase">
        mot de passe oublié ?{" "}
        <Link
          href="/forgot-password"
          className="text-[#396EA5] no-underline font-bold"
        >
          Récupérer !
        </Link>
      </span>
    </form>
  );
}
