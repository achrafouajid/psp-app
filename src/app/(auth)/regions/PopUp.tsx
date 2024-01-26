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
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { CategoryEnum } from "../../../../server/category/types";
import toast from "react-hot-toast";
import createRegion from "../../../../server/region/create_region";
import { useFormik } from "formik";

export default function PopUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async ({ name }: { name: string }) => {
      const res = await createRegion(name);
      if (res == CategoryEnum.Exist) toast.error("Cette région existe déjà !");
      else toast.success("Région créée avec succès !");
    },
  });

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        Créer Région
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
                Nouvelle Région
              </ModalHeader>
              <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
                <ModalBody>
                  <Input
                    isClearable
                    type="text"
                    label="Region"
                    variant="bordered"
                    placeholder="Entrez la région"
                    defaultValue="Casablanca"
                    fullWidth
                    required
                    onChange={formik.handleChange}
                    name="name"
                    value={formik.values.name}
                    disabled={formik.isSubmitting}
                  />
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
                  >
                    Ajouter la région
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
