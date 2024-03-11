import { use } from "react";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import getAppointment from "../../../../../server/appointment/getAppointment";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import updateAppointment from "../../../../../server/appointment/update_appointment";
import { useRouter } from "next/navigation";
import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
export default function EditAppoForm({
  appointment,
  isOpen,
  onOpenChange,
  patients,
  doctors,
}: {
  appointment: NonNullable<Awaited<ReturnType<typeof getAppointment>>>;
  isOpen: boolean;
  onOpenChange: () => void;
  patients: NonNullable<Awaited<ReturnType<typeof getAllPatients>>>;
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
}) {
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
    subject: Yup.string().required("Sujet du rendez-vous requis !"),
  });
  const formik = useFormik({
    initialValues: {
      id: appointment.id,
      startTime: new Date(appointment.startTime).toISOString().substring(0, 16),
      endTime: new Date(appointment.endTime).toISOString().substring(0, 16),
      patientId: appointment.patientId,
      subject: appointment.subject,
      note: appointment.note ? appointment.note : "",
      doctorId: appointment.doctorId ? appointment.doctorId : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        startTime: new Date(values.startTime),
        endTime: new Date(values.endTime),
      };

      const res = await updateAppointment(updatedValues);
      if (res) {
        toast.success("Rendez-vous modifié avec succès!");
        router.refresh();
      } else {
        toast.error("Erreur !");
        formik.resetForm();
      }
    },
  });
  return (
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
            formik.touched.patientId && formik.errors.patientId ? true : false
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
            formik.touched.subject && formik.errors.subject ? true : false
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
          value={formik.values.startTime}
          disabled={formik.isSubmitting}
          type="datetime-local"
          label="Date de début"
          isInvalid={
            formik.touched.startTime && formik.errors.startTime ? true : false
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
            formik.touched.endTime && formik.errors.endTime ? true : false
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
            formik.touched.doctorId && formik.errors.doctorId ? true : false
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
          isInvalid={formik.touched.note && formik.errors.note ? true : false}
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
          Modifier RDV
        </Button>
      </div>
    </form>
  );
}
