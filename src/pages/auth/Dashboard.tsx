// custom table
import { usePageData } from "../../hooks/use-page-data";
import CustomTable from "../../components/custom-table";
import { Box, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { apiAsyncHandler } from "../../utils/helper";
import { api } from "../../api";
import useAuth from "../../auth/use-auth";

const Dashboard = () => {
  usePageData();
  const { user } = useAuth() as any;
  console.log("user: ", user);

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
      id: "title",
      label: "Task",
      field_name: "title",
      render: ({ row }) => row.title, // [.title === key name given in row of data. ]
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
    {
      id: "action",
      label: "Action",
      field_name: "action",
      sortable: false,
      render: ({ row }) => (
        <Box>
          <Button
            // onClick={() => handleAccept(row.id)}
            disabled={row.status === "accepted"}
          >
            Accept
          </Button>
          <Button
            // onClick={() => handleReject(row.id)}
            disabled={row.status === "rejected"}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <CustomTable data={data} columns={columns} />
    </Box>
  );
};

export default Dashboard;
