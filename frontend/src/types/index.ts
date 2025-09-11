export interface Tutor {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  tutorSubjects: TutorSubject[];
  availability: TutorAvailability[];
}

export interface TutorSubject {
  tutorId: number;
  subjectId: number;
  proficiencyLevel: number; // 0 - 2 (none, >1 year, <=1 year)
  subjectName: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
}

export interface TutorAvailability {
  id?: number;
  tutorId?: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface School {
  id: number;
  name: string;
  address: string;
  classes: SchoolClass[];
}

export interface SchoolClass {
  id: number;
  schoolId: number;
  subjectId: number;
  dayOfWeek: number;
  startTime: string;
  durationMinutes: number;
  maxStudents: number;
  school: School;
  subject: Subject;
}

export interface Assignment {
  id: number;
  tutorId: number;
  schoolClassId: number;
  assignedDate: string;
  status: AssignmentStatus;
  priorityScore: number;
  tutor: Tutor;
  schoolClass: SchoolClass;
}

export enum AssignmentStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled",
  Completed = "Completed",
}

export interface DayAvailability {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  enabled: boolean;
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "17:00"
}
