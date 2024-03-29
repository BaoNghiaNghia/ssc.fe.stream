/* eslint-disable */
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
    Badge,
    Button,
    Icon,
    Spinner,
    Box,
    Tooltip,
    Image
} from "@chakra-ui/react";
import UseAnimations from "react-useanimations";
import download from 'react-useanimations/lib/download';
import activity from 'react-useanimations/lib/activity';

import React, { useEffect, useMemo, useState } from "react";

import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useRowSelect,
    useTable,
    useExpanded,
    useFlexLayout
} from "react-table";
import { IoArrowForward, IoPauseOutline } from "react-icons/io5";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { VIDEO_RESOLUTION_DEFAULT, VIDEO_STREAMING_STATUS } from "../../../../variables/index";
import { reverseTimeDate, toHHMMSS, truncate } from "../../../../utils/handleValidate";
import MenuVideo from "./MenuVideo";
import noVideoStreamImg from '../../../../assets/img/no-video-stream.png';
import { useTranslation } from "react-i18next";

export default function TableSubRow(props) {
    const {
        detailCurrVideoStream, killCurrVideoStream, delCurrVideoStream,
        playRightAwayVideo, editCurrVideoStream,
        tableData, setMenuSelected, isLoading,
        renderRowSubComponent,
        paginationData,
        handleSelectRow,
    } = props;

    const { t } = useTranslation();

    const textColor = useColorModeValue("secondaryGray.900", "white");

    const columnsData = [
        {
            Header: "Thumbnail",
            accessor: "name",
            fixed: "left",
            Cell: ({ value, row }) => {
                return (
                    <Box mb={{ base: "10px", "2xl": "10px" }} position='relative' width="130px">
                        <Image
                            src={row.original?.video_info?.thumbnail}
                            w={{ base: "100%", "3xl": "100%" }}
                            h={{ base: "100%", "3xl": "100%" }}
                            borderRadius='10px'
                        />
                        <Button
                            position='absolute'
                            bg='whiteAlpha.700'
                            _hover={{ bg: "whiteAlpha.700" }}
                            _active={{ bg: "white" }}
                            _focus={{ bg: "white" }}
                            p="10px !important"
                            fontSize="xs"
                            bottom='0px'
                            left='0px'
                            borderRadius='3px'
                            h='20px'>
                            {toHHMMSS(row.original?.video_info?.duration)}
                        </Button>
                    </Box>
                )
            }
        },
        {
            Header: "Tiêu đề",
            accessor: "",
            fixed: "left",
            Cell: ({ value, row }) => {
                return (
                    <Text
                        color={textColor}
                        fontSize={{
                            base: "sm",
                        }}
                        mb='5px'
                        fontWeight='bold'
                        me='14px'>
                        {truncate(row.original.video_info.title || row.original.name, 40)}
                    </Text>
                )
            }
        },
        {
            Header: "Luồng phát",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <>
                        <Text
                            color={textColor}
                            fontSize={{
                                base: "md",
                            }}
                            mb='5px'
                            fontWeight='bold'
                            me='14px'>
                            {row.original?.stream_obj?.name}
                        </Text>
                        <Text
                            color='gray.400'
                            fontSize={{
                                base: "xs",
                            }}
                            mb='5px'
                            fontWeight='500'
                            me='14px'>
                            {row.original?.stream_obj?.description}
                        </Text>
                    </>
                )
            }
        },
        {
            Header: "Server",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <>
                        <Text
                            color={textColor}
                            fontSize={{
                                base: "md",
                            }}
                            mb='5px'
                            fontWeight='bold'
                            me='14px'>
                            {row.original?.agent_obj?.name || '...'}
                        </Text>
                    </>
                )
            }
        },
        {
            Header: "Thời gian phát",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <Flex
                        direction="column"
                        mt='5px'>
                        <Text fontWeight='500' fontSize='sm' align="center">
                            <Icon
                                transition='0.2s linear'
                                w='12px'
                                h='12px'
                                as={IoArrowForward}
                                color='black'
                                mr="3px"
                            />
                            {reverseTimeDate(row.original.started_at)}
                        </Text>
                        <Text fontWeight='500' fontSize='sm' align="center">
                            <Icon
                                transition='0.2s linear'
                                w='12px'
                                h='12px'
                                as={IoPauseOutline}
                                color='black'
                                mr="3px"
                            />
                            {reverseTimeDate(row.original.ended_at)}
                        </Text>
                    </Flex>
                )
            }
        },
        {
            Header: "Độ phân giải",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <Text
                        color='secondaryGray.900'
                        fontSize={{ base: "sm", }}
                        fontWeight='500'
                        me='10px'>
                        {
                            row.original.video_type !== 'google_drive' ? (
                                <Badge variant='subtle' colorScheme={VIDEO_RESOLUTION_DEFAULT[row.original.resolution]?.color}>
                                    {VIDEO_RESOLUTION_DEFAULT[row.original.resolution]?.name}
                                </Badge>
                            ) : (
                                // <Badge variant='subtle' colorScheme={VIDEO_RESOLUTION_DEFAULT['1080p']?.color}>
                                //     {VIDEO_RESOLUTION_DEFAULT['1080p']?.name}
                                // </Badge>
                                '...'
                            )
                        }
                    </Text>
                )
            }
        },
        {
            Header: "Trạng thái",
            accessor: "",
            Cell: ({ value, row }) => {
                let statusID = VIDEO_STREAMING_STATUS[row.original.status]?.id;
                return (
                    <div style={{textAlign: "center"}}>
                        <Tooltip label={row.original?.status_label || VIDEO_STREAMING_STATUS[row.original.status]?.message} placement="top">
                            <Text w="fit-content" style={{ display: "inline-flex" }} borderRadius="3px" py="3px" px="6px" fontSize="13px"
                                bg={VIDEO_STREAMING_STATUS[row.original.status]?.color}
                                color={VIDEO_STREAMING_STATUS[row.original.status]?.textColor}
                            >
                                {
                                    (statusID === 6) ? (
                                        <UseAnimations 
                                            name="download"
                                            animation={download} size={22}
                                            className="animation-icon" loop={false} autoplay={false}
                                            fillColor={VIDEO_STREAMING_STATUS[row.original.status]?.textColor}
                                            strokeColor={VIDEO_STREAMING_STATUS[row.original.status]?.textColor}
                                        />
                                    ) : (statusID === 1) ? (
                                        <UseAnimations 
                                            name="activity"
                                            animation={activity} size={22}
                                            className="animation-icon" autoplay={true} 
                                            fillColor={VIDEO_STREAMING_STATUS[row.original.status]?.textColor}
                                            strokeColor={VIDEO_STREAMING_STATUS[row.original.status]?.textColor}
                                        />
                                    ) : (
                                        <Icon 
                                            as={VIDEO_STREAMING_STATUS[row.original.status]?.icon}
                                            w='15px' h='auto' mr="3px"
                                            color={VIDEO_STREAMING_STATUS[row.original.status]?.textColor}
                                        />
                                    )
                                }
                                {VIDEO_STREAMING_STATUS[row.original.status]?.message}
                            </Text>
                        </Tooltip>
                    </div>
                )
            }
        },
        {
            Header: "Hành động",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <div style={{textAlign: "center"}}>
                        <MenuVideo
                            setMenuSelected={setMenuSelected}
                            dataVideo={row.original}
                            playRightAwayVideo={() => playRightAwayVideo()}
                            detailCurrVideoStream={() => detailCurrVideoStream(row.original)}
                            editCurrVideoStream={() => editCurrVideoStream(row.original)}
                            killCurrVideoStream={() => killCurrVideoStream()}
                            delCurrVideoStream={() => delCurrVideoStream()}
                        />
                    </div>
                )
            }
        }

    ];

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
        useFlexLayout
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
        setPageSize(paginationData ? paginationData?.per_page : 15);
    }, []);

    const bodyWithData = () => {
        return (
            page.map((row, i) => {
                prepareRow(row);
                return (
                    <>
                        <Tr {...row.getRowProps()}
                            // onClick={() => handleSelectRow(row)}
                            mt={3}
                            key={i}
                        >
                            {row.cells.map((cell, index) => {
                                return (
                                    <Td {...cell.getCellProps()}
                                        key={index}
                                        margin="auto 0"
                                        paddingTop={0}
                                        paddingBottom={0}
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

    const listWithData = () => {
        return (
            <Table
                {...getTableProps()}
                color='black'
            >
                <Thead bgColor='linear(to-r, gray, green.500)'>
                    {headerGroups.map((headerGroup, i) => (
                        <Tr key={i} {...headerGroup.getHeaderGroupProps()} borderRadius="10px">
                            {headerGroup.headers.map((column, index) => {
                                return (
                                    <Th
                                        key={index}
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
        )
    }

    const listWithoutData = () => {
        return (
            <>
                <Table
                    {...getTableProps()}
                    color='black'
                >
                    <Thead bgColor="#f5f5f5">
                        {headerGroups.map((headerGroup, i) => (
                            <Tr key={i} {...headerGroup.getHeaderGroupProps()} borderRadius="10px">
                                {headerGroup.headers.map((column, index) => {
                                    return (
                                        <Th
                                            key={index}
                                            {...column.getHeaderProps()}
                                        >
                                            <Text {...column.getSortByToggleProps()} color='black'>
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
                </Table>
                <Flex
                    direction={{ base: "column" }}
                    p='0px'
                    justify='center'
                    alignContent="center"
                    backgroundSize="contain"
                    align={'center'}
                    // border="2px solid #ececec"
                    borderRadius="10px"
                    minH="300px"
                >
                    <Flex flexDirection="column" justify='center' width="100%" align='center' my='20px'>
                        <Image
                            src={noVideoStreamImg}
                            w={{ base: "30%" }}
                            h={{ base: "30%" }}
                            borderRadius='20px'
                        />
                        <Text color="gray" textAlign='center' fontWeight='bold' fontSize='l' my='15px'>
                            {t('content.no_video_livestream')}
                        </Text>
                    </Flex>
                </Flex>
            </>
        )
    }

    return (
        <React.Fragment>
            {tableData.length > 0 ? listWithData() : listWithoutData()}
        </React.Fragment>

    );
}
