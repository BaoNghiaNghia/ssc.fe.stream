/* eslint-disable */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
    Progress,
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
    Text,
} from '@chakra-ui/react';

import * as Yup from "yup";
import { setIn, useFormik } from "formik";

import { toast } from 'react-toastify';

import Card from "../../../../components/card/Card";
import InputVideoStep from '../components/InputVideoStep';
import ConfigureStreamStep from '../components/ConfigureStreamStep';
import FinalStep from '../components/FinalStep';

import {
    columnsInsertVideoStream, regexYoutubeLink
} from "../../../../variables/index";

import {
    validateYouTubeUrl,
} from '../../../../utils/handleValidate';

import { useTranslation } from 'react-i18next';

import {
    createStreamingApi,
    fetchListAcceptedResolution,
    fetchListUserStreamApi,
    fetchVideoMETAInfoData,
    listStreamingApi
} from '../../../../api/Stream';
import { MESSSAGE_STATUS_CODE } from '../../../../variables';
import ModalAddUrl from '../components/ModalAddUrl';

const steps = [
    { title: 'Chọn video', description: "" },
    { title: 'Cấu hình', description: "" },
    { title: 'Thời gian', description: "" }
];

export default function DetailVideoLivestream(props) {
    const { dataGeneral, displaySubRowState, listServerAgent } = props; 

    const [allUserStream, setAllUserStream] = useState([]);
    
    let timeStart = dataGeneral.started_at.split(" ");
    let timeEnd = dataGeneral.ended_at.split(" ");

    const initialValues = {
        name: dataGeneral.name,
        stream_id: dataGeneral.stream_id,
        agent_id: dataGeneral.agent_id,
        url: dataGeneral.url,
        resolution: dataGeneral.resolution,
        started_at: timeStart[0],
        ended_at: timeEnd[0],
        started_time: timeStart.slice(-1).pop(),
        ended_time: timeEnd.slice(-1).pop(),
    };

    // const ref = useRef()
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(1);
    const [listVideoResolution, setListVideoResolution] = useState();
    const [loadingAddVideo, setLoadingAddVideo] = useState(false);

    const [tableVideoPlaylist, setTableVideoPlaylist] = useState([]);

    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

    const validateSchema = Yup.object().shape({
        name: Yup.string().required(t('content.required_field')),
        stream_id: Yup.string().required(t('content.required_field')),
        agent_id: Yup.string().required(t('content.required_field')),
        url: Yup.string()
            .required(t('content.required_field')),
        resolution: Yup.string().required(t('content.required_field')),
        started_at: Yup.date().required(t('content.required_field')),
        ended_at: Yup.date()
            .required(t('content.required_field'))
            .when('started_at',
                (started_at, schema) => (started_at && schema.min(started_at, t('content.ended_time_bigger_than_started_time')))),
    });

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

    const handleFetchVideoStreamingByStreamID = async (stream_id) => {
        try {
            const responseVideoStream = await listStreamingApi();
            if (responseVideoStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                let resArr = [];
                let groupThumbnail = [];
                responseVideoStream.data.data.items.map(async (item) => {
                    if (item.stream_id == stream_id) {
                        resArr.push(item);
                        groupThumbnail.push(item.video_info.thumbnail);
                    }    
                });
                return { groupVideo: resArr, groupThumbnail };
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
    
    const handleFetchUserStream = async () => {
        try {
            const responseUserStream = await fetchListUserStreamApi();
            if (responseUserStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                const dataResponse = responseUserStream.data.data

                let data = [];
                let listItems = [];
                dataResponse.items.map(item => data.push({
                    'label': item.name,
                    'value': item.id
                }));
                await Promise.all(dataResponse.items.map(async (docs) => {
                    let { groupVideo, groupThumbnail } = await handleFetchVideoStreamingByStreamID(docs.id);
                    return listItems.push({ 
                        ...docs,
                        groupThumbnail: groupThumbnail,
                        groupVideo: groupVideo
                    });
                }));
            }
            return responseUserStream;
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAllUserStream();
        handleFetchVideoResolution();
        handleFetchUserStream();
        setTableVideoPlaylist([{
            action: "remove",
            order: 1,
            video: dataGeneral.video_info
        }]);
        setInputValue("name", dataGeneral.name);
    }, []);

    const handleOpenModal = () => () => {
        onOpen();
    }

    const handleRemoveURLVideo = (cell) => () => {
        let temp = tableVideoPlaylist.filter(obj => obj != tableVideoPlaylist[cell.row.index]);
        setTableVideoPlaylist(temp);
        setInputValue("name", "");
        setInputValue("url", "");
    }
    
    function isIsoDate(str) {
        if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(str)) { return true; } else { return false; }   
    }

    const handleOnSubmitFormEditStream = async (values, { resetForm }) => {
        try {
            Object.keys(values).forEach((item) => {
                if (item == 'started_at' || item == 'ended_at') {
                    if (isIsoDate(values[item])) values[item] = values[item].replace('T', ' ').replace('Z', '')
                }
            });

            const response = await createStreamingApi(values);
            if (response.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(MESSSAGE_STATUS_CODE.SUCCESS.message)
                await handleFetchUserStream();
            }
            resetForm();
            onCloseVideoStreamModal();
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            // resetForm();
        }
    };

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

    const handleGoBackStep = () => {
        setActiveStep(activeStep - 1);
    }

    const handleNextStep = () => {
        setActiveStep(activeStep + 1)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: handleOnSubmitFormEditStream,
    });

    const setInputValue = useCallback(
        (key, value) => {
            formik.setValues({ ...formik.values, [key]: value });
        }, [formik]
    );

    
    const renderStepContent = (step) => {
        switch (step) {
          case 1:
            return (
                <InputVideoStep
                    isEdit={true}
                    columnsData={columnsInsertVideoStream}
                    tableData={tableVideoPlaylist}
                    handleRemoveURLVideo={handleRemoveURLVideo}
                    handleOpenModal={handleOpenModal}
                    setInputValue={setInputValue}
                    formik={formik}
                />
            );
          case 2:
            return (
                <ConfigureStreamStep
                    isEdit={true}
                    allUserStream={allUserStream}
                    listServerAgent={listServerAgent}
                    listVideoResolution={listVideoResolution}
                    setInputValue={setInputValue}
                    formik={formik}
                    displaySubRowState={displaySubRowState}
                />
            );
          case 3:
            return (
                <FinalStep
                    isEdit={true}
                    setInputValue={setInputValue}
                    formik={formik}
                />
            );
          default:
            return (
                <Center h="120px">
                    <Text fontSize="lg" gutterBottom>
                        Chi tiết video
                    </Text>
                </Center>
            );
        }
    }

    const formUpdateStream = (
        <form onSubmit={formik.handleSubmit}>
            { renderStepContent(activeStep)}
            <ButtonGroup mt="2%" w="100%">
                <Flex w="100%" justifyContent="flex-end" alignItems="right">
                    {
                        activeStep === 1 || (
                            <Button
                                onClick={() => handleGoBackStep()}
                                isDisabled={
                                    activeStep === 1
                                }
                                colorScheme="blue"
                                variant="outline"
                                w="7rem"
                                mr="1%">
                                Quay lại
                            </Button>
                        )
                    }
                    {
                        activeStep === 3 || (
                            <Button
                                w="7rem"
                                // isDisabled={
                                //     Object.keys(formik.errors)
                                // }
                                onClick={() => handleNextStep()}
                                colorScheme="blue"
                                variant="brand">
                                Tiếp theo
                            </Button>
                        )
                    }
                </Flex>
            </ButtonGroup>
        </form>
    );

    const modalContent = (
        <>
            <ModalAddUrl
                isOpen={isOpen}
                onClose={onClose}
                handleAddURLVideo={handleAddURLVideo}
                loadingAddVideo={loadingAddVideo}
                setInputValue={setInputValue}
                formik={formik}
            />
            <Card py='15px'>
                <Stepper index={activeStep}>
                    {steps.map((activeStep, index) => (
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
                {formUpdateStream}
            </Card>
        </>
    )

    return (
        <>
            {modalContent}
        </>
    )
}
