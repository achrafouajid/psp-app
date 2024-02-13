"use client";
import { useFormik } from "formik";
import React from "react";
import changePass from "../../../../server/auth/changePass";
import toast from "react-hot-toast";
import { object, string, ref, InferType } from "yup";
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
export default function ChangePassword(props: { email: string; otp: string }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    async onSubmit(values, formikHelpers) {
      let res = await changePass(props.email, props.otp, values.password);
      res == false
        ? toast.error("Erreur de changement de mot de passe")
        : toast.success("Mot de passe changé avec succès !");
    },
    validationSchema: userSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
    >
      <h1 className="text-center font-semibold text-2xl text-[#396EA5] ">
        Changer mot de passe :
      </h1>
      <Input
        required
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
        required
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
        type="submit"
        className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
      >
        {formik.isSubmitting ? "..." : "Confirmer"}
      </Button>
    </form>
  );
}
