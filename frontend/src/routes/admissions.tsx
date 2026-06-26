import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/admissions")({
  component: AdmissionsLayout,
});

function AdmissionsLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}
