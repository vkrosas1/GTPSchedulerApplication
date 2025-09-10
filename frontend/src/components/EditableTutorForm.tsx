"use client";

import { useState } from "react";
import { tutorService } from "@/services/tutorService";
import { Tutor } from "../types";
import Availability from "@/components/Availability";

type Props = {
  currentTutor: Tutor;
};

export default function EditableTutorForm({ currentTutor }: Props) {
  const [email, setEmail] = useState(currentTutor.email);
  const [status, setStatus] = useState("");

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
      <h2>{currentTutor.name}</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleUpdate}>Update Email</button>
      <p>{status}</p>

      <h1>{currentTutor.name}</h1>
      <p>Email: {currentTutor.email}</p>
      {/* Add more tutor details here */}

      {/* day availability */}
      <h2>Tutor availability</h2>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
    </div>
  );
}
