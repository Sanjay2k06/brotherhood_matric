import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/student-life/houses")({
  beforeLoad: () => {
    throw redirect({ to: "/students/houses", replace: true });
  },
});
