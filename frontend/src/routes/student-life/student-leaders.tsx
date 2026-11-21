import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/student-life/student-leaders")({
  beforeLoad: () => {
    throw redirect({ to: "/students/student-leaders", replace: true });
  },
});
