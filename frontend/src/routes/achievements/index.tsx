import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/achievements/")({
  beforeLoad: () => {
    throw redirect({ to: "/students/achievements", replace: true });
  },
});
