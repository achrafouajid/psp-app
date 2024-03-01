"use client";
import React, { FormEvent, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { object, string, ref, InferType } from "yup";
import changePassword from "../../../../../server/auth/change_password";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const userSchema = object({
  password: string()
    .min(8, "Mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe est requis"),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "Les mots de passes doivent correspondre")
    .required("Confirmation du mot de passe est requise"),
});
export default function ChangePassword() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
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
    validationSchema: userSchema,
  });

  return (
    <form
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        formik.handleSubmit(e); // Manually trigger formik's handleSubmit
      }}
    >
      <Input
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEyeSlash
                size={30}
                className="text-2xl text-[#396EA5]  pointer-events-none"
              />
            ) : (
              <FaEye
                size={30}
                className="text-2xl text-[#396EA5]  pointer-events-none"
              />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        label="Mot de passe"
        name="password"
        className="border border-[#396EA5] rounded-xl"
        readOnly={formik.isSubmitting}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <Input
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEyeSlash
                size={30}
                className="text-2xl text-[#396EA5]  pointer-events-none"
              />
            ) : (
              <FaEye
                size={30}
                className="text-2xl text-[#396EA5]  pointer-events-none"
              />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="border border-[#396EA5] rounded-xl"
        placeholder="Confirmer mot de passe"
        name="confirmPassword"
        readOnly={formik.isSubmitting}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="text-red-600 text-xs">
        <p>
          {formik.touched.confirmPassword && formik.errors.confirmPassword}{" "}
        </p>
        <p>{formik.touched.password && formik.errors.password} </p>
      </div>
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        disabled={formik.isSubmitting}
        type="submit"
      >
        {formik.isSubmitting ? "..." : "Confirmer"}
      </Button>
    </form>
  );
}
