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
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import Header from "@/components/Header";
import { useFormik } from "formik";
import create_category from "../../../../../server/category/create-category";
import toast from "react-hot-toast";
import { CategoryEnum } from "../../../../../server/category/types";

export default function AddCatPopUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const change = (args: any) => {
    formik.setFieldValue("color", args.currentValue.hex);
  };

  const formik = useFormik({
    initialValues: {
      color: "",
      label: "",
    },
    onSubmit: async ({ color, label }) => {
      const res = await create_category(label, color);
      if (res == CategoryEnum.Exist)
        toast.error("Cette catégorie existe déjà !");
      else toast.success("Catégorie créée avec succès !");
    },
  });
  {
    /*const change = (args: any) => {
    document.getElementById("preview")!.style.backgroundColor =
      args.currentValue.hex;
  }*/
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        Open Modal
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
                Nouvelle Catégorie
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  type="text"
                  label="Region"
                  variant="bordered"
                  placeholder="Entrez la région"
                  defaultValue="Casablanca"
                  fullWidth
                />
                <div className="text-center">
                  <div id="preview" />
                  <div className="flex justify-center items-center gap-20 flex-wrap">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="w-full max-w-sm"
                    >
                      <div className="flex items-center border-b border-teal-500 py-2">
                        <input
                          required
                          onChange={formik.handleChange}
                          name="label"
                          value={formik.values.label}
                          disabled={formik.isSubmitting}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="Catégorie"
                          aria-label="category"
                        />
                        <input
                          required
                          onChange={formik.handleChange}
                          name="color"
                          disabled={formik.isSubmitting}
                          value={formik.values.color}
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="Couleur"
                          aria-label="color"
                        />
                        <button
                          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                          type="submit"
                          disabled={formik.isSubmitting}
                        >
                          Créer
                        </button>
                      </div>
                    </form>
                    <div>
                      <p className="text-2xl font-semibold mt-2 mb-4">
                        Inline Pallete
                      </p>
                      <ColorPickerComponent
                        value={formik.values.color}
                        modeSwitcher={false}
                        disabled={formik.isSubmitting}
                        inline
                        showButtons={false}
                        change={change}
                      />
                    </div>
                  </div>
                </div>
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
                >
                  Ajouter la région
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
