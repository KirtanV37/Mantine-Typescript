import { NavLink } from "@mantine/core";
import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface NavLinkProps {
  label: string;
  href: string;
  icon: ReactNode;
}

const CustomNavLink = ({ label, href, icon }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  return <NavLink label={label} active={isActive} leftSection={icon} />;
};

export default CustomNavLink;
