"use client";
import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import updateRequest, {
  acceptRequest,
  refuseRequest,
} from "../../../../../../../../../server/patient/requests/updateRequest";
import { FaCheck, FaEdit, FaHistory } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import {
  Accordion,
  AccordionItem,
  Modal,
  ModalBody,
  ModalContent,
  Button,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRequest } from "@/Contexts/RequestContext";
import ViewRequest from "./ViewRequest";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { LuFileX } from "react-icons/lu";
import deleteRequest from "../../../../../../../../../server/patient/requests/deleteRequest";
import { CiTimer } from "react-icons/ci";
import { RequestStatusEnum } from "@prisma/client";

export default function ModifyRequest() {
  const { data } = useRequest();

  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { currentColor } = useStateContext();
  const [isDisabled, setisDisabled] = useState(true);
  const [imgPrvs, setimgPrvs] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteRequest = () => {
    deleteRequest(data.id)
      .then(() => {
        handleCloseDeleteModal();
        router.push("/");
        toast.success("Demande supprimée avec succès");
      })
      .catch((error) => {
        toast.error("Erreur de suppression de la demande");
      });
  };
  const formik = useFormik({
    initialValues: {
      ...data,
      createdAt: new Date(data.createdAt).toISOString().slice(0, 16),
      remark: "",
      statuses: "",
      documents: [] as File[],
    },
    onSubmit: async (values) => {
      if (isDisabled) return setisDisabled(false);
      const formdata = new FormData();
      formdata.append("id", data.id);
      formdata.append("patientId", data.patientId);
      formdata.append("createdAt", data.createdAt.toLocaleDateString() ?? "");
      formdata.append("remark", values.remark);
      values.documents.forEach((i) => formdata.append("documents", i));

      const res = await updateRequest(formdata);
      if (res == false) toast.error("Erreur ! ");
      else {
        router.refresh();
        toast.error("Erreur !");
      }

      const res2 = await acceptRequest(formdata);
      if (res2 == false) toast.error("Erreur ! ");
      else {
        router.refresh();
        toast.success("Le dossier a été accepté !");
      }

      const res3 = await refuseRequest(formdata);
      if (res3 == false) toast.error("Erreur ! ");
      else {
        router.refresh();
        toast.error("Le dossier a été refusé !");
      }
    },
  });
  useEffect(() => {
    setimgPrvs(formik.values.documents.map((i) => URL.createObjectURL(i)));

    return () => {
      imgPrvs.forEach((i) => URL.revokeObjectURL(i));
    };
  }, [formik.values.documents]);

  const currentStatus = data.statuses.find((e) => e.current);
  var completed = data.statuses.find(
    (e) => e.status == RequestStatusEnum.Complete
  );

  var created = data.statuses.find((e) => e.status == RequestStatusEnum.Cree);

  var response = data.statuses.find(
    (e) =>
      e.status == RequestStatusEnum.Accepte ||
      e.status == RequestStatusEnum.Refuse
  );

  var completedAt = new Date(completed?.createdAt ?? new Date());
  var createdAt = new Date(created?.createdAt ?? new Date());

  // Step 2: Calculate the difference in milliseconds
  var differenceInMilliseconds = completedAt.getTime() - createdAt.getTime();

  // Step 3: Convert the difference to days, hours, and minutes
  var differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  var days = Math.floor(differenceInSeconds / (60 * 60 * 24));
  var hours = Math.floor((differenceInSeconds % (60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((differenceInSeconds % (60 * 60)) / 60);

  var formattedTime = "";
  if (days > 0) {
    formattedTime += `${days} jours `;
  }
  if (hours > 0) {
    formattedTime += `${hours} heures `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes} minutes`;
  }

  // Remove the last space if it exists
  if (formattedTime.endsWith(" ")) {
    formattedTime = formattedTime.trim();
  }
  var responseAt = new Date(response?.createdAt ?? new Date());

  // Calculate the difference between responseAt and createdAt
  var responseDifferenceInMilliseconds =
    responseAt.getTime() - createdAt.getTime();

  // Convert the difference to days, hours, and minutes
  var responseDifferenceInSeconds = Math.floor(
    responseDifferenceInMilliseconds / 1000
  );
  var responseDays = Math.floor(responseDifferenceInSeconds / (60 * 60 * 24));
  var responseHours = Math.floor(
    (responseDifferenceInSeconds % (60 * 60 * 24)) / (60 * 60)
  );
  var responseMinutes = Math.floor(
    (responseDifferenceInSeconds % (60 * 60)) / 60
  );

  // Construct the formatted response time string conditionally
  var responseFormattedTime = "";
  if (responseDays > 0) {
    responseFormattedTime += `${responseDays} jours `;
  }
  if (responseHours > 0) {
    responseFormattedTime += `${responseHours} heures `;
  }
  if (responseMinutes > 0) {
    responseFormattedTime += `${responseMinutes} minutes`;
  }

  // Remove the last space if it exists
  if (responseFormattedTime.endsWith(" ")) {
    responseFormattedTime = responseFormattedTime.trim();
  }

  return (
    <form onSubmit={formik.handleSubmit} className="mt-20">
      <div className="grid max-w-2xl mx-auto">
        <div className="w-full mb-2 sm:mb-6 flex flex-row justify-between">
          <label className="text-[#396EA5] items-center text-xl font-semibold flex gap-1">
            Etat du Dossier :
          </label>

          <p> {currentStatus?.status}</p>
          <Button
            style={{ backgroundColor: "#396EA5", color: "white" }}
            onPress={onOpen}
          >
            Poursuivre Demande
          </Button>
        </div>

        <div className="flex gap-3">
          <label className="text-xl mb-2">Patient :</label>
          {data.Patient.firstName + " " + data.Patient.lastName}
        </div>

        <label className="text-[#396EA5] items-center text-xl font-semibold flex gap-1">
          <FaHistory />
          Historique
        </label>
        <Accordion>
          {data.statuses.map((status) => (
            <AccordionItem
              aria-label={status.status}
              subtitle={status.createdAt.toLocaleString("fr")}
              title={status.status}
              key={status.id}
            >
              {status.status === RequestStatusEnum.Complete && (
                <p className="text-[#396EA5] items-center text-sm font-semibold flex gap-1">
                  <CiTimer size={20} />
                  Temps de préparation de dossier:
                  {formattedTime}
                </p>
              )}
              {status.status ===
                (RequestStatusEnum.Accepte || RequestStatusEnum.Refuse) && (
                <p className="text-[#396EA5] items-center text-sm font-semibold flex gap-1">
                  <CiTimer size={20} />
                  Temps de réponse:
                  {responseFormattedTime}
                </p>
              )}
              <p className="text-[#396EA5] items-center text-sm font-semibold flex gap-1">
                {" "}
                <FaEdit size={20} />
                Remarque :
              </p>
              {status.remark}
              <p className="text-[#396EA5] items-center text-sm font-semibold flex gap-1">
                {" "}
                <IoFileTrayFullOutline size={20} />
                Documents
              </p>
              {status.documents.map((doc) => (
                <a href={`/${doc.document.url}`}>
                  <FaDownload />
                  {doc.document.id}
                </a>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
        <Modal
          isOpen={isOpen}
          placement="auto"
          onOpenChange={onOpenChange}
          className=""
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>

                <ModalBody>
                  <ViewRequest />
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
        {/* <div className="mb-6">
              <Dropzone
                onDrop={(acceptedFiles) =>
                  formik.setFieldValue("documents", acceptedFiles)
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      {...getRootProps()}
                      className="border border-dashed border-[#396EA5] relative cursor-pointer w-full h-full p-20 z-50"
                    >
                      <input {...getInputProps()} />

                      <p className="text-[#396EA5] text-center font-bold">
                        Glissez les documents supplémentaires à fournir ou
                        Cliquez ici pour sélectionner
                      </p>
                      <div className="flex flex-wrap">
                        {formik.values.documents.map((e) => e.name)}
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>*/}
      </div>
      <div className=" flex mt-5 justify-end">
        <Button
          style={{ backgroundColor: "#396EA5", color: "white" }}
          startContent={<LuFileX size={20} color="red" />}
          onClick={handleOpenDeleteModal}
        >
          Supprimer la Demande
        </Button>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        placement="auto"
        onOpenChange={handleCloseDeleteModal}
        className=""
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-base font-semibold">Supprimer la demande</h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-xl font-medium text-center mt-4">
              Êtes-vous sûr de vouloir supprimer cette demande ? Cette action
              est irréversible.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleCloseDeleteModal}
              color="secondary"
              variant="light"
            >
              Annuler
            </Button>
            <Button color="danger" onPress={handleDeleteRequest}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
}
