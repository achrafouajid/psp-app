"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "public/rafiki.jpg";
import changePassword from "../../../../../server/auth/change_password";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const res = await changePassword(values);
      if (res == false) toast.error("Erreur ! ");
      else {
        router.back();
        toast.success("Votre mot de passe a été mis à jour !");
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        formik.handleSubmit(e); // Manually trigger formik's handleSubmit
      }}
    >
      <input
        className="bg-transparent p-4 border border-[#396EA5] rounded-md text-[#116272] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        type="password"
        placeholder="Nouveau mot de passe"
        name="password"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        min="3"
      />
      <input
        className="bg-transparent p-4 border border-[#396EA5] rounded-md text-[#116272] w-full text-lg focus:border-[#f17c34] focus:outline-none"
        type="password"
        placeholder="Confirmer mot de passe"
        name="confirmPassword"
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
    </form>
  );
}
