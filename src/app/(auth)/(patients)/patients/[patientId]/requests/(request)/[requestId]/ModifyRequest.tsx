"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import getRequest from "../../../../../../../../../server/patient/requests/getRequest";
import { useStateContext } from "@/Contexts/ThemeContext";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import updateRequest, {
  acceptRequest,
  refuseRequest,
} from "../../../../../../../../../server/patient/requests/updateRequest";
import MyButton from "@/components/Button";
import { FaCheck, FaEdit, FaHistory } from "react-icons/fa";
import { FaDownload, FaXmark } from "react-icons/fa6";
import Dropzone from "react-dropzone";
import { CiEdit } from "react-icons/ci";
import newRequestStatus from "../../../../../../../../../server/patient/requests/newRequestStatus";
import { RequestStatusEnum } from "@prisma/client";
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

export default function ModifyRequest() {
  const { data } = useRequest();

  const router = useRouter();
  const [loading, start] = useTransition();
  const ref = useRef<HTMLInputElement>(null);
  const { currentColor } = useStateContext();
  const [isDisabled, setisDisabled] = useState(true);
  const [imgPrvs, setimgPrvs] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        toast.success("Le dossier a été mis à jour !");
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

      <div className="flex mb-5 justify-between items-center">
        {/*
        <MyButton
          color="white"
          onClick={async () => {
            const motif = window.prompt("Motif de refus ?");
            start(() =>
              newRequestStatus(
                data.id,
                RequestStatusEnum.Refuse,
                motif ?? undefined
              ).then((re) => {
                toast.error("Dossier refusé");
              })
            );
          }}
         onClick={async () => {
                const motif = window.prompt("Motif de refus ?");
                if (window.confirm("Motif de refus ?")) {
                  newRequestStatus(
                    data.id,
                    RequestStatusEnum.Refuse,
                    motif ?? undefined
                  ).then((re) => {
                    toast.error("Dossier refusé");
                  });
                }
              }} 
          bgColor="red"
          text="Refuser Dossier"
          borderRadius="10px"
          disabled={loading}
          icon={<FaXmark />}
        />
        <MyButton
          type="submit"
          color="white"
          bgColor={currentColor}
          borderRadius="10px"
          text="Accepter Dossier"
          disabled={loading}
          icon={<FaCheck />}
          onClick={() =>
            start(() =>
              newRequestStatus(data.id, RequestStatusEnum.Accepte).then(
                (re) => {
                  toast.success("Dossier accepte");
                }
              )
            )
          }
        />
        */}
      </div>
    </form>
  );
}
