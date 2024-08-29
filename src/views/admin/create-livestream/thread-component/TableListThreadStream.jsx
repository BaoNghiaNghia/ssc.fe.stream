/* eslint-disable */
import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Icon,
  Spinner
} from "@chakra-ui/react";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useRowSelect,
  useTable,
  useExpanded,
  useFlexLayout
} from "react-table";

// Custom components
import Card from "../../../../components/card/Card";

// Assets
import Pagination from '../../../../components/paginationCustom/Pagination';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { useSticky } from "react-table-sticky";

export default function TableListThreadStream(props) {
  const {
    columnsData,
    tableData,
    isLoading,
    paginationData,
    renderRowSubComponent,
    handleSelectRow,
    filterGroup,
    handleFetchResource } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const columns = useMemo(() => columnsData, []);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      getTrProps,
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // hookExpanding,
    useFlexLayout,
    useSticky
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    getTrProps,
    toggleAllRowsExpanded,
    state: { pageIndex, pageSize, selectedRowIds, expanded }
  } = tableInstance;

  useEffect(() => {
    setPageSize(paginationData.per_page);
    toggleAllRowsExpanded(true);
  }, []);

  const handleChangePage = () => async (page) => {
    setCurrentPage(page);
    await handleFetchResource({ 'page': page });
  }


  const bodyWithoutData = () => {
    return (
      <Tr>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td><Spinner size='lg' color="gray" /></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
    )
  };

  const bodyWithData = () => {
    return (
      page.map((row, i) => {
        prepareRow(row);
        return (
          <>
            <Tr 
              {...row.getRowProps()} 
              onClick={() => handleSelectRow(row)}
            >
              {row.cells.map((cell, index) => {
                return (
                  <Td {...cell.getCellProps()}
                    key={index}
                    margin="auto 0"
                    paddingTop={2}
                    paddingBottom={2}
                  >
                    {cell.render("Cell")}
                  </Td>
                );
              })}
            </Tr>
            {row.isExpanded ? (<>{renderRowSubComponent({ row })}</>) : null}
          </>
        );
      })
    )
  }

  return (
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      {filterGroup}
      <Table
        {...getTableProps()}
        color='black' mb='24px'
        className="table sticky"
      >
        <Thead className="header">
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()} borderRadius="10px" backgroundColor="gray.200">
              {headerGroup.headers.map((column) => {
                return (
                  <Th
                    key={column.id}
                    {...column.getHeaderProps()}
                  >
                    <Text {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon
                            className="ms-3"
                            icon={FaArrowDown}
                          />
                        ) : (
                          <Icon
                            className="ms-3"
                            icon={FaArrowUp}
                          />
                        )
                      ) : (
                        ""
                      )}
                    </Text>
                    <Flex>
                      {column.canFilter ? column.render("Filter") : null}
                    </Flex>
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {isLoading ? bodyWithoutData() : bodyWithData()}
        </Tbody>
      </Table>
      <Pagination
        color="blue"
        currentPage={currentPage}
        totalCount={paginationData.total}
        pageSize={paginationData.per_page}
        onPageChange={handleChangePage()}
      />
    </Card>
  );
}
