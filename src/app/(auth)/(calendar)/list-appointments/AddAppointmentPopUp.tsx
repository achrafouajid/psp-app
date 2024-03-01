"use client";
import React, { useState } from "react";
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
import { FiFileText } from "react-icons/fi";
import { useRouter } from "next/navigation";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import { useFormik } from "formik";
import * as Yup from "yup";
import createAppointmentForPatient from "../../../../../server/appointment/create_appointment";
import toast from "react-hot-toast";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";

export default function AddAppointmentPopUp({
  patients,
  doctors,
}: {
  patients: NonNullable<Awaited<ReturnType<typeof getAllPatients>>>;
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const validationSchema = Yup.object({
    startTime: Yup.date().required("La date et heure de début est requise"),
    endTime: Yup.date()
      .required("La date et heure de fin est requise")
      .min(
        Yup.ref("startTime"),
        "La date et heure de fin doit être postérieure à l'heure de début"
      ),
    patientId: Yup.string().required("Sélectionnez un patient"),
    subject: Yup.string().required("Subject is required"),
  });
  const formik = useFormik({
    initialValues: {
      startTime: new Date().toISOString().substring(0, 16), // Today's date and hour
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000)
        .toISOString()
        .substring(0, 16),
      patientId: "",
      doctorId: "",
      subject: "",
      note: "",
      room: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await createAppointmentForPatient(values);
      if (res) {
        toast.success("Rendez vous créé avec succès!");
        router.refresh();
      } else {
        toast.error("Erreur lors de la création du rendez-vous!");
        formik.resetForm();
      }
    },
  });

  return (
    <div className="w-full mt-5">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        <FiFileText />+ Rendez-vous
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
                Créer un rendez-vous
              </ModalHeader>
              <ModalBody>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="subject"
                    >
                      Choississez un patient:
                    </label>
                    <Select
                      isRequired
                      items={patients}
                      label="Patient"
                      placeholder="Choisissez un patient"
                      onChange={(event) =>
                        formik.setFieldValue("patientId", event.target.value)
                      }
                      selectedKeys={[formik.values.patientId]}
                      value={formik.values.patientId}
                      isInvalid={
                        formik.touched.patientId && formik.errors.patientId
                          ? true
                          : false
                      }
                    >
                      {(patient) => (
                        <SelectItem value={patient.id} key={patient.id}>
                          {patient.lastName.concat(" ", patient.firstName)}
                        </SelectItem>
                      )}
                    </Select>
                    {formik.touched.patientId && formik.errors.patientId ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.patientId}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="subject"
                    >
                      Sujet
                    </label>
                    <Input
                      isRequired
                      onChange={formik.handleChange}
                      name="subject"
                      value={formik.values.subject}
                      disabled={formik.isSubmitting}
                      type="text"
                      label="Titre"
                      isInvalid={
                        formik.touched.subject && formik.errors.subject
                          ? true
                          : false
                      }
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.subject}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="startTime"
                    >
                      Date de début
                    </label>
                    <Input
                      isRequired
                      onChange={formik.handleChange}
                      name="startTime"
                      value={formik.values.startTime || ""}
                      disabled={formik.isSubmitting}
                      type="datetime-local"
                      label="Date de début"
                      isInvalid={
                        formik.touched.startTime && formik.errors.startTime
                          ? true
                          : false
                      }
                    />
                    {formik.touched.startTime && formik.errors.startTime ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.startTime}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="endTime"
                    >
                      Date de fin
                    </label>
                    <Input
                      isRequired
                      onChange={formik.handleChange}
                      name="endTime"
                      value={formik.values.endTime || ""}
                      disabled={formik.isSubmitting}
                      type="datetime-local"
                      label="Date de fin"
                      isInvalid={
                        formik.touched.endTime && formik.errors.endTime
                          ? true
                          : false
                      }
                    />
                    {formik.touched.endTime && formik.errors.endTime ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.endTime}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="doctor"
                    >
                      Choississez médecin:
                    </label>
                    <Select
                      items={doctors}
                      label="Médecin"
                      placeholder="Choisissez un médecin"
                      onChange={(event) =>
                        formik.setFieldValue("doctorId", event.target.value)
                      }
                      selectedKeys={[formik.values.doctorId]}
                      value={formik.values.doctorId}
                      isInvalid={
                        formik.touched.doctorId && formik.errors.doctorId
                          ? true
                          : false
                      }
                    >
                      {(doctor) => (
                        <SelectItem value={doctor.id} key={doctor.id}>
                          {doctor.lastName.concat(" ", doctor.firstName)}
                        </SelectItem>
                      )}
                    </Select>
                    {formik.touched.doctorId && formik.errors.doctorId ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.doctorId}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="room"
                    >
                      Salle ou Fauteuil
                    </label>
                    <Input
                      onChange={formik.handleChange}
                      name="room"
                      value={formik.values.room}
                      disabled={formik.isSubmitting}
                      type="text"
                      label="Salle/Fauteuil"
                      isInvalid={
                        formik.touched.room && formik.errors.room ? true : false
                      }
                    />
                    {formik.touched.room && formik.errors.room ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.room}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      className="block uppercase tracking-wide text-[#396EA5] text-xs font-bold mb-2"
                      htmlFor="note"
                    >
                      Commentaire
                    </label>
                    <Input
                      onChange={formik.handleChange}
                      name="note"
                      value={formik.values.note}
                      disabled={formik.isSubmitting}
                      type="text"
                      label="Commentaire"
                      isInvalid={
                        formik.touched.note && formik.errors.note ? true : false
                      }
                    />
                    {formik.touched.note && formik.errors.note ? (
                      <div className="text-red-500 text-xs italic">
                        {formik.errors.note}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                      type="submit"
                      variant="solid"
                      className="bg-[#396EA5]"
                      disabled={formik.isSubmitting}
                    >
                      Créer RDV
                    </Button>
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
