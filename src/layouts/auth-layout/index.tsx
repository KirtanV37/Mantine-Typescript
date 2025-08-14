import { Outlet } from "react-router-dom";
import { usePageData } from "../../hooks/use-page-data";
import { AppShell } from "@mantine/core";
import AuthNavbar from "./navbar";

const AuthLayout = () => {
  usePageData();
  return (
    <AppShell navbar={{ width: 60, breakpoint: "xs" }}>
      <AppShell.Navbar>
        <AuthNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AuthLayout;
