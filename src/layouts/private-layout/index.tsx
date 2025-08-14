import { Outlet } from "react-router-dom";
import { usePageData } from "../../hooks/use-page-data";
import { AppShell } from "@mantine/core";
import PrivateNavbar from "./navbar";

const PrivateLayout = () => {
  usePageData();
  return (
    <AppShell navbar={{ width: 160, breakpoint: "xs" }}>
      <AppShell.Navbar>
        <PrivateNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
