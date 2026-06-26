import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/student-life/")({
  beforeLoad: () => {
    throw redirect({ to: "/students/houses", replace: true });
  },
});
