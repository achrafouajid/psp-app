"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "public/rafiki.jpg";
import OtpForm from "./OtpForm";
export default function ForgotPasswordForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: () => {
      toast.success("Email envoyé !");
    },
  });

  return (
    <form
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
      onSubmit={formik.handleSubmit}
    >
      <input
        className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#0c545c] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        type="text"
        placeholder="Nom d'utilisateur"
        name="username"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        min="3"
      />

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
      >
        {formik.isSubmitting ? "Envoi..." : "Vérifier"}
      </button>
      <OtpForm />
      <span className="text-[#0c545c] uppercase">
        Vous n'avez rien reçu ?
        <Link
          href="/register"
          className="text-[#396EA5] no-underline font-bold"
        >
          Réenvoyer le code !
        </Link>
      </span>
    </form>
  );
}
