"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import forgotPassword from "../../../../server/auth/forgotPassword";
import OtpForm from "./OtpForm";
export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    async onSubmit() {
      try {
        await forgotPassword(formik.values.email);
        toast.success(
          "Votre code de récupération à été envoyé à votre adresse mail!"
        );
        setStep(2);
      } catch (error) {}
    },
  });
  {
    /*async function handleOtpVerification(otp) {
    try {
      await checkOTP(otp);
      toast.success(
        "Votre code de récupération a été vérifié avec succès!"
      );
      setStep(3); // Move to the next step upon successful OTP verification
    } catch (error) {
      // Handle errors if needed
    }
  } */
  }

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
            readOnly={formik.isSubmitting}
            onChange={formik.handleChange}
            min="3"
          />

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
          >
            {formik.isSubmitting ? "Envoi..." : "Vérifier"}
          </Button>
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
      ) : step === 2 ? (
        // Render the OTP form if step is 2
        <OtpForm />
      ) : (
        // Render the success message or any other component for step 3
        <div>
          {/* You can render a success message or any other component */}
          <p>Step 3: OTP Verification Successful!</p>
        </div>
      )}
    </>
  );
}
