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

import React, { useEffect, useMemo } from "react";

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

export default function TableSubRow(props) {
    const {
        detailCurrVideoStream, killCurrVideoStream, delCurrVideoStream,
        playRightAwayVideo, editCurrVideoStream,
        tableData, setMenuSelected, isLoading,
        renderRowSubComponent,
        paginationData,
    } = props;

    const textColor = useColorModeValue("secondaryGray.900", "white");

    const columnsData = [
        {
            Header: "Thumbnail",
            accessor: "name",
            Cell: ({ value, row }) => {
                return (
                    <Box position='relative'>
                        <Image
                            src={row.original?.video_info?.thumbnail}
                            w={"90px"}
                            borderRadius='6px'
                        />
                        <Button
                            position='absolute'
                            bg='white'
                            p="10px !important"
                            fontSize={9}
                            bottom='0px'
                            left='0px'
                            borderRadius='3px'
                            h='12px'>
                            {toHHMMSS(row.original?.video_info?.duration)}
                        </Button>
                    </Box>
                )
            }
        },
        {
            Header: "Tiêu đề",
            accessor: "",
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
                                '...'
                            )
                        }
                    </Text>
                )
            }
        },
        {
            Header: "Video livestream",
            accessor: "",
            Cell: ({ value, row }) => {
                console.log('--- data video livestream', row?.original)
                return (
                    <Text
                        color='secondaryGray.900'
                        fontSize={{ base: "sm", }}
                        fontWeight='500'
                        me='10px'>
                        { row?.original?.ytb_live_link }
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

    const columns = useMemo(() => columnsData, []);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data,
            getTrProps: (state, rowInfo, column, instance) => {
                // Define your getTrProps function here if needed
                return {};
            }
        },
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        useFlexLayout
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setPageSize
    } = tableInstance;

    useEffect(() => {
        if (paginationData?.pageSize) {
            setPageSize(paginationData.pageSize);
        }
    }, [paginationData, setPageSize]);

    return (
        <Table {...getTableProps()} variant="simple" size="sm">
            <Thead>
                {headerGroups.map(headerGroup => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <Th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                isNumeric={column.isNumeric}
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? <FaArrowDown /> : <FaArrowUp />) : ''}
                                </span>
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {isLoading ? (
                    <Tr>
                        <Td colSpan={columns.length} textAlign="center">
                            <Spinner />
                        </Td>
                    </Tr>
                ) : tableData.length > 0 ? (
                    page.map(row => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={row?.id}>
                                <Tr {...row.getRowProps()} borderTop={"1px solid #80808017"}>
                                    {row.cells.map(cell => (
                                        <Td
                                            {...cell.getCellProps()}
                                            isNumeric={cell.column.isNumeric}
                                            padding={"5px 10px"}
                                            margin={"auto 0"}
                                        >
                                            {cell.render('Cell')}
                                        </Td>
                                    ))}
                                </Tr>
                                {renderRowSubComponent && row?.isExpanded ? (
                                    <Tr>
                                        <Td colSpan={columns.length}>
                                            {renderRowSubComponent({ row })}
                                        </Td>
                                    </Tr>
                                ) : null}
                            </React.Fragment>
                        );
                    })
                ) : (
                    <Tr>
                        <Td colSpan={columns.length} textAlign="center">
                            <Image src={noVideoStreamImg} alt="No Video Stream" />
                            <Text>No Data Available</Text>
                        </Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    );
}
