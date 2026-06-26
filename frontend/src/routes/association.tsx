import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/association")({
  component: AssociationLayout,
});

function AssociationLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}
