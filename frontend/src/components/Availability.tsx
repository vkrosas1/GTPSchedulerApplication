import React, { useState } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Availability: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {daysOfWeek.map((day) => (
        <button
          key={day}
          onClick={() => toggleDay(day)}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ease-in-out
            ${
              selectedDays.includes(day)
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default Availability;
