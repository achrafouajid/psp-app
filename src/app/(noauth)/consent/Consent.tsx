"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Consent = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#396EA5] p-8 max-w-md w-full">
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="border-b-4 border-[#3965a5]">
            <span style={{ fontSize: "20pt" }}>
              Consentement éclairé pour l'utilisation de l'application web de
              gestion de patients RAFIKI FI SIHATI :
            </span>
          </p>
          <div className="max-h-96 overflow-y-auto mt-4">
            <div>
              <p>
                <br />
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  1. Objectif de l'Application :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  En utilisant RAFIKI FI SIHATI, vous consentez à l'utilisation
                  de cette application web dans le but spécifique de gérer les
                  informations relatives aux patients, y compris mais sans s'y
                  limiter, les dossiers médicaux, les rendez-vous, les
                  prescriptions, et autres données pertinentes liées à la santé.
                </span>
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  2. Confidentialité et Sécurité :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Vous reconnaissez que les informations personnelles et
                  médicales des patients sont hautement confidentielles. RAFIKI
                  FI SIHATI s'engage à mettre en place des mesures de sécurité
                  robustes pour protéger ces données contre tout accès non
                  autorisé, perte, divulgation, ou altération.
                </span>
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  3. Accès Restreint :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Vous acceptez de ne pas partager vos informations d'accès à
                  l'application avec des tiers non autorisés. Tout accès ou
                  utilisation non autorisé est strictement interdit.
                </span>
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  4. Responsabilités de l'Utilisateur :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Vous comprenez et acceptez que vous êtes entièrement
                  responsable de l'exactitude, de la légalité et de la
                  pertinence des données que vous saisissez dans l'application.
                  RAFIKI FI SIHATI décline toute responsabilité découlant de
                  l'utilisation inappropriée ou frauduleuse de l'application.
                </span>
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  5. Mises à Jour et Modifications :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Vous consentez à recevoir des mises à jour régulières de
                  l'application pour assurer son bon fonctionnement et
                  bénéficier des dernières fonctionnalités. RAFIKI FI SIHATI se
                  réserve le droit de modifier les fonctionnalités de
                  l'application, les termes et conditions, et toute autre
                  information associée.
                </span>
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  6. Droit à la Vie Privée :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Vous consentez à ce que RAFIKI FI SIHATI collecte, stocke et
                  traite vos données conformément à sa politique de
                  confidentialité. Vous avez le droit de demander l'accès à vos
                  données personnelles et de demander des corrections si
                  nécessaire.
                </span>
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  7. Communication :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Vous consentez à recevoir des communications, notifications et
                  alertes de la part de PSP BI MSH liées à l'utilisation de
                  l'application, y compris des informations importantes sur la
                  sécurité et les mises à jour.
                </span>
              </p>
              <p>
                <br />
              </p>
              <p>
                <span style={{ color: "#666666", fontSize: "15pt" }}>
                  8. Révocation du Consentement :
                </span>
              </p>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Vous avez le droit de retirer votre consentement à tout moment
                  en désinstallant l'application et en cessant de l'utiliser.
                  Cependant, cela peut entraîner la résiliation de votre accès à
                  certaines fonctionnalités de l'application.
                </span>
              </p>
              <p>
                <br />
              </p>
              <h3></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consent;
