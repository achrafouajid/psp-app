"use client";
import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import Image from "next/image";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import updateUserRole from "../../../../server/auth/update_user";
import getUser from "../../../../server/auth/get_user";

const UserProfile = ({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getUser>>>;
}) => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { currentColor } = useStateContext();
  const [isDisabled, setisDisabled] = useState(true);

  const formik = useFormik({
    initialValues: {
      ...data,
      image: null as never as File,
      birthDate: data.birthDate?.toISOString().slice(0, 10),
    },
    onSubmit: async (values) => {
      const res = await updateUserRole(values.id, values.role);
      if (res == false) toast.error("Erreur ! ");
      else {
        router.refresh();
        toast.success("Informations mises à jour !");
      }
    },
  });

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <form onSubmit={formik.handleSubmit}>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <Image
                    key={data.avatar?.url}
                    className="object-fill w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={
                      data.avatar?.url
                        ? "/" + data.avatar?.url
                        : "/noavatar.png"
                    }
                    alt="Bordered avatar"
                    width={500}
                    height={500}
                  />
                  <input
                    readOnly={isDisabled}
                    type="file"
                    ref={ref}
                    hidden
                    onChange={(e) =>
                      formik.setFieldValue("image", e.target.files?.item(0))
                    }
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <Button
                      onClick={(e) => ref.current?.click()}
                      color="white"
                      bgColor={currentColor}
                      text="Changer Photo"
                      borderRadius="10px"
                    />
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Prénom
                      </label>
                      <input
                        readOnly={isDisabled}
                        type="text"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your first name"
                        onChange={formik.handleChange}
                        name="firstName"
                        value={formik.values.firstName}
                        disabled={formik.isSubmitting}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Nom
                      </label>
                      <input
                        readOnly={isDisabled}
                        type="text"
                        defaultValue={data.lastName}
                        id="last_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your last name"
                        onChange={formik.handleChange}
                        name="lastName"
                        value={formik.values.lastName}
                        disabled={formik.isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      readOnly={isDisabled}
                      type="text"
                      id="profession"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      onChange={formik.handleChange}
                      name="address"
                      value={formik.values.email ?? ""}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Status
                    </label>
                    <input
                      readOnly={isDisabled}
                      type="text"
                      id="profession"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      onChange={formik.handleChange}
                      name="address"
                      value={formik.values.status ?? ""}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Rôle
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        onChange={formik.handleChange}
                        name="role"
                        value={formik.values.role}
                        disabled={formik.isSubmitting}
                      >
                        {Object.values(UserRole).map((e) => (
                          <option value={e}>{e}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      color="white"
                      bgColor={currentColor}
                      text="Sauvegarder"
                      borderRadius="10px"
                      disabled={formik.isSubmitting}
                      width="full"
                    />
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
