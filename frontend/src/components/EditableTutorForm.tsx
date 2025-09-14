"use client";

import Availability from "@/components/Availability";
import { CirclePlus, CircleX } from "lucide-react";
import { Tutor, Subject, TutorSubject } from "../types";
import { subjectService } from "@/services/subjectService";
import { tutorService } from "@/services/tutorService";
import { useEffect, useState } from "react";

type Props = {
  currentTutor: Tutor;
};

export default function EditableTutorForm({ currentTutor }: Props) {
  /* States for sending PUT */
  const [email, setEmail] = useState(currentTutor.email);
  const [status, setStatus] = useState(currentTutor.isActive);
  const [tutorSubjects, setTutorSubjects] = useState<TutorSubject[]>(
    currentTutor.tutorSubjects || []
  );
  const [availability, setAvailability] = useState(currentTutor.availability);

  /* States for editable form capabilities*/
  const [subjectVisibility, setSubjectVisibility] = useState<boolean>(false);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);

  /* Tutor status  */
  const statusChange = () => {
    setStatus(!status);
  };

  /* Subject Options */
  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await subjectService.getSubjects();
      setAllSubjects(data);
    } catch (err) {
      console.error("Failed to load all subjects: ", err);
    }
  };

  const onRemoveSubject = (ts: TutorSubject) => {
    setTutorSubjects((prev) =>
      prev.filter((s) => s.subjectId !== ts.subjectId)
    );
  };

  const onViewSubjectsDropdown = () => {
    setSubjectVisibility(!subjectVisibility);
  };

  // Available valid subjects to choose from
  const availableOptions = allSubjects.filter(
    (sub) => !tutorSubjects.some((sel) => sel.subjectId === sub.id)
  );

  /* Availability INformation */
  const handleAvailabilityData = (data: []) => {
    setAvailability(data);
    // testing ONLY
    console.log("Received from child: ", data);
  };

  /* PUT action */
  const onHandleUpdate = async () => {
    try {
      onViewSubjectsDropdown();
      var updateFields = {
        id: currentTutor.id,
        email: email,
        isActive: status,
        tutorSubjects: tutorSubjects,
        availability: availability,
      };
      await tutorService.updateTutor(currentTutor.id, updateFields);
      //setStatus("Updated successfully!");
    } catch (err) {
      //setStatus("Update failed.");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {currentTutor.name}
        </h1>
        <button
          onClick={statusChange}
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {status ? "Active" : "Inactive"}
        </button>
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
          {!subjectVisibility && (
            <button onClick={onViewSubjectsDropdown}>
              <CirclePlus size={16} className="ml-2" />
            </button>
          )}
          {subjectVisibility && (
            <select
              className="ml-4 appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => {
                const subjectId = parseInt(e.target.value);
                const subject = allSubjects.find((s) => s.id === subjectId);
                if (subject) {
                  setTutorSubjects((prev) => [
                    ...prev,
                    {
                      tutorId: currentTutor.id,
                      subjectId: subject.id,
                      proficiencyLevel: 2, // or set a default/ask user
                      subjectName: subject.name,
                    } as TutorSubject,
                  ]);
                }
              }}
            >
              <option>Select an option </option>
              {/* Option selections below*/}
              {availableOptions.map((s: Subject) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}
        </label>

        <div className="flex flex-wrap gap-1 mt-1">
          {tutorSubjects?.map((ts) => (
            <span
              key={ts.subjectId}
              className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs"
            >
              {ts.subjectName}
              <button
                onClick={() => onRemoveSubject(ts)}
                aria-label={`Remove ${ts.subjectName}`}
              >
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
          <Availability onSendAvailability={handleAvailabilityData} />
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
        onClick={onHandleUpdate}
      >
        Update Tutor
      </button>
    </div>
  );
}
