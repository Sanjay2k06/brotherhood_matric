import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/academics")({
  component: AcademicsLayout,
});

function AcademicsLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}