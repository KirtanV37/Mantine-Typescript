import { api } from "../../api";
import { Box } from "@mantine/core";
import { usePageData } from "../../hooks/use-page-data";
import CustomTable from "../../components/custom-table";
import { apiAsyncHandler } from "../../utils/helper";
import { useState, useEffect } from "react";

const Tasks = () => {
  usePageData();
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiAsyncHandler(
      async () => {
        const res = await api.tasks.getAll({});
        console.log("res: ", res);
        setData(res?.data);
      },
      (error: any) => {
        setError(error);
        setData([]);
      }
    );
  }, []);

  const columns = [
    {
      id: "name",
      label: "Name",
      field_name: "name",
      render: ({ row }) => row.name,
    },
    {
      id: "email",
      label: "Email",
      field_name: "email",
      render: ({ row }) => row.email,
    },
    {
      id: "role",
      label: "Role",
      field_name: "role",
      render: ({ row }) => row.role,
    },
  ];

  return (
    <Box>
      {error && <div>{error}</div>}
      <CustomTable data={data} columns={columns} />
    </Box>
  );
};

export default Tasks;
