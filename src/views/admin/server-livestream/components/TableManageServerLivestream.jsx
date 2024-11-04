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
    useColorModeValue,
    Image
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
  import emptyBackgroundImage from '../../../../assets/img/empty_bg_2.png';

  export default function TableManageServerLivestream(props) {
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
  
    const handleChangePage = async (page, limit) => {
      setCurrentPage(page);
      await handleFetchResource({ page, limit });
    }
  
    const bodyWithoutData = () => {
      return (
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td colSpan={columns?.length} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={emptyBackgroundImage} alt="No Video Stream" />
            <Text>Không có dữ liệu</Text>
          </Td>
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
          typeName="servers"
          currentPage={currentPage}
          totalCount={paginationData.total}
          pageSize={paginationData.per_page}
          onPageChange={handleChangePage}
        />
      </Card>
    );
  }
  