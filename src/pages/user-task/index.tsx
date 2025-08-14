import { useForm } from "@mantine/form";
import {
  Stack,
  Button,
  TextInput,
  Textarea,
  Center,
  NativeSelect,
} from "@mantine/core";
import { yupSyncResolver } from "../../utils/helper";
import { taskSchema } from "../../utils/validations";
import { DateInput } from "@mantine/dates";
import { taskSelection } from "../../utils/constants";
import { usePageData } from "../../hooks/use-page-data";

const UserTask = () => {
  usePageData();
  const { getInputProps, onSubmit, key } = useForm({
    initialValues: {
      title: "",
      description: "",
      status: taskSelection[0].value,
      dueDate: "",
    },
    validate: yupSyncResolver(taskSchema),
    validateInputOnChange: true,
  });

  return (
    <Center>
      <form
        onSubmit={onSubmit((values) => {
          console.log("values", values);
        })}
        style={{ width: "100%" }}
      >
        <Stack>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Enter a Title"
            {...getInputProps("title")}
            key={key("title")}
          />
          <Textarea
            withAsterisk
            label="Description"
            placeholder="Enter a Description"
            {...getInputProps("description")}
            key={key("description")}
          />
          <DateInput
            withAsterisk
            label="Due Date"
            placeholder="Enter a Due Date"
            {...getInputProps("dueDate")}
            key={key("dueDate")}
          />
          <NativeSelect
            withAsterisk
            label="Status"
            {...getInputProps("status")}
            data={taskSelection}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Center>
  );
};

export default UserTask;
