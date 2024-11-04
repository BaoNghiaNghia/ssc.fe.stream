/* eslint-disable */
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import Card from "../../../../components/card/Card";

export default function TableListLiveStream({ columnsData, tableData, filterHeader }) {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows } = tableInstance;

  const renderNoData = () => (
    <Tr>
      <Td colSpan={columns.length} textAlign="center">
        <Text textAlign="center">Không có dữ liệu</Text>
      </Td>
    </Tr>
  );

  return (
    <Card direction="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      {filterHeader}
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead bgColor="#f5f5f5">
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, idx) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={idx}
                  borderColor={borderColor}
                >
                  <Flex justify="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="black">
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows?.length === 0 ? renderNoData() : rows?.map((row, rowIndex) => {
            tableInstance.prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <Td {...cell.getCellProps()} key={cellIndex}>
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
