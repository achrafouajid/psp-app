"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "public/doctordash.png";
export default function ChangePassword() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: () => {
      toast.success("Mot de passe changé avec succès  !");
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#116272]">
      <form
        className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          formik.handleSubmit(e); // Manually trigger formik's handleSubmit
        }}
      >
        <div className="brand flex items-center gap-4 justify-center">
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
        </div>
        <input
          className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#116272] w-full text-lg focus:border-[#f17c34] focus:outline-none"
          type="password"
          placeholder="Nouveau mot de passe"
          name="password"
          readOnly={formik.isSubmitting}
          onChange={formik.handleChange}
          min="3"
        />
        <input
          className="bg-transparent p-4 border border-[#0c545c] rounded-md text-[#116272] w-full text-lg focus:border-[#f17c34] focus:outline-none"
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
          className="bg-[#0c545c] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#157891]"
        >
          {formik.isSubmitting ? "Envoi..." : "Vérifier"}
        </button>
      </form>
    </div>
  );
}
