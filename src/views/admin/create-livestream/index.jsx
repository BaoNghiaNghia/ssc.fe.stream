/* eslint-disable */
import React, { useState, useCallback, useEffect, useRef, Component } from 'react'
import {
    Box,
    ButtonGroup,
    Button,
    Grid,
    useDisclosure,
    Flex,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Spinner,
    Text,
    Badge,
    Avatar,
    AvatarGroup,
    Icon,
    useOutsideClick,
    GridItem,
    SimpleGrid,
    SkeletonCircle,
    SkeletonText,
    Center,
} from '@chakra-ui/react';

import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from 'react-toastify';
import { RxReset } from "react-icons/rx";

import Card from "../../../components/card/Card";
import InputVideoStep from './components/InputVideoStep';
import ConfigureStreamStep from './components/ConfigureStreamStep';
import FinalStep from './components/FinalStep';

import {
    MULTI_STEP_FORM_CREATE_STREAM,
    USER_PACKAGE_STATUS,
    columnsInsertVideoStream,
    listOptionFieldVideo,
    statusFieldVideo
} from "../../../variables/index";

import {
    defaultISODateString,
    validateYouTubeUrl,
    reverseTimeDate,
    removeEmpty,
    _sleep,
} from '../../../utils/handleValidate';

import { useTranslation } from 'react-i18next';

import {
    cancelStreamingApi,
    createStreamingApi,
    deleteStreamingApi,
    fetchListAcceptedResolution,
    fetchListUserStreamApi,
    fetchVideoMETAInfoData,
    listStreamingApi,
    playStreamingApi,
    fetchListAgentServerOfUser
} from '../../../api/Stream';
import { MESSSAGE_STATUS_CODE } from '../../../variables';

import ModalAddUrl from './components/ModalAddUrl';
import TableListThreadStream from './thread-component/TableListThreadStream';
import CardSubRow from './thread-component/CardSubRow';
import { MdArrowCircleDown, MdArrowCircleRight, MdLockReset, MdOutlineClose, MdOutlineDone, MdOutlineError, MdPause, MdPlayArrow, MdWatchLater } from 'react-icons/md';
import ModalStreamVideo from './thread-component/ModalStreamVideo';
import DetailVideoLivestream from './thread-component/DetailVideoLivestream';
import Pagination from '../../../components/paginationCustom/Pagination';
import TableSubRow from './thread-component/TableSubRow';
import FilterHeader from './display-video-component/FilterHeader';
import VideoStreamTable from './display-video-component/VideoStreamTable';
import EditVideoLivestream from './thread-component/EditVideoLivestream';
import FormFilterCustom from './display-video-component/FilterForm';
import { isEmpty } from 'lodash';

const initialValues = {
    name: "",
    stream_id: "",
    agent_id: "",
    url: "",
    resolution: "",
    started_at: "",
    ended_at: "",
    started_time: "",
    ended_time: ""
}

