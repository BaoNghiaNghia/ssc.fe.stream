/* eslint-disable */
// Chakra imports
import React, { useEffect, useState, useMemo } from "react";
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue,
    Avatar,
    FormControl,
    FormLabel,
    Input,
    Card,
    Table,
    Tbody,
    Thead,
    Th,
    Tr,
    Td,
    Badge
} from "@chakra-ui/react";
  
import {
      useGlobalFilter,
      usePagination,
      useSortBy,
      useTable,
} from "react-table";
import { useTranslation } from "react-i18next";
import { MdCancel, MdCheckCircle, MdClose, MdOutlineClose } from "react-icons/md";

export default function TablePayment(props) {

    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");

    const {
        columnsData,
        tableData
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
    } = tableInstance;
    initialState.pageSize = 5;

    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    let bodyWithNoData = () => {
        return (
            <Tr>
                <Td></Td>
                <Td></Td>
                <Td>
                    <Flex flexDirection="column" justify='center' width="100%" align='center' my='20px'>
                        <Text>Trống</Text>
                    </Flex>
                </Td>
                <Td></Td>
                <Td></Td>
            </Tr>
        );
    };

    let bodyWithData = () => {
        return page.map((row, index) => {
            prepareRow(row);
            return (
                <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "THỜI HẠN") {
                            data = (
                                <Flex align='center'>
                                    {
                                        cell.value ? (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value} ngày
                                            </Text>
                                        ) : '...'
                                    }
                                </Flex>
                            );
                        } else if (cell.column.Header === "TÊN GÓI") {
                            data = (
                                <Flex align='center'>
                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                    <Badge variant='subtle' borderColor="white" bgColor='green' justifyContent="center"  color="white"
                                    alignContent="center">{cell.value.toUpperCase()}</Badge>
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "SỐ LUỒNG") {
                            data = (
                                <Flex align='center'>
                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                        {cell.value} luồng
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "KHUYẾN MÃI") {
                            data = (
                                <Flex align='center'>
                                    <Text color="facebook.500" fontSize='sm' fontWeight='700'>
                                        {cell.value} %
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "TỪ NGÀY") {
                            data = (
                                <Flex align='center'>
                                    {
                                        cell.value ? (
                                            <Text fontSize='sm' color="green" fontWeight='500'>
                                                {cell.value}
                                            </Text>
                                        ) : "..."
                                    }
                                </Flex>
                            );
                        } else if (cell.column.Header === "ĐẾN NGÀY") {
                            data = (
                                <Flex align='center'>
                                    {
                                        cell.value ? (
                                            <Text fontSize='sm' color="red" fontWeight='500'>
                                                {cell.value}
                                            </Text>
                                        ) : "..."
                                    }
                                </Flex>
                            );
                        } else if (cell.column.Header === "HIỆU LỰC") {
                            data = (
                                <Flex align='center'>
                                    <Icon
                                        w='24px' h='24px' me='5px'
                                        color={
                                            cell.value === true ? "green.500"
                                            : cell.value === false ? "red.500" : null
                                        }
                                        as={
                                            cell.value === true ? MdCheckCircle
                                            : cell.value === false ? MdCancel : null
                                        }
                                    />
                                    <Text color="black" fontSize='sm' fontWeight='700'>
                                    {cell.value === true ? 'Đã xác nhận' : 'Chưa xác nhận'}
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "GIÁ BAN ĐẦU") {
                            data = (
                                <Flex align='center'>
                                    <Text color={textColor} textDecoration="line-through" fontSize='sm' fontWeight='700'>
                                        {cell.value.toLocaleString()} VNĐ
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "TỔNG CỘNG") {
                            data = (
                                <Flex align='center'>
                                    <Text color="facebook.500" fontSize='sm' fontWeight='700'>
                                        {cell.value.toLocaleString()} VNĐ
                                    </Text>
                                </Flex>
                            );
                        } else {
                            data = (
                                <Text color={textColor} fontSize='sm' fontWeight='700'>
                                  {cell.value}
                                </Text>
                            )
                        }
                        return (
                            <Td
                              {...cell.getCellProps({
                                style: {
                                  minWidth: cell.column.minWidth,
                                  width: cell.column.width,
                                },
                              })}
                              key={index}
                              fontSize={{ sm: "14px" }}
                              borderColor='transparent'>
                              {data}
                            </Td>
                          );
                    })}
                </Tr>
            );
        })
    };

    return (
        <Table {...getTableProps()} 
            border="none" w="100%" mb='24px' 
            borderRadius="10px">
            <Thead bgColor="#f5f5f5">
                {headerGroups.map((headerGroup, index) => (
                    <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                            <Th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                pe='10px'
                                key={index}
                                width="100px"
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
                {
                    (tableData.length != 0) ? bodyWithData() : bodyWithNoData()
                }
            </Tbody>
        </Table>
    );
}
