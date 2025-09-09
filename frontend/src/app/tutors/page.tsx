"use client";

import { useState, useEffect, SetStateAction } from "react";
import { tutorService } from "@/services/tutorService";
import { Tutor } from "@/types";
import { Plus, Mail, BookOpen } from "lucide-react";
import TutorAdditionForm from "@/components/TutorAdditionForm";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formVisibility, setFormVisibility] = useState<boolean>(false);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    try {
      setLoading(true);
      const data = await tutorService.getTutors();
      setTutors(data);
    } catch (err) {
      setError("Failed to load tutors");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tutorFormVisibility = () => {
    setFormVisibility(!formVisibility);
  };

  // getting data from tutorAdditionForm
  const [tutorInfo, setTutorInfo] =
    useState<Omit<Tutor, "id" | "tutorSubjects" | "availability">>();

  const handleTutorCreation = (
    data: Omit<Tutor, "id" | "tutorSubjects" | "availability">
  ) => {
    setTutorInfo(data);
    console.log("Data recieved from child:", data);
    tutorService.createTutor(data);
    // const data =
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tutors</h1>
        <button
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={tutorFormVisibility}
        >
          <Plus size={20} />
          <span>Add Tutor</span>
        </button>{" "}
      </div>

      {formVisibility && <TutorAdditionForm onSubmit={handleTutorCreation} />}
      {!formVisibility && tutors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tutors found. Add them! </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {tutor.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tutor.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tutor.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span>{tutor.email}</span>
                </div>

                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <BookOpen size={16} className="mt-0.5" />
                  <div>
                    <span className="font-medium">Subjects:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tutor.tutorSubjects?.map((ts) => (
                        <span
                          key={ts.subjectId}
                          className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs"
                        >
                          {ts.subject.name}
                        </span>
                      )) || <span className="text-gray-400">No subjects</span>}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Availability:</span>{" "}
                  {tutor.availability?.length || 0} time slots
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
