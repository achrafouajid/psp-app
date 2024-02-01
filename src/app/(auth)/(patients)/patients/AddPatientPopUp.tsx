"use client";
import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import { ProgramEnum } from "@prisma/client";
import { registerResponseEnum } from "../../../../../server/auth/types";
import { FiUserPlus } from "react-icons/fi";

export default function AddPatientPopUp({
  doctors,
}: {
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "01/01/1950",
      address: "",
      program: ProgramEnum.PSP,
      notes: "",
      doctor: "",
    },
    onSubmit: async (values) => {
      {
        /*   const res = await addPatientFast(values);
      if (res.status == registerResponseEnum.exist)
        toast.error("Ce patient existe déjà  !");
      else {
        toast.success("Dossier patient créé avec succès !");
        formik.resetForm();
      }*/
      }
    },
  });

  return (
    <div className="w-full mt-5">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        <FiUserPlus />
        Ajout Rapide
      </Button>
      <Modal
        isOpen={isOpen}
        placement="auto"
        onOpenChange={onOpenChange}
        className=""
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nouveau Patient
              </ModalHeader>
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                        htmlFor="lastName"
                      >
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        required
                        onChange={formik.handleChange}
                        name="lastName"
                        value={formik.values.lastName}
                        disabled={formik.isSubmitting}
                        type="text"
                        placeholder="Nom patient"
                      />
                      <p className="text-red-500 text-xs italic">
                        * Veuillez remplir ces champs.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                        htmlFor="firstName"
                      >
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        required
                        onChange={formik.handleChange}
                        name="firstName"
                        value={formik.values.firstName}
                        disabled={formik.isSubmitting}
                        type="text"
                        placeholder="Prénom Patient"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                        htmlFor="birthDate"
                      >
                        Date de naissance
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        required
                        onChange={formik.handleChange}
                        name="birthDate"
                        value={formik.values.birthDate}
                        disabled={formik.isSubmitting}
                        type="date"
                        placeholder="01/01/1920"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="address"
                    >
                      Adresse
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={formik.handleChange}
                      name="address"
                      value={formik.values.address}
                      disabled={formik.isSubmitting}
                      type="text"
                      placeholder="123 Rue A 20220"
                    />
                  </div>
                  <div className=" mb-6 ">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="program"
                    >
                      Programme
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={formik.handleChange}
                        name="program"
                        value={formik.values.program}
                        disabled={formik.isSubmitting}
                      >
                        {Object.values(ProgramEnum).map((e) => (
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

                  <div className=" mb-6">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="notes"
                    >
                      Notes
                    </label>
                    <div className="relative">
                      <textarea
                        className=" rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={formik.handleChange}
                        name="notes"
                        value={formik.values.notes}
                        disabled={formik.isSubmitting}
                      ></textarea>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="doctor"
                    >
                      Médecin
                    </label>
                    <Select
                      name="doctor"
                      value={formik.values.doctor}
                      selectedKeys={[formik.values.doctor]}
                      onChange={formik.handleChange}
                      items={doctors}
                      label="Médecin"
                      placeholder="Choisissez un médecin"
                    >
                      {(doctor) => (
                        <SelectItem value={doctor.id} key={doctor.id}>
                          {doctor.lastName.concat(" ", doctor.firstName)}
                        </SelectItem>
                      )}
                    </Select>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{ color: "#396EA5" }}
                  variant="light"
                  onPress={onClose}
                >
                  Fermer
                </Button>
                <Button
                  style={{ backgroundColor: "#396EA5", color: "white" }}
                  onPress={onClose}
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Ajouter Patient
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
