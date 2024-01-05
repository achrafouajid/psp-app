"use client";
import React, { useState, useEffect, FormEvent } from "react";
import * as yup from "yup";
import Link from "next/link";
import { ToastOptions, toast } from "react-toastify";
import { useFormik } from "formik";
import register from "../../../../server/auth/register";
import Image from "next/image";
import logo from "public/doctordash.png";
import { useRouter } from "next/navigation";
import { registerResponseEnum } from "../../../../server/auth/types";
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null as never], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function RegisterForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const res = await register({
        email: values.email,
        name: values.name,
        password: values.password,
      });
      if (res.status == registerResponseEnum.exist)
        toast.error("email deja utilisé ");
      else {
        router.push("/");
      }
    },
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#116272]">
      <form
        className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
        action=""
        onSubmit={formik.handleSubmit}
      >
        <div className="brand flex flex-col items-center gap-4">
          <Image
            alt="logo"
            width={225}
            src={logo}
            className="object-contain mb-4"
          />
          <h1 className="text-[#f17c34] uppercase text-2xl lg:text-3xl text-center">
            PSP BI MSH
          </h1>
        </div>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="name"
          readOnly={formik.isSubmitting}
          onChange={formik.handleChange}
          className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          readOnly={formik.isSubmitting}
          onChange={formik.handleChange}
          className="bg-transparent p-4 border border-[#0c545c#4e0eff] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          readOnly={formik.isSubmitting}
          onChange={formik.handleChange}
          className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        />

        <input
          type="password"
          placeholder="Confirmer mot de passe"
          name="confirmPassword"
          readOnly={formik.isSubmitting}
          onChange={formik.handleChange}
          className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        />
        <div className="text-white">
          <p>{formik.errors.confirmPassword} </p>
          <p>{formik.errors.password} </p>
        </div>
        <button
          type="submit"
          className="bg-[#0c545c] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#157891]"
        >
          S'inscrire
        </button>

        <span className="text-[#0c545c] uppercase">
          Vous avez déjà un compte ?{" "}
          <Link href="/" className="text-[#f17c34] no-underline font-bold">
            Connectez vous !
          </Link>
        </span>
      </form>
    </div>
  );
}
