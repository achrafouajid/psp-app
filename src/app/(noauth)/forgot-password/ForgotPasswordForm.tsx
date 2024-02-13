"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import forgotPassword from "../../../../server/auth/forgotPassword";
import OtpForm from "./OtpForm";
import ChangePassword from "./ChangePassword";
import { IoIosMail } from "react-icons/io";
export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    otp: "",
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    async onSubmit() {
      try {
        await forgotPassword(formik.values.email);
        setData({ ...data, email: formik.values.email });
        toast.success(
          "Votre code de récupération à été envoyé à votre adresse mail!"
        );
        setStep(2);
      } catch (error) {}
    },
  });
  return (
    <>
      {step === 1 ? (
        <form
          className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
          onSubmit={formik.handleSubmit}
        >
          <Input
            type="text"
            label="Adresse Mail"
            name="email"
            className="border border-[#396EA5] rounded-md text-[#116272]"
            readOnly={formik.isSubmitting}
            onChange={formik.handleChange}
            min="3"
            endContent={
              <IoIosMail
                size={30}
                className="text-2xl text-[#396EA5] pointer-events-none flex-shrink-0 "
              />
            }
          />

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
          >
            {formik.isSubmitting ? "Envoi..." : "Vérifier"}
          </Button>
          <span className="uppercase">
            Vous n'avez rien reçu ?
            <Link
              href="/register"
              className="text-[#396EA5] no-underline font-bold"
            >
              Réenvoyer le code !
            </Link>
          </span>
        </form>
      ) : step === 2 ? (
        // Render the OTP form if step is 2
        <OtpForm
          email={data.email}
          onAccept={(str) => {
            setData({ ...data, otp: str });
            setStep(3);
          }}
        />
      ) : (
        // Render the success message or any other component for step 3
        <ChangePassword email={data.email} otp={data.otp} />
      )}
    </>
  );
}
