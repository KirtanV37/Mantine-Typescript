import { Box, Stack } from "@mantine/core";
import { ICONS } from "../../../assets/icons";
import Icon from "../../../assets/icons/icons";
import { PRIVATE_ROUTES } from "../../../routing/routes";
import CustomNavLink from "../../../components/custom-navlink";

const PrivateNavbar = () => {
  const PRIVATE_NAVITEMS = [
    {
      label: "Dashboard",
      icon: <Icon component={ICONS.IconDashboard} />,
      href: PRIVATE_ROUTES.USER_DASHBOARD.url,
    },
  ];
  return (
    <Box>
      <Stack>
        {PRIVATE_NAVITEMS.map((item) => {
          const { href, icon, label } = item;
          return <CustomNavLink {...{ href, icon, label }} />;
        })}
      </Stack>
    </Box>
  );
};

export default PrivateNavbar;
