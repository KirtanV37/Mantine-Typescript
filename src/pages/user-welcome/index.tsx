import { Paper, Title, Text, Stack, Box } from "@mantine/core";
import useAuth from "../../auth/use-auth";

const WelcomeUser = () => {
  const { user } = useAuth() as any;
  console.log("user: ", user);
  return (
    <Paper
      radius="md"
      p="xl"
      shadow="xl"
      withBorder
      style={{
        background: "linear-gradient(135deg, #f8fafc, #2a456aff)", // softer gray-blue gradient
      }}
    >
      <Stack gap="xs">
        <Box>
          <Title
            order={2}
            style={{
              background: "linear-gradient(to right, #0ea5e9, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            Welcome {user?.name}!
          </Title>
        </Box>
        <Text size="sm" c="dimmed">
          We're glad to see you again.
        </Text>
      </Stack>
    </Paper>
  );
};

export default WelcomeUser;
