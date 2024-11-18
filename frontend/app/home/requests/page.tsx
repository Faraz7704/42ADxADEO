"use client";
import QuestionForm from "@/components/question-form";
import UserQuestionsTable from "@/components/request-table";

export default function ProfilePage() {
  return (
    <div>
      <UserQuestionsTable />
      <QuestionForm />
    </div>
  );
}
