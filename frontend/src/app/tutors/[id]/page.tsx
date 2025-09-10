import EditableTutorForm from "@/components/EditableTutorForm";
import { tutorService } from "@/services/tutorService";

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  try {
    const { id } = await params;
    const tutor = await tutorService.getTutor(id);
    if (!tutor) throw new Error("Tutor not found!");
    return <EditableTutorForm currentTutor={tutor} />;
  } catch (error) {
    console.error("Failed to load tutor: ", error);
    return <div>Something went wrong while loading tutor details!</div>;
  }
}
