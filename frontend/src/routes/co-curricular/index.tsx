import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/co-curricular/")({
  beforeLoad: () => {
    throw redirect({ to: "/co-curricular/sports", replace: true });
  },
});
