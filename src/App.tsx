import { MantineProvider } from "@mantine/core";
import { theme, colorSchemeManager } from "./theme";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./auth/auth-provider";
import Routing from "./routing";

const App = () => {
  return (
    <MantineProvider
      {...{
        theme,
        colorSchemeManager,
        defaultColorScheme: "light",
      }}
    >
      <Notifications />
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </MantineProvider>
  );
};

export default App;