const columnsThreadStreams = [
    {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
            <>
                <Text
                    {...getToggleAllRowsExpandedProps()}
                    fontSize={18}
                    fontWeight={"bold"}
                    ml={1}
                >
                    {isAllRowsExpanded ? <Icon as={MdArrowCircleDown} fontSize={30} width='20px' height='20px' color='blue.500' /> 
                        : <Icon as={MdArrowCircleRight} fontSize={30} width='20px' height='20px' color='blue.500' /> }
                </Text>
            </>
        ),
        Cell: ({ row, isAllRowsExpanded }) => {
            return (
                !row.canExpand ? (
                    <Text
                        { ...row.getToggleRowExpandedProps() }
                        fontSize={25}
                        fontWeight={"bold"}
                        ml={1}
                        px="20px"
                    >
                        {row.isExpanded ? <Icon as={MdArrowCircleDown} fontSize={30} width='20px' height='20px' color='blue.500' /> 
                            : <Icon as={MdArrowCircleRight} fontSize={30} width='20px' height='20px' color='blue.500' />}
                    </Text>
                ) : null
            )
        }
      },
    {
        Header: "Tên luồng",
        accessor: "name",
        Cell: ({ value, row }) => (
            <Text fontSize='md' fontWeight='700'>
                {value}
            </Text>
        )
    },
    {
        Header: "Số lượng video",
        accessor: "",
        Cell: ({ value, row }) => {
            return (
                <>{
                    row.original.groupThumbnail.length != 0 ? (
                        <Grid
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(2, 1fr)'
                            gap={2}
                            >
                            <GridItem colSpan={1} margin="auto 0">
                                <Text size="sm"><strong>{row.original.groupThumbnail.length}</strong> Video</Text>
                            </GridItem>
                            <GridItem colSpan={1} margin="auto 0">
                                <AvatarGroup size='sm' max={2}>
                                    { row.original.groupThumbnail.map((item) => (<Avatar src={item} />)) }
                                </AvatarGroup>
                            </GridItem>
                        </Grid>
                    ) : (
                        <Text size="sm">Chưa có video</Text>
                    )
                }</>
            )
        },
    },
    {
        Header: "Tiến trình",
        accessor: "",
        Cell: ({ value, row }) => {
            const statusTotal = {
                "0": 0,
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
            }
            row.original.groupVideo.map((docs) => statusTotal[docs.status] = statusTotal[docs.status] + 1 );
            return (
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(1, 1fr)'
                    >
                    <GridItem rowSpan={1}>
                        <Badge variant='subtle' px="5px" py="2px" m="2px" borderColor="white" borderRadius="10%" bgColor='gray.200' justifyContent="center" alignContent="center">
                            <Icon as={MdPlayArrow} color='black' w="15px" h="12px" />
                            { statusTotal["0"] }
                        </Badge>
                        <Badge variant='subtle' px="5px" py="2px" m="2px" borderColor="white" borderRadius="10%" bgColor='gray.200'>
                            <Icon as={MdPause} color='black' w="15px" h="12px" />
                            { statusTotal["1"] }</Badge>
                        <Badge variant='subtle' px="5px" py="2px" m="2px" borderColor="white" borderRadius="10%" bgColor='gray.200'>
                            <Icon as={MdOutlineDone} color='black' w="15px" h="12px" />
                            { statusTotal["2"] }</Badge>
                    </GridItem>
                    <GridItem rowSpan={1}>
                        <Badge variant='subtle' px="5px" py="2px" m="2px" borderColor="white" borderRadius="10%" bgColor='gray.200'>
                            <Icon as={MdOutlineClose} color='black' w="15px" h="12px" />
                            { statusTotal["3"] }</Badge>
                        <Badge variant='subtle' px="5px" py="2px" m="2px" borderColor="white" borderRadius="10%" bgColor='gray.200'>
                            <Icon as={MdOutlineError} color='black' w="15px" h="12px" />
                            { statusTotal["4"] }</Badge>
                        <Badge variant='subtle' px="5px" py="2px" m="2px" borderColor="white" borderRadius="10%" bgColor='gray.200'>
                            <Icon as={MdWatchLater} color='black' w="15px" h="12px" />
                            { statusTotal["5"] }</Badge>
                    </GridItem>
                </Grid>
            )
        },
    },
    {
        Header: "Thời hạn",
        accessor: "",
        Cell: ({ value, row }) =>  {
            return (
                <Grid
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(2, 1fr)'
                    gap={3}
                    >
                    <GridItem colSpan={1}>
                        <Text fontSize={"xs"}>
                            Từ ngày
                        </Text>
                        <Text fontSize={"sm"} fontWeight="bold">
                            {reverseTimeDate(row.original.started_at)}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text fontSize={"xs"}>
                            Đến ngày 
                        </Text>
                        <Text fontSize={"sm"} fontWeight="bold">
                            {reverseTimeDate(row.original.expired_at)}
                        </Text>
                    </GridItem>
                </Grid>
            )
        }
    },
    {
        Header: "Trạng thái",
        accessor: "status",
        Cell: ({ value, row }) => {
            return (
                <Flex align='center'>
                    <Badge borderRadius="4px" variant='solid' colorScheme={USER_PACKAGE_STATUS[value]?.color || 'gray'}>
                        <Text 
                            color="white" fontSize='xs' fontWeight='500'> 
                            {USER_PACKAGE_STATUS[value]?.message}
                        </Text>
                    </Badge>
                </Flex>
            )
        }
    }
]

let initFilterLocalStorage = sessionStorage.getItem('filter_stream') && JSON.parse(sessionStorage.getItem('filter_stream'));

let interval;

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
   
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
   
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

const initFormFilter = {
    keyword: initFilterLocalStorage?.keyword || '',
    order_by: initFilterLocalStorage?.order_by || null,
    status:  initFilterLocalStorage?.status || null,
    stream_id: initFilterLocalStorage?.stream_id || null,
    agent_id: initFilterLocalStorage?.agent_id  || null,
    limit: initFilterLocalStorage?.limit || 15
}

