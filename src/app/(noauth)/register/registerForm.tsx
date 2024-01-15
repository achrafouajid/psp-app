"use client";
import React, { useState, useEffect, FormEvent } from "react";
import * as yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import register from "../../../../server/auth/register";
import Image from "next/image";
import logo from "public/rafiki.jpg";
import { useRouter } from "next/navigation";
import { registerResponseEnum } from "../../../../server/auth/types";
import toast from "react-hot-toast";
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const res = await register({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      });
      if (res.status == registerResponseEnum.exist)
        toast.error("Cet Email déjà utilisé ");
      else {
        router.push("/");
        toast.success("Inscription réussie !");
      }
    },
  });
  return (
    <form
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
      action=""
      onSubmit={formik.handleSubmit}
    >
      <input
        required
        type="text"
        placeholder="Nom"
        name="lastName"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
      />
      <input
        required
        type="text"
        placeholder="Prénom"
        name="firstName"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
      />
      <input
        required
        type="email"
        placeholder="Email"
        name="email"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        className="bg-transparent p-4 border border-[#0c545c#4e0eff] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
      />

      <input
        required
        type="password"
        placeholder="Mot de passe"
        name="password"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        className="bg-transparent p-4 border border-[#396EA5] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
      />

      <input
        required
        type="password"
        placeholder="Confirmer mot de passe"
        name="confirmPassword"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        className="bg-transparent p-4 border border-[#396EA5] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
      />
      <div className="text-white">
        <p>{formik.errors.confirmPassword} </p>
        <p>{formik.errors.password} </p>
      </div>
      <button
        type="submit"
        className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
      >
        S'inscrire
      </button>

      <span className="text-[#0c545c] uppercase">
        Vous avez déjà un compte ?{" "}
        <Link href="/" className="text-[#396EA5] no-underline font-bold">
          Connectez vous !
        </Link>
      </span>
    </form>
  );
}
