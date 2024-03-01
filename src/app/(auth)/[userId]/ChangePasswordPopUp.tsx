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
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { object, string, ref, InferType } from "yup";
import changePasswordAdmin from "../../../../server/auth/change_password_admin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

const userSchema = object({
  password: string()
    .min(8, "Mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe est requis"),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "Les mots de passes doivent correspondre")
    .required("Confirmation du mot de passe est requise"),
});
export default function ChangePasswordPopUp({ Id }: { Id: string }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    async onSubmit(values, formikHelpers) {
      let res = await changePasswordAdmin({ Id, ...values });
      res == false
        ? toast.error("Erreur de changement de mot de passe")
        : toast.success("Mot de passe changé avec succès !");
    },
    validationSchema: userSchema,
  });
  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        isIconOnly
        onPress={onOpen}
      >
        <CiSettings size={25} />
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
                Changer le Mot de Passe
              </ModalHeader>
              <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
                <ModalBody>
                  <Input
                    isRequired
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FaEyeSlash
                            size={30}
                            className="text-2xl text-[#396EA5]  pointer-events-none"
                          />
                        ) : (
                          <FaEye
                            size={30}
                            className="text-2xl text-[#396EA5]  pointer-events-none"
                          />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    label="Mot de passe"
                    name="password"
                    className="border border-[#396EA5] rounded-xl"
                    readOnly={formik.isSubmitting}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Input
                    isRequired
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FaEyeSlash
                            size={30}
                            className="text-2xl text-[#396EA5]  pointer-events-none"
                          />
                        ) : (
                          <FaEye
                            size={30}
                            className="text-2xl text-[#396EA5]  pointer-events-none"
                          />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="border border-[#396EA5] rounded-xl"
                    placeholder="Confirmer mot de passe"
                    name="confirmPassword"
                    readOnly={formik.isSubmitting}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-red-600 text-xs">
                    <p>
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}{" "}
                    </p>
                    <p>{formik.touched.password && formik.errors.password} </p>
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
                    disabled={formik.isSubmitting}
                    type="submit"
                  >
                    {formik.isSubmitting ? "..." : "Confirmer"}
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
