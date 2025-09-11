"use client";

import { useState } from "react";
import { tutorService } from "@/services/tutorService";
import { Tutor } from "../types";
import { CirclePlus, CircleX } from "lucide-react";
import Availability from "@/components/Availability";

type Props = {
  currentTutor: Tutor;
};

export default function EditableTutorForm({ currentTutor }: Props) {
  const [email, setEmail] = useState(currentTutor.email);
  const [status, setStatus] = useState("");

  /* will add later
  const [subjects, setSubjects] = useState<string[]>([]);
  const addSubject = () => {
    currentTutor.tutorSubjects.push()
  };
  
  const removeSubject = (subjectId: number) => {
    currentTutor.tutorSubjects = currentTutor.tutorSubjects.filter(
      (sub) => sub.subjectId == subjectId
    );
  }; */

  const handleUpdate = async () => {
    try {
      await tutorService.updateTutor(currentTutor.id, { email });
      setStatus("Updated successfully!");
    } catch (err) {
      setStatus("Update failed.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {currentTutor.name}
        </h1>
        <p>{status}</p>
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-semibold text-gray-900">
          Email
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      {/* tutor subjects */}
      <div className="flex flex-col mb-6">
        <label className="text-lg font-semibold text-gray-900">
          Tutor Subjects
          <button>
            <CirclePlus size={16} className="ml-2" />
          </button>
        </label>

        <div className="flex flex-wrap gap-1 mt-1">
          {currentTutor.tutorSubjects?.map((ts) => (
            <span
              key={ts.subjectId}
              className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs"
            >
              {ts.subjectName}
              <button>
                <CircleX
                  size={14}
                  className="min-h-0 cursor-pointer px-0 opacity-70"
                  aria-label="Close Button"
                ></CircleX>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* day availability */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="text-lg font-semibold text-gray-900 mb-4"
            htmlFor="availability"
          >
            Availability
          </label>
          <Availability />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <button
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Update Tutor
      </button>
    </div>
  );
}
