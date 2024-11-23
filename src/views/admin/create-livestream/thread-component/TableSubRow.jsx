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
import { FiServer } from "react-icons/fi";
import { MdOutlineHub } from "react-icons/md";

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
                            src={row?.original?.video_info?.thumbnail}
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
                            {toHHMMSS(row?.original?.video_info?.duration)}
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
                        me='14px'>
                        {truncate(row?.original?.video_info?.title || row?.original?.name, 40)}
                    </Text>
                )
            }
        },
        {
            Header: "Luồng phát",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <span style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                        <MdOutlineHub style={{ color: 'gray', marginRight: '7px', width: '18px', height: '18px' }} />
                        <Text
                            color={textColor}
                            fontSize={{
                                base: "sm",
                            }}
                            me='14px'>
                            {row?.original?.stream_obj?.name}
                        </Text>
                    </span>
                )
            }
        },
        {
            Header: "Server",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                        <FiServer color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
                        <Text
                            color={textColor}
                            fontSize={{
                                base: "sm",
                            }}
                            me='14px'>
                            {row?.original?.agent_obj?.name || '...'}
                        </Text>
                    </div>
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
                            {reverseTimeDate(row?.original?.started_at)}
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
                            {reverseTimeDate(row?.original?.ended_at)}
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
                            row?.original?.video_type !== 'google_drive' ? (
                                <Badge variant='subtle' colorScheme={VIDEO_RESOLUTION_DEFAULT[row?.original?.resolution]?.color}>
                                    {VIDEO_RESOLUTION_DEFAULT[row?.original?.resolution]?.name}
                                </Badge>
                            ) : <span style={{ color: '#80808080' }}>Chưa có thông tin</span>
                        }
                    </Text>
                )
            }
        },
        {
            Header: "Video livestream",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <>
                        { 
                            row?.original?.ytb_live_link ? (
                                <Text
                                    color='secondaryGray.900'
                                    fontSize={{ base: "sm", }}
                                    fontWeight='500'
                                    me='10px'>
                                    {row?.original?.ytb_live_link}
                                </Text>
                            ) : <span style={{ color: '#80808080' }}>Chưa có thông tin</span>
                        }
                    </>
                )
            }
        },
        {
            Header: "Trạng thái",
            accessor: "",
            Cell: ({ row }) => {
                const status = row?.original?.status;
                const statusData = VIDEO_STREAMING_STATUS[status];
                const statusID = statusData?.id;
                
                return (
                    <div style={{ textAlign: "left" }}>
                        <Tooltip 
                            label={row?.original?.status_label || statusData?.message} 
                            placement="top"
                        >
                            <span style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                                <Text 
                                    w="fit-content" 
                                    style={{ display: "inline-flex" }} 
                                    borderRadius="8px" 
                                    py="3px" 
                                    px="6px" 
                                    fontSize="13px"
                                    bg={statusData?.color}
                                    color={statusData?.textColor}
                                >
                                    {statusID === 6 ? (
                                        <UseAnimations 
                                            name="download"
                                            animation={download} 
                                            size={20}
                                            className="animation-icon" 
                                            loop={false} 
                                            autoplay={false}
                                            fillColor={statusData?.textColor}
                                            strokeColor={statusData?.textColor}
                                        />
                                    ) : statusID === 1 ? (
                                        <UseAnimations 
                                            name="activity"
                                            animation={activity} 
                                            size={20}
                                            className="animation-icon" 
                                            autoplay={true} 
                                            fillColor={statusData?.textColor}
                                            strokeColor={statusData?.textColor}
                                        />
                                    ) : (
                                        <Icon 
                                            as={statusData?.icon}
                                            w='20px' 
                                            fontWeight={800}
                                            h='auto' 
                                            color={statusData?.textColor}
                                        />
                                    )}
                                </Text>
                                <span style={{ marginLeft: '8px', fontWeight: 500, color: 'gray' }} >{statusData?.message}</span>
                            </span>
                        </Tooltip>
                    </div>
                );
            }
        },        
        {
            Header: "Hành động",
            accessor: "",
            Cell: ({ value, row }) => {
                return (
                    <div style={{marginLeft: '20px'}}>
                        <MenuVideo
                            setMenuSelected={setMenuSelected}
                            dataVideo={row?.original}
                            playRightAwayVideo={() => playRightAwayVideo()}
                            detailCurrVideoStream={() => detailCurrVideoStream(row?.original)}
                            editCurrVideoStream={() => editCurrVideoStream(row?.original)}
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
            setPageSize(paginationData?.pageSize);
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
                        <Td colSpan={columns?.length} textAlign="left">
                            <Spinner />
                        </Td>
                    </Tr>
                ) : tableData?.length > 0 ? (
                    page?.map(row => {
                        prepareRow(row);
                        return (
                            <React.Fragment key={row?.id}>
                                <Tr {...row.getRowProps()} borderTop={"1px solid #80808017"}>
                                    {row.cells.map(cell => (
                                        <Td
                                            {...cell.getCellProps()}
                                            isNumeric={cell.column.isNumeric}
                                            padding="5px 10px"
                                            margin="auto 0"
                                        >
                                            {cell.render('Cell')}
                                        </Td>
                                    ))}
                                </Tr>
                                {renderRowSubComponent && row?.isExpanded ? (
                                    <Tr>
                                        <Td colSpan={columns?.length}>
                                            {renderRowSubComponent({ row })}
                                        </Td>
                                    </Tr>
                                ) : null}
                            </React.Fragment>
                        );
                    })
                ) : (
                    <Tr>
                        <Td colSpan={columns?.length} textAlign="center" py={8}>
                            <Flex flexDirection="column" alignItems="center" justifyContent="center">
                            <Image src={noVideoStreamImg} alt="No Video Stream" width="20%" my={4} />
                            <Text fontSize="lg" fontWeight="bold" color="gray.600" className="mb-1" style={{ marginBottom: '5px' }}>Không có dữ liệu</Text>
                            <Text fontSize="md" color="gray.500">Hãy thêm luồng mới để bắt đầu.</Text>
                            </Flex>
                        </Td>
                    </Tr>

                )}
            </Tbody>
        </Table>
    );
}
