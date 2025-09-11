import { backendApi } from "./api";
import { Subject } from "../types";

export const subjectService = {
  getSubjects: async (): Promise<Subject[]> => {
    const response = await backendApi.get("/subjects");
    return response.data;
  },

  createSubject: async (subject: Subject): Promise<Subject> => {
    const response = await backendApi.post("/subjects", subject);
    return response.data;
  },

  updateSubject: async (
    id: number,
    subject: Partial<Subject>
  ): Promise<Subject> => {
    const response = await backendApi.put(`/subjects/${id}`, subject);
    return response.data;
  },

  deleteSubject: async (id: number): Promise<void> => {
    await backendApi.delete(`/subjects/${id}`);
  },
};
