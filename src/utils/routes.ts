import { UserRole } from "@prisma/client";

export const routes = {
  patientRequests: (patientId: string) => `/patients/${patientId}/requests`,
  patientRequest: (patientId: string, requestId: string) =>
    routes.patientRequests(patientId) + `/${requestId}`,
};

export const links = [
  {
    href: "/home",
    activatedFor: [
      UserRole.Admin,
      UserRole.Lab,
      UserRole.Nurse,
      UserRole.Patient,
    ],
  },

  {
    href: "/users",
    activatedFor: [UserRole.Admin],
  },
  {
    href: "/regions",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },

  {
    href: "/patients",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
  {
    href: "/add-patient",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
  {
    href: "/requests",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
  {
    href: "/doctors",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
  {
    href: "/add-doctors",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },

  {
    href: "/blogs",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
  {
    href: "/list-blogs",
    activatedFor: [UserRole.Admin],
  },
  {
    href: "/add-blog",
    activatedFor: [UserRole.Admin],
  },
  {
    href: "/category",
    activatedFor: [UserRole.Admin],
  },

  {
    href: "/chat",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
  {
    href: "/calendar",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
  {
    href: "/notes",
    activatedFor: [UserRole.Admin, UserRole.Nurse],
  },
];
