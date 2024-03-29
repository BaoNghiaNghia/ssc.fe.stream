/* eslint-disable */
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
    FormControl
  } from "@chakra-ui/react";
  
  import React, { useEffect, useMemo, useState } from "react";
  
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  
  // Custom components
  import Card from "../../../../components/card/Card";
  import Pagination from '../../../../components/paginationCustom/Pagination';
  export default function TableListLiveStream(props) {
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
    const { 
      columnsData, tableData, filterHeader
    } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
      setPageSize
    } = tableInstance;

  
    const bodyWithoutData = () => {
      return (
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td> Hiện không có dữ liệu</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      )
    };
  
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        {filterHeader}
        <Table 
          {...getTableProps()} 
          className="-striped -highlight" 
          variant='simple' color='gray.500' mb='24px'
        >
          <Thead bgColor="#f5f5f5">
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='black'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {bodyWithoutData()}
          </Tbody>
        </Table>
      </Card>
    );
  }
  