"use client";
import Button from "@/components/Button";
import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import Image from "next/image";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { GrUserSettings } from "react-icons/gr";
import { FaRegEyeSlash } from "react-icons/fa";
import { useSession } from "@/Contexts/UserContext";
import updateUser from "../../../../server/auth/update_user";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";

const UserProfile = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { currentColor } = useStateContext();
  const [isDisabled, setisDisabled] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const data = useSession();
  const [photo, setPhoto] = useState(
    data.avatar?.url ? "/" + data.avatar?.url : undefined
  );
  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPhoto(fileUrl);
      formik.setFieldValue("image", file);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...data,
      image: null as never as File,
      birthDate: data.birthDate?.toISOString().slice(0, 10),
    },
    onSubmit: async (values) => {
      if (isDisabled) return setisDisabled(false);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email ?? "");
      formData.append("birthDate", values.birthDate?.toString() ?? "");
      formData.append("role", values.role ?? "");
      values.image && formData.append("image", values.image);
      const res = await updateUser(formData);
      if (res == false) toast.error("Erreur ! ");
      else {
        setFormSubmitted(true);
        router.refresh();
        toast.success("Informations utilisateur mises à jour !");
      }
    },
  });

  useEffect(() => {
    if (formSubmitted) {
      setisDisabled(true); // Reset isDisabled to its default value
      setFormSubmitted(false); // Reset formSubmitted state
    }
  }, [formSubmitted]);
  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <form onSubmit={formik.handleSubmit}>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <Image
                    key={photo}
                    className="object-fill w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={photo ? photo : "/noavatar.png"} // Use the photo state for the src
                    alt="Bordered avatar"
                    width={500}
                    height={500}
                  />
                  <input
                    readOnly={isDisabled}
                    type="file"
                    ref={ref}
                    hidden
                    onChange={handlePhotoChange}
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <Button
                      onClick={() => setisDisabled(!isDisabled)}
                      color="white"
                      bgColor={currentColor}
                      text="Modifier Infos"
                      icon={<GrUserSettings />}
                      borderRadius="10px"
                    />
                    {!isDisabled && (
                      <Button
                        disabled={isDisabled}
                        onClick={(e) => ref.current?.click()}
                        color="white"
                        bgColor={currentColor}
                        text="Changer Photo"
                        borderRadius="10px"
                      />
                    )}
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#396EA5]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                      >
                        Prénom
                      </label>
                      <Input
                        readOnly={isDisabled}
                        type="text"
                        label="Prénom"
                        onChange={formik.handleChange}
                        name="firstName"
                        value={formik.values.firstName}
                        disabled={formik.isSubmitting}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                      >
                        Nom
                      </label>
                      <Input
                        readOnly={isDisabled}
                        type="text"
                        defaultValue={data.lastName}
                        label="Nom"
                        onChange={formik.handleChange}
                        name="lastName"
                        value={formik.values.lastName}
                        disabled={formik.isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                    >
                      Email
                    </label>
                    <Input
                      readOnly={isDisabled}
                      type="text"
                      onChange={formik.handleChange}
                      name="email"
                      label="Email"
                      value={formik.values.email ?? ""}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="birthDate"
                      className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                    >
                      Date de naissance
                    </label>
                    <Input
                      isReadOnly={isDisabled}
                      required
                      onChange={formik.handleChange}
                      name="birthDate"
                      value={formik.values.birthDate}
                      disabled={formik.isSubmitting}
                      type="date"
                      label="Date naissance"
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                    >
                      Status
                    </label>
                    <Input
                      readOnly={isDisabled}
                      type="text"
                      label="Status"
                      onChange={formik.handleChange}
                      name="address"
                      value={formik.values.status ?? ""}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-[#396EA5] dark:text-white"
                    >
                      Mot de Passe
                    </label>
                    <div className="flex">
                      <Input
                        readOnly={isDisabled}
                        label="Mot de passe"
                        value="djklfshdsszdsq"
                        endContent={
                          <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        }
                        type="password"
                      />
                      {!isDisabled && (
                        <Link
                          href="/profile/change-password"
                          className="text-[#396EA5]"
                        >
                          <CiSettings size={50} />
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {!isDisabled && (
                      <Button
                        type="submit"
                        color="white"
                        bgColor={currentColor}
                        text="Sauvegarder"
                        borderRadius="10px"
                        disabled={formik.isSubmitting}
                        width="full"
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
