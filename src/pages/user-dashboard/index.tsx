// table

import UserTask from "../user-task";
import { useDisclosure } from "@mantine/hooks";
import CustomModal from "../../components/confirm-modal";
import { Box, Button } from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import { api } from "../../api";
import { apiAsyncHandler } from "../../utils/helper";
import CustomTable from "../../components/custom-table";
import { usePageData } from "../../hooks/use-page-data";

const UserDashboard = () => {
  usePageData();
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [opened, handlers] = useDisclosure(false);

  useEffect(() => {
    apiAsyncHandler(
      async () => {
        const res = await api.tasks.getAll({});
        setData(res?.data);
      },
      (error: any) => {
        setError(error);
        setData([]);
      }
    );
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "task",
        label: "Task",
        field_name: "task",
        render: ({ row }) => row.title,
      },
      {
        id: "description",
        label: "Description",
        field_name: "description",
        render: ({ row }) => row.description,
      },
      {
        id: "status",
        label: "Status",
        field_name: "status",
        render: ({ row }) => row.status,
      },
      {
        id: "dueDate",
        label: "Due Date",
        field_name: "dueDate",
        render: ({ row }) => row.dueDate,
      },
      // {
      //   id: "action",
      //   label: "Action",
      //   field_name: "action",
      //   render: ({ row }) => <Button>Edit</Button>,
      // },
    ],
    []
  );

  return (
    <Box>
      {error && <div>{error}</div>}
      <CustomModal
        onClose={() => handlers.close()}
        opened={opened}
        title="Create a Task"
        content={<UserTask />}
        onOpen={() => handlers.open()}
      />
      <CustomTable data={data} columns={columns} />
    </Box>
  );
};

export default UserDashboard;
