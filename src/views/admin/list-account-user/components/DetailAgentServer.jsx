/* eslint-disable */
import React, { useState, useCallback } from 'react'
import {
    Icon,
    useColorModeValue,
    FormLabel,
    Input,
    FormControl,
    InputGroup,
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
import { useFormik } from "formik";

import Card from "../../../../components/card/Card";
import { MdComputer } from 'react-icons/md';

export default function DetailAgentServer(props) {
    const { dataGeneral, handleFetchResource, onClose } = props;

    const textColor = useColorModeValue("navy.700", "white");

    const initialValues = {
        name: dataGeneral?.name,
        description: dataGeneral?.description,
        url: dataGeneral?.url,
        max_stream: dataGeneral?.max_stream || 0,
        status: dataGeneral?.status,
    }
    const { t } = useTranslation();

    const validateSchema = Yup.object().shape({
        name: Yup.string().required(t('content.required_field')),
        description: Yup.string().required(t('content.required_field')),
        url: Yup.string().required(t('content.required_field')),
        max_stream: Yup.number().required(t('content.required_field')),
        status: Yup.boolean().required(t('content.required_field'))
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
    });

    const setInputValue = useCallback(
        (key, value) => {
            formik.setValues({ ...formik.values, [key]: value });
        }, [formik]
    );

    return (
        <form onSubmit={formik.handleSubmit} >
            <Card  align='center'>
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
                        readOnly={true}
                        fontSize='sm'
                        size='lg'
                    />
                    {formik.errors.description && formik.touched.description && (
                        <p className="text-error">{formik.errors.description}</p>
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
                        URL:
                    </FormLabel>
                    <Input
                        name="url"
                        value={formik.values.url}
                        onChange={(e) => setInputValue("url", e.target.value)}
                        isRequired={true}
                        readOnly={true}
                        fontSize='sm'
                        size='lg'
                    />
                    {formik.errors.url && formik.touched.url && (
                        <p className="text-error">{formik.errors.url}</p>
                    )}
                </FormControl>
                <Grid
                    margin="auto 0"
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(7, 1fr)'
                    gap={4} mb={4}>
                    <GridItem colSpan={2}>
                        <FormControl align="right">
                            <FormLabel
                                ms='4px'
                                pt="10px"
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}>
                                Luồng tối đa:
                            </FormLabel>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl align="right">
                            <NumberInput
                                min={1} max={200}
                                clampValueOnBlur={false}
                                readOnly={true}
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
                    <GridItem colSpan={2}>
                        <FormControl mb="15px">
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                pt="10px"
                                fontWeight='500'
                                color={textColor}>
                                Trạng thái:
                            </FormLabel>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl mb="15px">
                            <Switch
                                isChecked={formik.values.status}
                                size={"lg"}
                                pt="10px"
                                readOnly={true}
                                onChange={(e) => setInputValue("status", e.target.checked)}
                            />
                            {formik.errors.status && formik.touched.status && (
                                <p className="text-error">{formik.errors.status}</p>
                            )}
                        </FormControl>
                    </GridItem>
                </Grid>
            </Card>
        </form>
    )
}
