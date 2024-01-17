export const routes = {
  patientRequests: (patientId: string) => `/patients/${patientId}/requests`,
  patientRequest: (patientId: string, requestId: string) =>
    routes.patientRequests(patientId) + `/${requestId}`,
};
