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
    FormControl
  } from "@chakra-ui/react";
  
  import React, { useEffect, useMemo, useState } from "react";
  
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
    useBlockLayout
  } from "react-table";
  import { useSticky } from "react-table-sticky";
  
  // Custom components
  import Card from "../../../../components/card/Card";
  import Pagination from '../../../../components/paginationCustom/Pagination';

  export default function TableManageServerLivestream(props) {
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
    const { 
      columnsData,
      tableData,
      filterHeader,
      paginationData,
      handleFetchResource } = props;
  
    const [currentPage, setCurrentPage] = useState(1);
  
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
  
    useEffect(() => {
      setPageSize(paginationData.per_page)
    }, []);
  
    const handleChangePage = async (page) => {
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
          <Td> Hiện không có dữ liệu</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      )
    };
  
    const bodyWithData = () => {
      return (
        page.map((row, index) => {
          prepareRow(row);
          return (
            <Tr
              {...row.getRowProps()}
            >
              {row.cells.map((cell, index) => {
                return (
                  <Td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </Td>
                );
              })}
            </Tr>
          );
        })
      )
    }
  
    return (
      <Card
        direction='column'
        w='100%'
        px='0px'
        >
        {filterHeader}
        <Card
          direction='column'
          w='100%'
          px='0px'
          overflowX={{ base: "scroll"}}
        >
          <Table 
            {...getTableProps()} 
            className="-striped -highlight" 
            variant='simple' mb='24px'
            
          >
            <Thead bgColor="#f5f5f5">
              {headerGroups.map((headerGroup, index) => (
                <Tr 
                  {...headerGroup.getHeaderGroupProps()}
                  key={index}
                >
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      pe='10px'
                      key={index}
                      borderColor={borderColor}>
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: "10px", lg: "12px" }} color="black">
                        {column.render("Header")}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {data.length == 0 ? bodyWithoutData() : bodyWithData()}
            </Tbody>
          </Table>
        </Card>
        <Pagination
          color="blue"
          currentPage={currentPage}
          totalCount={paginationData.total}
          pageSize={paginationData.per_page}
          onPageChange={handleChangePage}
        />
      </Card>
    );
  }
  