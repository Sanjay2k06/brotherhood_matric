import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/about")({
  component: AboutLayout,
});

function AboutLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}