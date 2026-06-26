import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admissions/")({
  beforeLoad: () => {
    throw redirect({ to: "/admissions/process", replace: true });
  },
});
