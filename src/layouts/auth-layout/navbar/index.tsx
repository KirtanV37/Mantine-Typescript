import { Box, Stack } from "@mantine/core";
import Icon from "../../../assets/icons/icons";
import { ICONS } from "../../../assets/icons";
import { AUTH_ROUTES } from "../../../routing/routes";
import CustomNavLink from "../../../components/custom-navlink";

const AuthNavbar = () => {
  const AUTH_NAVITEMS = [
    {
      label: "Tasks",
      href: AUTH_ROUTES.TASKS.url,
      icon: <Icon component={ICONS.IconListDetails} />,
    },
    {
      label: "Users",
      href: AUTH_ROUTES.DASHBOARD.url,
      icon: <Icon component={ICONS.IconUsers} />,
    },
  ];

  return (
    <Box>
      <Stack>
        {AUTH_NAVITEMS.map((item) => {
          const { href, icon, label } = item;
          return <CustomNavLink {...{ href, icon, label }} />;
        })}
      </Stack>
    </Box>
  );
};

export default AuthNavbar;
