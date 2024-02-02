"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import OtpForm from "./OtpForm";
export default function ForgotPasswordForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
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
        className="bg-transparent p-4 border border-gray-400 rounded-md text-[#396EA5] w-full text-lg focus:border-[#3965a5] focus:outline-none"
        type="text"
        placeholder="Adresse Mail"
        name="email"
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
