"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import login from "../../../../server/auth/login";
import { IoIosMail } from "react-icons/io";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function LoginForm() {
  const [loading, setloading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ password, username }) => {
      setloading(true);
      try {
        const res = await axios.post("/api/login", {
          username,
          password,
        });

        if (res.data.success == false) {
          setloading(false);
          toast.error("Email ou mot de passe incorrect !");
        } else {
          router.push("/home");
          toast.success("Connexion réussie !");
        }
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-8 bg-[#ffffff] rounded-2xl p-4 lg:p-8 w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-10rem)]"
      onSubmit={formik.handleSubmit}
    >
      <Input
        type="text"
        label="Addresse Email"
        className="border border-[#396EA5] rounded-md text-[#116272]"
        name="username"
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
      <Input
        className="border border-[#396EA5] rounded-md text-[#116272]"
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
        readOnly={formik.isSubmitting}
        label="Mot de passe"
        name="password"
        onChange={formik.handleChange}
      />
      <Button
        type="submit"
        disabled={formik.isSubmitting}
        className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5]"
      >
        {formik.isSubmitting ? "Connection..." : "Se connecter"}
      </Button>
      <span>
        Mot de passe oublié ?{" "}
        <Link
          href="/forgot-password"
          className="text-[#396EA5] no-underline font-bold uppercase"
        >
          Récupérer !
        </Link>
      </span>
      <Link
        href="/register"
        className="text-[#396EA5] no-underline font-bold uppercase"
      >
        Inscrivez-vous !
      </Link>
    </form>
  );
}
