import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/association/")({
  beforeLoad: () => {
    throw redirect({ to: "/association/alumni", replace: true });
  },
});
