/* eslint-disable */
// Chakra imports
import React, { useMemo } from "react";
import {
    Flex,
    Icon,
    Text,
    useColorModeValue,
    Table,
    Tbody,
    Thead,
    Th,
    Tr,
    Td,
    Badge,
    Image
} from "@chakra-ui/react";
  
import {
      useGlobalFilter,
      usePagination,
      useSortBy,
      useTable,
} from "react-table";
import { MdAccessTime, MdCancel, MdCheckCircle } from "react-icons/md";

import emptyBackgroundImage from '../../../../assets/img/empty_bg_2.png';

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
                <Td colSpan={columns.length} textAlign="center" py={8}>
                    <Flex flexDirection="column" alignItems="center">
                    <Image src={emptyBackgroundImage} alt="No Video Stream" width="20%" mb={4} />
                    <Text fontSize="lg" fontWeight="bold" color="gray.600" className="pb-1">Không có dữ liệu</Text>
                    <Text fontSize="md" color="gray.500">Hãy tiến hành mua gói mới để bắt đầu.</Text>
                    </Flex>
                </Td>
            </Tr>
        );
    };

    let bodyWithData = () => {
        return page?.map((row, index) => {
            prepareRow(row);
            return (
                <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                        let data = "";
                        if (cell.column.Header === "THỜI HẠN") {
                            data = (
                                <Flex align='center'>
                                    {
                                        cell?.value ? (
                                            <Text color={textColor} fontSize='sm' fontWeight='500'>
                                                {cell?.value} ngày
                                            </Text>
                                        ) : '...'
                                    }
                                </Flex>
                            );
                        } else if (cell.column.Header === "TÊN GÓI") {
                            const badgeStyle = cell?.value === "premium" 
                                ? { background: 'linear-gradient(45deg, orange 0%, rgb(250, 82, 82) 100%)', color: 'white' } 
                                : { background: 'green', color: 'white' }; // Adjust the color for "Normal" as needed

                            data = (
                                <Flex align='center'>
                                    <Badge
                                        style={{ ...badgeStyle, fontWeight: 500, borderRadius: '6px'}}
                                        justifyContent="center"
                                        alignContent="center"
                                    >
                                        {cell?.value}
                                    </Badge>
                                </Flex>
                            );
                        } else if (cell.column.Header === "SỐ LUỒNG") {
                            data = (
                                <Flex align='center'>
                                    <Text color={textColor} fontSize='sm' fontWeight='500'>
                                        {cell?.value} luồng
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "KHUYẾN MÃI") {
                            data = (
                                <Flex align='center'>
                                    <Text color="facebook.500" fontSize='sm' fontWeight='500'>
                                        {cell?.value} %
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "TỪ NGÀY") {
                            data = (
                                <Flex align='center'>
                                    {
                                        cell?.value ? (
                                            <Text fontSize='sm' color="green" fontWeight='500' style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                                <MdAccessTime color="green" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
                                                {cell?.value}
                                            </Text>
                                        ) : "..."
                                    }
                                </Flex>
                            );
                        } else if (cell.column.Header === "ĐẾN NGÀY") {
                            data = (
                                <Flex align='center'>
                                    {
                                        cell?.value ? (
                                            <Text fontSize='sm' color="red" fontWeight='500' style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                                <MdAccessTime color="red" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
                                                {cell?.value}
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
                                            cell?.value === true ? "green.500"
                                            : cell?.value === false ? "red.500" : null
                                        }
                                        as={
                                            cell?.value === true ? MdCheckCircle
                                            : cell?.value === false ? MdCancel : null
                                        }
                                    />
                                    <Text color="black" fontSize='sm' fontWeight='500'>
                                    {cell?.value === true ? 'Đã xác nhận' : 'Chưa xác nhận'}
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "GIÁ BAN ĐẦU") {
                            data = (
                                <Flex align='center'>
                                    <Text color={textColor} textDecoration="line-through" fontSize='sm' fontWeight='500'>
                                        {cell?.value.toLocaleString()} VNĐ
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "TỔNG CỘNG") {
                            data = (
                                <Flex align='center'>
                                    <Text color="green" fontSize='sm' fontWeight='500'>
                                        {cell?.value.toLocaleString()} VNĐ
                                    </Text>
                                </Flex>
                            );
                        } else {
                            data = (
                                <Text color={textColor} fontSize='sm' fontWeight='500'>
                                  {cell?.value}
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
