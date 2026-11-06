import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Suspense fallback={<div role="status">Loading page...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
export default Layout;
