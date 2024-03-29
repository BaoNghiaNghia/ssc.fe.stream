/* eslint-disable */
import React, { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Badge,
  SimpleGrid,
  Button,
  Icon,
  FormControl,
  Spinner,
  Grid,
  GridItem,
  Avatar,
  AvatarGroup,
  FormLabel,
  Select
} from "@chakra-ui/react";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useRowSelect,
  useTable,
  useExpanded,
  useFilters,
  useResizeColumns,
  useFlexLayout
} from "react-table";

// Custom components
import Card from "../../../../components/card/Card";

// Assets
import Pagination from '../../../../components/paginationCustom/Pagination';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { useSticky } from "react-table-sticky";
import styled from "styled-components";

export default function TableListThreadStream(props) {

  const textColor = useColorModeValue("secondaryGray.900", "white");

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
  const [selectedRow, setSelectedRow] = useState([]);

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
    initialState,
    toggleAllRowsExpanded,
    isAllRowsExpanded,
    getToggleAllRowsExpandedProps,
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

const Styles = styled.div`
  padding: 1rem;

  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;