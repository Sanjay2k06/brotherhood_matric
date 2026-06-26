import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/academics/")({
  beforeLoad: () => {
    throw redirect({ to: "/academics/courses-offered", replace: true });
  },
});
