import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  Group,
  PasswordInput,
  Checkbox,
  NativeSelect,
  NumberInput,
  Stepper,
  Box,
  Stack,
  Radio,
  Text,
} from "@mantine/core";
import { useState } from "react";

const MyForm = () => {
  const [active, setActive] = useState<number>(0);
  const { getInputProps, onSubmit } = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: null,
      gender: "male",
      skill: "vue",
      terms: false,
    },
    validate: {
      name: (value) => (value.trim() ? null : "Name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 6 ? null : "Minimum 6 characters"),
      gender: (value) => (value ? null : "Please select a gender"),
      skill: (value) => (value ? null : "Please select an option"),
      terms: (value) => (value ? null : "Accept terms"),
    },
    validateInputOnChange: true,
  });

  return (
    <Box maw={800}>
      <form
        onSubmit={onSubmit((values) => {
          console.log(values);
        })}
      >
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Step 1" description="Personal Information">
            <Stack>
              Step 1: Personal Information
              {/* Name */}
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Enter a name"
                {...getInputProps("name")}
              />
              {/* Email */}
              <TextInput
                withAsterisk
                label="Email"
                placeholder="Enter an email"
                mt="xs"
                {...getInputProps("email")}
              />
              {/* Password */}
              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Enter a password"
                mt="xs"
                {...getInputProps("password")}
              />
            </Stack>
          </Stepper.Step>
          <Stepper.Step label="Step 2" description="Additional Information">
            <Stack>
              Step 2: Additional Information
              {/* Age */}
              <NumberInput
                withAsterisk
                label="Age"
                placeholder="Enter your age"
                mt="xs"
                min={1}
                max={100}
                {...getInputProps("age")}
              />
              {/* Skill */}
              <NativeSelect
                withAsterisk
                label="Select an option"
                data={[
                  {
                    group: "Frontend libraries",
                    items: [
                      { label: "React", value: "react" },
                      { label: "Angular", value: "angular" },
                      { label: "Vue", value: "vue", disabled: !true },
                    ],
                  },
                  {
                    group: "Backend libraries",
                    items: [
                      { label: "Express", value: "express" },
                      { label: "Koa", value: "koa" },
                      { label: "Django", value: "django" },
                    ],
                  },
                ]}
                mt="xs"
                {...getInputProps("skill")}
              />
            </Stack>
          </Stepper.Step>
          <Stepper.Step label="Step 3" description="Review and Submit">
            <Stack>
              Step 3: Review and Submit
              {/* Gender */}
              <Radio.Group
                label="Select your gender"
                withAsterisk
                {...getInputProps("gender")}
              >
                <Group>
                  <Radio value="male" label="Male" />
                  <Radio value="female" label="Female" />
                  <Radio value="prefer_not_to_say" label="Prefer not to say" />
                </Group>
              </Radio.Group>
              {/* Terms and Conditions */}
              <Checkbox
                mt="xs"
                label="I accept the terms and conditions"
                {...getInputProps("terms", { type: "checkbox" })}
              />
            </Stack>
          </Stepper.Step>
          <Stepper.Completed>
            <Text>Form submitted successfully! 🎉</Text>
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="md">
          {active > 0 && (
            <Button variant="default" onClick={() => setActive((c) => c - 1)}>
              Back
            </Button>
          )}
          {active < 2 && (
            <Button onClick={() => setActive((c) => c + 1)}>Next</Button>
          )}
          {active === 2 && <Button type="submit">Submit</Button>}
        </Group>
      </form>
    </Box>
  );
};

export default MyForm;

/**
 * Group:- Hroizontal Flex
 * Stack:- Vertical Flex
 */
