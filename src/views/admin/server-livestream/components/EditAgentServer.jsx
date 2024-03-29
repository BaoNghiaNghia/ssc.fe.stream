/* eslint-disable */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
    Button,
    Text,
    Icon,
    useOutsideClick,
    useColorModeValue,
    FormLabel,
    Input,
    FormControl,
    InputGroup,
    InputRightElement,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Switch,
    Grid,
    GridItem,
    InputLeftAddon
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import { setIn, useFormik } from "formik";

import { toast } from 'react-toastify';

import Card from "../../../../components/card/Card";

import {
    converter_ISO8601_To_YYYYMMDDHHMMSS, truncate,
} from '../../../../utils/handleValidate';

import {
    updateAgentServerStream,
    updateUserStream,
} from '../../../../api/Stream';
import { MESSSAGE_STATUS_CODE } from '../../../../variables';
import { RiEyeCloseLine } from 'react-icons/ri';
import { MdComputer, MdOutlineRemoveRedEye } from 'react-icons/md';

export default function EditAgentServer(props) {
    const { dataGeneral, handleFetchResource, onClose } = props;

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const textColorSecondary = "gray.400";

    const initialValues = {
        name: dataGeneral?.name,
        url: dataGeneral?.url,
        max_stream: dataGeneral?.max_stream || 0,
        status: dataGeneral?.status,
        expired_at: dataGeneral?.expired_at && dataGeneral?.expired_at.split(" ")[0],
        description: dataGeneral?.description
    }
    const { t } = useTranslation();

    const validateSchema = Yup.object().shape({
        name: Yup.string().required(t('content.required_field')),
        description: Yup.string().required(t('content.required_field')),
        url: Yup.string().required(t('content.required_field')),
        expired_at: Yup.date().required(t('content.required_field')),
        max_stream: Yup.number().required(t('content.required_field')),
        status: Yup.boolean().required(t('content.required_field'))
    });

    const handleOnSubmitFormEdit = async (values, { resetForm }) => {
        try {
            let { expired_at, ...rest } = values;
            rest.expired_at = expired_at + " 00:00:00";

            const responseEdit = await updateAgentServerStream({ ...rest, id: dataGeneral.id });
            if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                await handleFetchResource({});
                resetForm();
                onClose();
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: handleOnSubmitFormEdit,
    });

    const setInputValue = useCallback(
        (key, value) => {
            formik.setValues({ ...formik.values, [key]: value });
        }, [formik]
    );

    return (
        <form onSubmit={formik.handleSubmit} >
            <Card mb={{ base: "0px", lg: "20px" }} px="20px" py="20px" align='center'>
                <FormControl mb="15px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Tên server:
                    </FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={<Icon as={MdComputer} color="gray" w='20px' fontSize='sm'
                            size='lg'/>} />
                        <Input
                            name="name"
                            value={formik.values.name}
                            onChange={(e) => setInputValue("name", e.target.value)}
                            isRequired={true}
                            fontSize='sm'
                        />
                    </InputGroup>
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-error">{formik.errors.name}</p>
                    )}
                </FormControl>
                <FormControl mb="15px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Mô tả:
                    </FormLabel>
                    <Input
                        name="description"
                        value={formik.values.description}
                        onChange={(e) => setInputValue("description", e.target.value)}
                        isRequired={true}
                        fontSize='sm'
                        size='lg'
                    />
                    {formik.errors.description && formik.touched.description && (
                        <p className="text-error">{formik.errors.description}</p>
                    )}
                </FormControl>
                <FormControl mb="20px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        URL:
                    </FormLabel>
                    <Input
                        name="url"
                        value={formik.values.url}
                        onChange={(e) => setInputValue("url", e.target.value)}
                        isRequired={true}
                        fontSize='sm'
                        size='lg'
                    />
                    {formik.errors.url && formik.touched.url && (
                        <p className="text-error">{formik.errors.url}</p>
                    )}
                </FormControl>
                <Grid
                    mb="25px"
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(3, 1fr)'
                    gap={4}>
                    <GridItem colSpan={1}>
                        <FormControl as={GridItem} colSpan={[6, 3]} align="left">
                            <FormLabel
                                fontSize="sm"
                                fontWeight="md"
                                color="gray.700"
                                _dark={{
                                    color: 'gray.50',
                                }}>
                                Hết hạn:
                            </FormLabel>
                            <Input
                                placeholder="Select Date and Time"
                                value={formik.values.expired_at}
                                _placeholder={{ color: "gray.400" }}
                                onChange={(e) => setInputValue("expired_at", e.target.value)}
                                size="md"
                                type="date"
                            />
                            {formik.errors.expired_at && formik.touched.expired_at && (
                                <p className="text-error">{formik.errors.expired_at}</p>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl align="right">
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}>
                                Luồng tối đa:
                            </FormLabel>
                            <NumberInput
                                min={1} max={200}
                                size="md"
                                clampValueOnBlur={false}
                                value={formik.values.max_stream}
                                onChange={(e) => setInputValue("max_stream", Number(e))}
                                variant="outline">
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            {formik.errors.max_stream && formik.touched.max_stream && (
                                <p className="text-error">{formik.errors.max_stream}</p>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}>
                                Trạng thái:
                            </FormLabel>
                            <Switch
                                isChecked={formik.values.status}
                                size={"md"}
                                pt="10px"
                                onChange={(e) => setInputValue("status", e.target.checked)}
                            />
                            {formik.errors.status && formik.touched.status && (
                                <p className="text-error">{formik.errors.status}</p>
                            )}
                        </FormControl>
                    </GridItem>
                </Grid>
                <Button
                    mt={{ base: "20px", "2xl": "auto" }}
                    variant='brand'
                    type="submit"
                    fontWeight='500'>
                    Cập nhật
                </Button>
            </Card>
        </form>
    )
}
