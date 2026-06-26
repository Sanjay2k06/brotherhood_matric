import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageSubnav } from "@/components/PageSubnav";

export const Route = createFileRoute("/co-curricular")({
  component: CoCurricularLayout,
});

function CoCurricularLayout() {
  return (
    <>
      <PageSubnav />
      <Outlet />
    </>
  );
}
