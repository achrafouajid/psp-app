"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { CategoryEnum } from "../../../../server/category/types";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import createCity from "../../../../server/region/create_city";
import { CiCirclePlus } from "react-icons/ci";
import { UserRole } from "@prisma/client";
import register from "../../../../server/auth/register";
import { registerResponseEnum } from "../../../../server/auth/types";
import RegisterForm from "@/components/registerForm";

export default function AddUserPopUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: UserRole.Patient,
    },
    onSubmit: async (values) => {
      /*
      const res = await register(values);
      if (res == registerResponseEnum.exist) toast.error("Cette Ville existe déjà !");
      else toast.success("Ville créée avec succès !");
*/
    },
  });

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        <CiCirclePlus size={25} /> Utilisateur
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
                Nouvel Utilisateur
              </ModalHeader>
              <ModalBody>
                <RegisterForm />
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
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  Ajouter Utilisateur
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
