/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react'
import {
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    useColorModeValue,
    Table,
    Link,
    Tbody,
    Td, Icon,
    Text,
    Th,
    Thead,
    Tr, Button, Image
} from '@chakra-ui/react';

import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

import { useTranslation } from 'react-i18next';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import history from '../../../../utils/history';
import VideoCardInfo from "./VideoCardInfo";
import noVideoStreamImg from '../../../../assets/img/no-video-stream.png';


const InputVideoStep = (props) => {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    let linkColor = useColorModeValue({ base: "gray.400", lg: "blue" }, "blue");
    
    const [show, setShow] = useState(false);
    
    const { t } = useTranslation();

    const { 
        columnsData,
        tableData,
        handleRemoveURLVideo,
        handleOpenModal,
        setInputValue,
        formik,
        isEdit
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

    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

    let bodyWithNoData = () => {
        return (
            <Tr>
                <Td></Td>
                <Td>
                    <Flex flexDirection="column" justify='center' width="100%" align='center' my='20px'>
                        <Image
                            src={noVideoStreamImg}
                            w={{ base: "100%", "3xl": "100%" }}
                            h={{ base: "100%", "3xl": "100%" }}
                            borderRadius='20px'
                        />
                        <Text color={textColorPrimary} textAlign='center' fontWeight='bold' fontSize='l' my='15px'>
                            {t('content.no_video_livestream')}
                        </Text>
                        <Button 
                            mt={{ base: "10px", "2xl": "auto" }}
                            variant='solid'
                            colorScheme='green'
                            size="sm"
                            onClick={handleOpenModal()}
                            fontWeight='500'>
                            <Icon
                                transition='0.2s linear'
                                w='25px'
                                h='25px'
                                pr='5px'
                                as={IoAddCircleOutline}
                                color='white'
                            />
                            Thêm Video
                        </Button>
                    </Flex>
                </Td>
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
                        if (cell.column.Header === "#") {
                            data = (
                                <Flex align='center'>
                                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                                        {cell.value}
                                    </Text>
                                </Flex>
                            );
                        } else if (cell.column.Header === "VIDEO") {
                            data = (
                                <VideoCardInfo
                                    title={cell.value.title}
                                    duration={cell.value.duration}
                                    thumbnail={cell.value.thumbnail}
                                />
                            );
                        } else if (cell.column.Header === "ACTION") {
                            data = (
                                <Button 
                                    mt={{ base: "20px", "2xl": "auto" }}
                                    variant='outline'
                                    isDisabled={isEdit || false}
                                    colorScheme='orange'
                                    onClick={handleRemoveURLVideo(cell)}
                                    fontWeight='500'>
                                    <Icon
                                        transition='0.2s linear'
                                        w='25px'
                                        h='25px'
                                        pr='5px'
                                        as={IoRemoveCircleOutline}
                                        color='orange'
                                    />
                                    Xóa
                                </Button>
                            );
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
        <>
            <Heading color={textColor} fontSize='20px' my='20px'>
                Chọn Video
            </Heading>
            <FormLabel
                display='flex'
                ms='4px'
                fontSize='md'
                fontWeight='500'
                mt='24px'>
                Tiêu đề:
            </FormLabel>
            <Input
                name="name"
                value={formik.values.name}
                onChange={(e) => setInputValue("name", e.target.value)}
                isRequired={true}
                readOnly={isEdit || false}
                variant='auth'
                fontSize='md'
                ms={{ base: "0px", md: "0px" }}
                placeholder='Nhập tiêu đề gợi nhớ cho lượt phát livestream'
                fontWeight='500'
                size="md"
            />
            {formik.errors.name && formik.touched.name && (
                <p className="text-error">{formik.errors.name}</p>
            )}
            <FormControl mt="1%">
                <Flex
                    px={{ base: "0px" }}
                    justifyContent='space-between'
                    alignItems='end'
                    w='100%'
                    fontWeight='500'
                    fontSize='md'
                    mb='8px'>
                    <FormLabel display='flex'
                        ms='4px'
                        fontSize='md'
                        fontWeight='500'
                        mt='24px'>
                        Danh sách phát:
                    </FormLabel>
                    {
                        (tableData.length === 0) || (
                            <Button 
                                mt={{ base: "20px", "2xl": "auto" }}
                                variant='brand'
                                onClick={handleOpenModal()}
                                size="sm"
                                // onClick={onOpen()}
                                isDisabled={true}
                                fontWeight='500'>
                                <Icon
                                    transition='0.2s linear'
                                    w='25px'
                                    h='25px'
                                    pr='5px'
                                    as={IoAddCircleOutline}
                                    color='white'
                                />
                                Thêm Video
                            </Button>
                        )
                    }
                </Flex>
                <Table {...getTableProps()} variant='striped' mb='24px' border="1px" borderColor="gray.300" borderRadius="10px">
                    <Thead bgColor="#f5f5f5">
                        {headerGroups.map((headerGroup, index) => (
                            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, index) => (
                                    <Th
                                        {...column.getHeaderProps({...column.getSortByToggleProps(),
                                            style: { minWidth: column.minWidth, width: column.width }
                                        })}
                                        pe='10px'
                                        key={index}
                                        width="100px"
                                        borderColor={borderColor}>
                                        <Flex
                                            justify='space-between'
                                            align='center'
                                            fontSize={{ sm: "10px", lg: "12px" }}
                                            color='gray.400'>
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
                {formik.errors.url && formik.touched.url && (
                    <p className="text-error">{formik.errors.url}</p>
                )}
                <FormHelperText>Khách hàng chịu trách nhiệm về nội dung được phát trong livestream theo
                    <Link
                        fontWeight='500'
                        color={linkColor}
                        href={`#/general/policy`}>
                        {' '}Chính sách & Quy định của MKStream</Link>
                </FormHelperText>
            </FormControl>
        </>
    )
}

export default InputVideoStep;