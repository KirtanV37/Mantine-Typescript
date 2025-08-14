import { Box, Flex, Group, Anchor, Container } from "@mantine/core";
import { PLAIN_ROUTES } from "../../../routing/routes";
import { useMantineTheme } from "@mantine/core";
import { ANCHOR_ITEMS, APP_TITLE } from "../../../utils/constants";
import { Link } from "react-router-dom";
const PlainNavbar = () => {
  const theme = useMantineTheme();

  return (
    <Box bg={theme.colors.primary[2]} py="sm">
      <Container size="xl">
        <Flex justify="space-between" align="center">
          <Anchor
            underline="never"
            href={PLAIN_ROUTES.INDEX.url}
            c={theme.colors.light[0]}
            fw={600}
            fz="xl"
          >
            {APP_TITLE}
          </Anchor>
          <Group gap="md" visibleFrom="sm">
            {ANCHOR_ITEMS.map((item) => (
              <Anchor
                key={item.id}
                c={theme.colors.light[0]}
                component={Link}
                to={
                  item.label === "Login"
                    ? PLAIN_ROUTES.LOGIN.url
                    : item.label === "Register"
                    ? PLAIN_ROUTES.REGISTER.url
                    : item.label === "Forgot Password"
                    ? PLAIN_ROUTES.FORGOT_PASSWORD.url
                    : PLAIN_ROUTES.INDEX.url
                }
              >
                {item.label}
              </Anchor>
            ))}
          </Group>
        </Flex>
      </Container>
    </Box>
  );
};

export default PlainNavbar;

/**
| Feature       | `Box`                     | `Stack`                          | `Group`                         |
| ------------- | ------------------------- | -------------------------------- | ------------------------------- |
| Layout        | No layout, just a wrapper | Vertical layout (column)         | Horizontal layout (row)         |
| Spacing       | Not automatic             | `spacing` between elements       | `spacing` between elements      |
| Align/Justify | N/A                       | `align`, `justify` (vertical)    | `align`, `justify` (horizontal) |
| Best for      | Custom container, styling | Stacking UI blocks top-to-bottom | Buttons, tags, controls inline  |

✅ Rule of Thumb
Use Box when you just need a styled container.

Use Stack when items go top to bottom.

Use Group when items go left to right.

 */
