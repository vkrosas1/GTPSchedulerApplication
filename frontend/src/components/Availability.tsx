import { DayAvailability } from "@/types";
import { useState } from "react";

const Availability = ({ onSendAvailability }: { onSendAvailability: any }) => {
  const [availability, setAvailability] = useState<DayAvailability[]>([
    {
      day: "Monday",
      dayOfWeek: 1,
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      day: "Tuesday",
      dayOfWeek: 2,
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      day: "Wednesday",
      dayOfWeek: 3,
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      day: "Thursday",
      dayOfWeek: 4,
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      day: "Friday",
      dayOfWeek: 5,
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
    },
  ]);

  const handleToggleDay = (dayToToggle: string) => {
    setAvailability((prev) =>
      prev.map((day) =>
        day.day === dayToToggle ? { ...day, enabled: !day.enabled } : day
      )
    );
  };

  const handleChangeTime = (
    dayToChange: string,
    type: "start" | "end",
    time: string
  ) => {
    setAvailability((prev) =>
      prev.map((day) =>
        day.day === dayToChange
          ? { ...day, [type === "start" ? "startTime" : "endTime"]: time }
          : day
      )
    );
    onSendAvailability(availability);
  };

  return (
    <div className="p-4">
      {availability.map((day) => (
        <div key={day.day} className="flex items-center space-x-4 mb-2">
          <input
            type="checkbox"
            checked={day.enabled}
            onChange={() => handleToggleDay(day.day)}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="w-24">{day.day}</span>
          {day.enabled && (
            <>
              <input
                type="time"
                value={day.startTime}
                onChange={(e) =>
                  handleChangeTime(day.day, "start", e.target.value)
                }
                className="border rounded p-1"
              />
              <span>-</span>
              <input
                type="time"
                value={day.endTime}
                onChange={(e) =>
                  handleChangeTime(day.day, "end", e.target.value)
                }
                className="border rounded p-1"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Availability;
