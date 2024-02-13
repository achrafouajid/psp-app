"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { checkOTP } from "../../../../server/auth/checkOTP";
import OtpInput from "react-otp-input";
import { Button } from "@nextui-org/react";

export default function OtpForm({
  email,
  onAccept,
}: {
  email: string;
  onAccept: (str: string) => void;
}) {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    async onSubmit() {
      {
        try {
          const res = await checkOTP(email, formik.values.otp);
          if (res) {
            onAccept(formik.values.otp);
            toast.success(
              "Code correct! Vous pouvez maintenant changer votre mot de passe!"
            );
          } else {
            toast.error("Code incorrect!");
          }
        } catch (error) {}
      }
    },
  });
  return (
    <div className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>
            On a envoyé un code a votre email :<br />
          </p>
        </div>
        <p>
          Entrez le code a 4 chiffres reçu :<br />
        </p>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit} method="post">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between w-full max-w-xs gap-3">
              <OtpInput
                value={formik.values.otp}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.5rem",
                  color: "#396EA5",
                  padding: "0.5rem",
                  outline: "none",
                  border: "1px solid #0c545c",
                  borderRadius: "10%",
                }}
                containerStyle={{
                  width: "10rem",
                  height: "3rem",
                  color: "#fff",
                }}
                inputType="number"
                onChange={(e) => formik.setFieldValue("otp", e)}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <div className="flex flex-col space-y-5">
              <Button
                type="submit"
                className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
              >
                {formik.isSubmitting ? "..." : "Vérifier"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
