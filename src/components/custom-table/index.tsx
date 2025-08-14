import { Table } from "@mantine/core";

interface TableProps {
  data?: Array<any>;
  columns?: Array<any>;
}

const CustomTable = ({ data, columns }: TableProps) => {
  return (
    <Table striped highlightOnHover withTableBorder withRowBorders={false}>
      <Table.Thead>
        <Table.Tr>
          {columns?.map((column) => (
            <Table.Th key={column?.id}>{column?.label}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.length <= 0 ? (
          <Table.Tr>
            <Table.Td colSpan={columns?.length} className="text-center py-4">
              No Items Found.
            </Table.Td>
          </Table.Tr>
        ) : (
          data?.map((a, index) => (
            <Table.Tr key={a.id} className="hover:bg-blue-50 transition-colors">
              {columns?.map((column) => (
                <Table.Td
                  key={column?.id}
                  className="px-4 py-2 border-b border-gray-100"
                >
                  {column?.render
                    ? column?.render({ row: a, rowIndex: index })
                    : a[column?.field_name]}
                </Table.Td>
              ))}
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};

export default CustomTable;