export default function CreateLivestream() {
    const { t } = useTranslation();

    const Step1Schema = Yup.object().shape({
        name: Yup.string().required(t('content.required_field')),
        url: Yup.string().required(t('content.required_field')),
    });

    const Step2Schema = Yup.object().shape({
        agent_id: Yup.string().required(t('content.required_field')),
        stream_id: Yup.string().required(t('content.required_field')),
        resolution: Yup.string().required(t('content.required_field')),
    });

    const Step3Schema = Yup.object().shape({
        started_at: Yup.date().required(t('content.required_field')),
        ended_at: Yup.date().required(t('content.required_field')),
        started_time: Yup.string().required(t('content.required_field')),
        ended_time: Yup.string().required(t('content.required_field'))
    })
    
    const validateSchemaStep = [Step1Schema, Step2Schema, Step3Schema];

    const ref = useRef();

    const [listServerAgent, setListServerAgent] = useState([]);
    
    const [listUserStream, setListUserStream] = useState();
    const [listVideoResolution, setListVideoResolution] = useState();
    
    const [menuSelected, setMenuSelected] = useState();
    
    const [tableVideoPlaylist, setTableVideoPlaylist] = useState([]);
    const [loadingAddVideo, setLoadingAddVideo] = useState(false);
    
    const [displaySubRowState, setDisplaySubRowState] = useState('table-video');

    const [tableThreadStream, setTableThreadStream] = useState({});
    const [tableVideosStream, setTableVideosStream] = useState({});

    const [filter, setFilter] = useState(initFormFilter);

    const [allUserStream, setAllUserStream] = useState([]);

    const [activeFilter, setActiveFilter] = useState(false);

    useOutsideClick({
        ref: ref,
        handler: () => handleClickOutside(),
    });

    const [dataEditVideoLivestream, setDataEditVideoLivestream] = useState({});

    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
    const { 
        isOpen: isOpenKillConfirm,
        onOpen: onOpenKillConfirm,
        onClose: onCloseKillConfirm
    } = useDisclosure();

    const { 
        isOpen: isOpenDelConfirm,
        onOpen: onOpenDelconfirm,
        onClose: onCloseDeleleConfirm
    } = useDisclosure();

    const { 
        isOpen: isOpenPlayRightAway,
        onOpen: onOpenPlayRightAway,
        onClose: onClosePlayRightAway
    } = useDisclosure();

    const { 
        isOpen: isOpenCreateVideoStreamModal,
        onOpen: onOpenCreateVideoStreamModal,
        onClose: onCloseCreateVideoStreamModal 
    } = useDisclosure();

    const {
        isOpen: isOpenDetailVideoStreamModal,
        onOpen: onOpenDetailVideoStreamModal,
        onClose: onCloseDetailVideoStreamModal
    } = useDisclosure();

    const {
        isOpen: isOpenEditVideoStreamModal,
        onOpen: onOpenEditVideoStreamModal,
        onClose: onCloseEditVideoStreamModal
    } = useDisclosure();

    const {
        isOpen: isOpenFilterModal,
        onOpen: onOpenFilterModal,
        onClose: onCloseFilterModal
    } = useDisclosure();

    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = validateSchemaStep[activeStep];
    const isLastStep = activeStep === MULTI_STEP_FORM_CREATE_STREAM.length - 1;

    const handleFetchVideoResolution = async () => {
        try {
            const responseResolution = await fetchListAcceptedResolution();
            if (responseResolution.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                let data = [];
                responseResolution.data.data.map(item => {
                    data.push({
                        'label': item.name + ' - ' + item.resolution,
                        'value': item.name
                    });
                });
                setListVideoResolution(data);
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

    const handleClickOutside = () => {
        if (!isOpenCreateVideoStreamModal) {
            formik.resetForm();
            setTableVideoPlaylist([]);
            setActiveStep(0);
        }
    }

    const handleFetchListVideoStream = async (params) => {
        try {
            let filterParams = removeEmpty(filter);
            if (filterParams['order_by']) {
                let orderByArr = filterParams['order_by'].split(" ");
                filterParams['order'] = orderByArr[0]
                filterParams['by'] = orderByArr.slice(-1).pop();
                delete filterParams['order_by'];
            }
            sessionStorage.setItem('filter_stream', JSON.stringify(filterParams));
            const responseVideoStream = await listStreamingApi({...params, ...filterParams});
            if (responseVideoStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                setTableVideosStream(responseVideoStream.data.data);
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            console.log(err);
        }
    }

    const handleFetchListVideoStreamOriginal = async () => {
        try {
            const responseVideoStream = await listStreamingApi();
            if (responseVideoStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                setTableVideosStream(responseVideoStream.data.data);
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            console.log(err);
        }
    }

    const fetchAllUserStream = async () => {
        try {
            const responseVideoStream = await fetchListUserStreamApi({
                limit: 500
            });
            if (responseVideoStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                setAllUserStream(responseVideoStream.data.data.items.map((item) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                }));
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            console.log(err);
        }
    }

    const handleFetchVideoStreamingByStreamID = async (stream_id) => {
        try {
            const responseVideoStream = await listStreamingApi({
                stream_id: stream_id
            });
            if (responseVideoStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                let resArr = [];
                let groupThumbnail = [];
                responseVideoStream.data.data.items.map(async (item) => {
                    if (item.stream_id == stream_id) {
                        resArr.push(item);
                        groupThumbnail.push(item.video_info.thumbnail);
                    }    
                });
                return { groupVideo: resArr, groupThumbnail, metaVideo: responseVideoStream.data.data.meta };
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            console.log(err);
        }
    }
    
    const handleFetchUserStream = async (params) => {
        try {
            const responseUserStream = await fetchListUserStreamApi(params || {});
            if (responseUserStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                const dataResponse = responseUserStream.data.data

                let data = [];
                let listItems = [];
                dataResponse.items.map(item => data.push({
                    'label': item.name,
                    'value': item.id
                }));
                await Promise.all(
                    dataResponse.items.map(async (docs, index) => {
                        let { groupVideo, groupThumbnail, metaVideo } = await handleFetchVideoStreamingByStreamID(docs.id);
                        return listItems.push({ 
                            ...docs,
                            groupThumbnail: groupThumbnail,
                            groupVideo: groupVideo,
                            metaVideo: metaVideo
                        });
                    }),
                );

                setListUserStream(data);
                setTableThreadStream({
                    items: listItems,
                    meta: dataResponse.meta
                });
            }
            return responseUserStream;
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            console.log(err);
        }
    }

    const handleFetchListAgentServerOfUser = async (params) => {
        try {
            const responseServerLivestream = await fetchListAgentServerOfUser(params || {});
            if (responseServerLivestream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                setListServerAgent(responseServerLivestream.data.data.items.map(agent => {
                    return {
                        label: agent.name,
                        value: agent.id
                    }
                }));
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

    useInterval(() => {
        if (
            // activeFilter === false &&
            isOpenDelConfirm === false &&
            isOpenCreateVideoStreamModal === false &&
            isOpenDetailVideoStreamModal === false &&
            isOpenEditVideoStreamModal === false &&
            isOpenFilterModal === false &&
            isOpenPlayRightAway === false
        ) {
            handleFetchListVideoStream({ page: tableVideosStream?.meta?.current_page });
        }
    }, 7000);

    useEffect(() => {
        handleFetchListVideoStream();

        handleFetchListAgentServerOfUser();
        fetchAllUserStream();
        handleFetchVideoResolution();

        if (initFilterLocalStorage) {
            const { limit, ...rest } = initFilterLocalStorage;
            setActiveFilter(Object.entries(rest).length > 0);
        }
        setInputValue("started_at", defaultISODateString());
        return () => clearInterval(interval);
    }, []);

    const handleOpenModal = () => () => {
        onOpen();
    }

    const handleAddURLVideo = (url) => async () => {
        setLoadingAddVideo(true);
        try {
            if (validateYouTubeUrl(url)) {
                let responseVideoMETA = await fetchVideoMETAInfoData({ 'url': url });
                if (responseVideoMETA.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                    await Promise.all(
                        setInputValue("name", responseVideoMETA.data.data.title),
                        setTableVideoPlaylist([...tableVideoPlaylist, {
                            "order": tableVideoPlaylist.length + 1,
                            "video": responseVideoMETA.data.data,
                            "action": "remove"
                        }]),
                        onClose()
                    )
                }
                
                if (formik.values.name === "") {
                    setInputValue("url", url);
                }
            } else {
                let responseVideoMETA = await fetchVideoMETAInfoData({ 'url': url });
                setInputValue("resolution", "1080p");
                if (responseVideoMETA.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                    await Promise.all(
                        setTableVideoPlaylist([...tableVideoPlaylist, {
                            "order": tableVideoPlaylist.length + 1,
                            "video": responseVideoMETA.data.data,
                            "action": "remove"
                        }]),
                        onClose()
                    )
                }
            }
            setLoadingAddVideo(false);
        } catch (err) {
            setLoadingAddVideo(false);
            console.log(err)
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

    const handleRemoveURLVideo = (cell) => () => {
        let temp = tableVideoPlaylist.filter(obj => obj != tableVideoPlaylist[cell.row.index]);
        setTableVideoPlaylist(temp);
        setInputValue("name", "");
        setInputValue("url", "");
    }

    const handleOnSubmitFormCreateStream = async (values) => {
        try {
            if (isLastStep) {
                let { started_time, ended_time, ...rest } = values
                rest.started_at = rest.started_at + " " + started_time + ":00"; 
                rest.ended_at = rest.ended_at + " " + ended_time + ":00";
                
                const response = await createStreamingApi(rest);
                if (response.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                    toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`))
                    
                    _sleep(1000);
                    await handleFetchUserStream();
                    window.location.reload();

                    setActiveStep(activeStep + 1);
                    actions.resetForm();
                    actions.setSubmitting(false); 

                    onCloseCreateVideoStreamModal();
                }
            } else {
                setActiveStep(activeStep + 1);
                actions.setTouched({});
                actions.setSubmitting(false);
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: currentValidationSchema,
        onSubmit: handleOnSubmitFormCreateStream,
    });

    const setInputValue = useCallback(
        (key, value) => {
            formik.setValues({ ...formik.values, [key]: value });
        }, [formik]
    );

    const detailCurrVideoStream = (item) => {
        onOpenDetailVideoStreamModal();
        setDataEditVideoLivestream(item);
    }

    const handleOpenModalCreateStream = (idUserStream) => () => {
        if (idUserStream) {
            setInputValue("stream_id", idUserStream);
        }
        onOpenCreateVideoStreamModal();
    }

    const delCurrVideoStream = () => {
        onOpenDelconfirm();
    }

    const killCurrVideoStream = () => {
        onOpenKillConfirm();
    }

    const handleOpenFilterModal = () => {
        onOpenFilterModal();
    }

    const playRightAwayVideo = () => {
        onOpenPlayRightAway();
    }

    const editCurrVideoStream = (item) => {
        onOpenEditVideoStreamModal();
        setDataEditVideoLivestream(item);
    }

    const handleConfirmKill = async () => {
        try {
            const responseConfirmKill = await cancelStreamingApi({ id: menuSelected.id });
            if (responseConfirmKill.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                onCloseKillConfirm();

                await handleFetchListVideoStreamOriginal();
                await handleFetchUserStream();

                // window.location.reload();
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            onCloseKillConfirm();
        }
    }

    const handleConfirmDelete = async () => {
        try {
            console.log(' id nè ---', menuSelected)
            const responseConfirmDel = await deleteStreamingApi(menuSelected.id);
            if (responseConfirmDel.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                onCloseDeleleConfirm();
                await handleFetchListVideoStreamOriginal();
                await handleFetchUserStream();
                // window.location.reload();
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            onCloseDeleleConfirm();
        }
    }

    const handleConfirmPlayRightAway = async () => {
        try {
            const responseConfirmDel = await playStreamingApi(menuSelected.id);
            if (responseConfirmDel.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                onClosePlayRightAway();
                _sleep(2000);
                // window.location.reload();
                await handleFetchListVideoStreamOriginal();
                await handleFetchUserStream();

            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            onClosePlayRightAway();
        }
    }

    const handleConfirmFilter = async () => {
        try {
            await handleFetchListVideoStream();
            setActiveFilter(true);
            clearInterval(interval);
            onCloseFilterModal();
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            onCloseFilterModal();
        }
    }

    const handleResetFilter = async () => {
        try {
            setFilter(prevState => ({ ...prevState, 'keyword': '' }));
            setFilter(prevState => ({ ...prevState, 'order_by': null }));
            setFilter(prevState => ({ ...prevState, 'status': null }));
            setFilter(prevState => ({ ...prevState, 'stream_id': null }));
            setFilter(prevState => ({ ...prevState, 'agent_id': null }));
            setFilter(prevState => ({ ...prevState, 'limit': 15 }));
            setActiveFilter(false);
            sessionStorage.removeItem('filter_stream');

            await handleFetchListVideoStreamOriginal();
            onCloseFilterModal();

        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            onCloseFilterModal();
        }
    }

    const handleGoBackStep = () => {
        setActiveStep(activeStep - 1);
    }

    const renderStepContent = (step) => {
        switch (step) {
          case 0:
            return (
                <InputVideoStep
                    columnsData={columnsInsertVideoStream}
                    tableData={tableVideoPlaylist}
                    handleRemoveURLVideo={handleRemoveURLVideo}
                    handleOpenModal={handleOpenModal}
                    setInputValue={setInputValue}
                    formik={formik}
                />
            );
          case 1:
            return (
                <ConfigureStreamStep 
                    allUserStream={allUserStream}
                    listServerAgent={listServerAgent}
                    listVideoResolution={listVideoResolution}
                    setInputValue={setInputValue}
                    formik={formik}
                    displaySubRowState={displaySubRowState}
                />
            );
          case 2:
            return (
                <FinalStep 
                    setInputValue={setInputValue}
                    formik={formik}
                />
            );
          default:
            return (
                <Center h="120px">
                    <Text fontSize="lg" gutterBottom>
                        Tạo mới thành công
                    </Text>
                </Center>
            );
        }
    }


    const formCreateStream = (
        <form onSubmit={formik.handleSubmit}>
            { renderStepContent(activeStep) }
            <ButtonGroup mt="2%" w="100%">
                <Flex w="100%" justifyContent="flex-end" alignItems="right">
                    {activeStep !== 0  && (
                        <Button
                            onClick={handleGoBackStep}
                            colorScheme="blue"
                            variant="outline"
                            w="7rem"
                            mr="1%">
                            Quay lại
                        </Button>
                    )}
                    <Button
                        w="7rem"
                        isDisabled={formik.isSubmitting}
                        colorScheme="blue"
                        type='submit'
                        variant="brand">
                        
                        {isLastStep ? 'Tạo mới' : 'Tiếp theo'}
                    </Button>
                </Flex>
            </ButtonGroup>
        </form>
    );

    const modalContent = (
        <React.Fragment>
            <Stepper index={activeStep} mt="10px">
                {MULTI_STEP_FORM_CREATE_STREAM.map((activeStep, index) => (
                    <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{activeStep.title}</StepTitle>
                        <StepDescription>{activeStep.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            {formCreateStream}
        </React.Fragment>
    );

    const filterGroup = () => {
        return (
            <FilterHeader
                title="Danh sách luồng Video Stream"
                handleOpenFilterModal={handleOpenFilterModal}
                activeFilter={activeFilter}
                handleOpenModalCreateStream={handleOpenModalCreateStream}
                listUserStream={listUserStream}
                setDisplaySubRowState={setDisplaySubRowState}
                displaySubRowState={displaySubRowState}
            />
        )
    }

    const renderSwitchDisplay = (param) => {
        // TODO: xử lý lại, tách từng view ra từng Component, tránh gọi cùng 1 lúc
        switch(param) {
          case 'table-video':
            return (
                <VideoStreamTable
                    filterGroup={filterGroup()}
                    tableData={tableVideosStream && tableVideosStream?.items}
                    paginationData={tableVideosStream && tableVideosStream?.meta}
                    setMenuSelected={setMenuSelected}
                    playRightAwayVideo={playRightAwayVideo}
                    editCurrVideoStream={editCurrVideoStream}
                    detailCurrVideoStream={detailCurrVideoStream}
                    killCurrVideoStream={killCurrVideoStream}
                    delCurrVideoStream={delCurrVideoStream}
                    handleFetchResource={handleFetchListVideoStream}
                />
            );
          default:
            return 'table-video';
        }
    }

    const handleChangeStateFilter = (e) => {
        const { name, value } = e.target;
        setFilter(prevState => ({ ...prevState, [name]: value }));
    };

    const onSearchVideoStream = (value) => {
        setFilter(prevState => ({ ...prevState, keyword: value }));
    }

    return (
        <>
            <ModalAddUrl
                isOpen={isOpen}
                onClose={onClose}
                handleAddURLVideo={handleAddURLVideo}
                loadingAddVideo={loadingAddVideo}
                setInputValue={setInputValue}
                formik={formik}
            />

            <ModalStreamVideo
                size="xl"
                isOpen={isOpenKillConfirm}
                onClose={onCloseKillConfirm}
                title="Hủy livestream"
                content="Bạn chắc muốn hủy livestream này ?"
                footer={true}
                handleConfirm={handleConfirmKill}
            />
            <ModalStreamVideo
                size="xl"
                isOpen={isOpenDelConfirm}
                onClose={onCloseDeleleConfirm}
                title="Xóa livestream"
                content="Luồng livestream sẽ bị xóa vĩnh viễn. Bạn vẫn muốn tiếp tục ?"
                footer={true}
                handleConfirm={handleConfirmDelete}
            />
            <ModalStreamVideo
                size="xl"
                isOpen={isOpenPlayRightAway}
                onClose={onClosePlayRightAway}
                title="Phát ngay"
                content="Video sẽ được phát ngay bây giờ. Bạn vẫn muốn tiếp tục ?"
                footer={true}
                handleConfirm={handleConfirmPlayRightAway}
            />
            <ModalStreamVideo
                ref={ref}
                isOpen={isOpenCreateVideoStreamModal}
                onClose={onCloseCreateVideoStreamModal}
                title="Thêm video livestream"
                content={modalContent}
            />
            <ModalStreamVideo
                isOpen={isOpenDetailVideoStreamModal}
                onClose={onCloseDetailVideoStreamModal}
                title="Chi tiết video livestream"
                content={
                    <>{
                        dataEditVideoLivestream && (
                            <DetailVideoLivestream
                                dataGeneral={dataEditVideoLivestream}
                                listServerAgent={listServerAgent}
                            />
                        )
                    }</>
                }
            />
            <ModalStreamVideo
                isOpen={isOpenEditVideoStreamModal}
                onClose={onCloseEditVideoStreamModal}
                title="Chỉnh sửa video livestream"
                content={
                    <>{
                        dataEditVideoLivestream && (
                            <EditVideoLivestream
                                dataGeneral={dataEditVideoLivestream}
                                handleRefresh={handleFetchListVideoStreamOriginal}
                                listServerAgent={listServerAgent}
                            />
                        )
                    }</>
                }
            />
            <ModalStreamVideo
                size="2xl"
                isOpen={isOpenFilterModal}
                onClose={onCloseFilterModal}
                title="Bộ lọc tìm kiếm"
                content={
                    <FormFilterCustom
                        filter={filter}
                        onSearch={onSearchVideoStream}
                        handleChangeStateFilter={handleChangeStateFilter}
                        listFieldVideo={listOptionFieldVideo}
                        statusFieldVideo={statusFieldVideo}
                        allUserStream={allUserStream}
                        setFilter={setFilter}
                        listServerAgent={listServerAgent}
                    />
                }
                handleConfirm={handleConfirmFilter}
                footer={true}
                addButton={
                    <Button rightIcon={<RxReset />} 
                        colorScheme='blue' variant='ghost' 
                        size="sm" borderRadius="5px" mr="5px"
                        fontWeight="500"
                        onClick={handleResetFilter}
                        _hover={{
                            bg: "#e2e8f0"
                        }}>
                        Reset bộ lọc
                    </Button>
                }
            />
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <Flex
                    flexDirection='column'
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
                    <Card p="0px">
                    {
                        Object.keys(tableVideosStream).length == 0 ? (
                            <React.Fragment>
                                <Box padding='6' boxShadow='lg' bg='white'>
                                    <SkeletonCircle startColor='gray.200' endColor='gray.200' size='14' borderRadius="5px" />
                                    <SkeletonText startColor='gray.200' endColor='gray.200' 
                                        mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />
                                </Box>
                                <Box padding='6' boxShadow='lg' bg='white'>
                                    <SkeletonCircle startColor='gray.200' endColor='gray.200' size='14' borderRadius="5px" />
                                    <SkeletonText startColor='gray.200' endColor='gray.200'
                                        mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />
                                </Box>
                                <Box padding='6' boxShadow='lg' bg='white'>
                                    <SkeletonCircle startColor='gray.200' endColor='gray.200' size='14' borderRadius="5px" />
                                    <SkeletonText startColor='gray.200' endColor='gray.200' 
                                        mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {renderSwitchDisplay(displaySubRowState)}
                            </React.Fragment>
                        )
                    }
                    </Card>
                </Flex>
            </Box>
        </>
    )
}
