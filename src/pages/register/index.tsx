import {
  TextInput,
  Button,
  PasswordInput,
  Center,
  Radio,
  Group,
  Stack,
  Box,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { registerSchema } from "../../utils/validations";
import { yupSyncResolver, apiAsyncHandler } from "../../utils/helper";
import { ROLES } from "../../utils/constants";
import { usePageData } from "../../hooks/use-page-data";
import { api } from "../../api";
import { useState } from "react";
import Icon from "../../assets/icons/icons";
import { ICONS } from "../../assets/icons";
import { AUTH_MESSAGES } from "../../utils/constants";

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  usePageData();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { getInputProps, onSubmit, key, reset } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    validate: yupSyncResolver(registerSchema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    const response = await apiAsyncHandler(
      () => api.users.create({ data: values }),
      () => setError(AUTH_MESSAGES.failure)
    );

    console.log("response: ", response);

    if (response) {
      setSuccess(AUTH_MESSAGES.successful("user"));
      reset();
    }
  };

  return (
    <Center>
      <Box>
        {success && (
          <Notification
            icon={<Icon component={ICONS.IconCheck} stroke={1} />}
            color="green"
            title={AUTH_MESSAGES.successful("user")}
            mt="md"
          >
            {success}
          </Notification>
        )}

        {error && (
          <Notification
            icon={<Icon component={ICONS.IconX} stroke={1} />}
            color="red"
            title={AUTH_MESSAGES.failure}
            mt="md"
          >
            {error}
          </Notification>
        )}
        <form onSubmit={onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Enter a name"
              {...getInputProps("name")}
              key={key("name")}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="Enter an email"
              {...getInputProps("email")}
              key={key("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Enter a password"
              {...getInputProps("password")}
              key={key("password")}
            />
            <Radio.Group
              label="Select your role"
              withAsterisk
              {...getInputProps("role")}
              key={key("role")}
            >
              <Group>
                <Radio value={ROLES.ADMIN} label="Admin" />
                <Radio value={ROLES.USER} label="User" />
              </Group>
            </Radio.Group>
            <Button type="submit">Register</Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default Register;
