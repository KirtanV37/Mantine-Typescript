import { Outlet } from "react-router-dom";
import { usePageData } from "../../hooks/use-page-data";
import { AppShell } from "@mantine/core";
import PlainNavbar from "./navbar";

const PlainLayout = () => {
  usePageData();
  return (
    <AppShell header={{ height: 55 }}>
      <AppShell.Header>
        <PlainNavbar />
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default PlainLayout;
