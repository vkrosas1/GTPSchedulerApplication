import { backendApi } from "./api";
import { Tutor } from "../types";

export const tutorService = {
  getTutors: async (): Promise<Tutor[]> => {
    const response = await backendApi.get("/tutors");
    return response.data;
  },

  getTutor: async (id: number): Promise<Tutor> => {
    const response = await backendApi.get(`/tutors/${id}`);
    return response.data;
  },

  createTutor: async (
    tutor: Omit<Tutor, "id" | "availability">
  ): Promise<Tutor> => {
    const response = await backendApi.post("/tutors", tutor);
    return response.data;
  },

  updateTutor: async (id: number, tutor: Partial<Tutor>): Promise<Tutor> => {
    const response = await backendApi.patch(`/tutors/${id}`, tutor);
    return response.data;
  },

  deleteTutor: async (id: number): Promise<void> => {
    await backendApi.delete(`/tutors/${id}`);
  },
};
