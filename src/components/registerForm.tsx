"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { object, string, ref, InferType } from "yup";
import register from "../../server/auth/register";
import { registerResponseEnum } from "../../server/auth/types";
import { Checkbox, Input } from "@nextui-org/react";

const userSchema = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  email: string().email("Email is invalid").required("Email is required"),
});

export default function RegisterForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      termsAndConditions: false,
    },
    onSubmit: async (values) => {
      const res = await register({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        termsAndConditions: values.termsAndConditions,
      });
      if (res.status == registerResponseEnum.exist)
        toast.error("Cet Email déjà utilisé ");
      else {
        router.push("/");
        toast.success("Inscription réussie !");
      }
    },
    validationSchema: userSchema,
  });
  return (
    <form
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
      action=""
      onSubmit={formik.handleSubmit}
    >
      <Input
        isRequired
        type="text"
        label="Nom"
        onBlur={formik.handleBlur}
        name="lastName"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
      />
      <Input
        isRequired
        type="text"
        label="Prénom"
        onBlur={formik.handleBlur}
        name="firstName"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
      />
      <Input
        required
        type="email"
        label="Email"
        name="email"
        readOnly={formik.isSubmitting}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <div>
        <Checkbox
          isRequired
          type="checkbox"
          id="termsAndConditions"
          name="termsAndConditions"
          checked={formik.values.termsAndConditions}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          J'ai lu le{" "}
          <Link target="_blank" href="/consent" className="text-[#396EA5]">
            Consentement éclairé
          </Link>{" "}
          et j'accepte les termes <br /> et conditions d'utilisation de Rafiki
          Fi Ilaji
        </Checkbox>
        <p>{formik.errors.termsAndConditions}</p>
      </div>

      <button
        type="submit"
        className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
      >
        Ajouter Utilisateur
      </button>
    </form>
  );
}
