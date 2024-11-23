/* eslint-disable */
import React, { useCallback } from 'react'
import {
    Button,
    useColorModeValue,
    FormLabel,
    Input,
    FormControl,
    InputGroup,
    Switch,
    Grid,
    GridItem,
    InputLeftElement
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from 'react-toastify';

import Card from "../../../../components/card/Card";

import {
    updateAgentServerStream,
} from '../../../../api/Stream';
import { MESSSAGE_STATUS_CODE } from '../../../../variables';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { updateGoogleKeyAPI } from '../../../../api/GoogleKey';

export default function EditGoogleKey(props) {
    const { dataGeneral, handleFetchResource, onClose } = props;
    const textColor = useColorModeValue("navy.700", "white");

    const initialValues = {
        email: dataGeneral?.email,
        key: dataGeneral?.key,
        status: dataGeneral?.status
    };

    const { t } = useTranslation();

    const validateSchema = Yup.object().shape({
        email: Yup.string().email(t('content.invalid_email')).required(t('content.required_field')),
        key: Yup.string().required(t('content.required_field')),
        status: Yup.bool().required(t('content.required_field')),
    });

    const handleOnSubmitFormEdit = async (values, { resetForm }) => {
        try {
            const responseEdit = await updateGoogleKeyAPI({ ...values, id: dataGeneral.id });
            if (responseEdit?.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                await handleFetchResource({});
                resetForm();
                onClose();
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err?.response?.data?.error_code}`));
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
            <Card>
                <Grid
                    margin="auto 0"
                    templateRows='1fr'
                    templateColumns='repeat(8, 1fr)'
                    gap={4}
                    mb={4}>
                    <GridItem colSpan={6}>
                        <FormControl mb="15px" isInvalid={formik.errors.email && formik.touched.email}>
                            <FormLabel
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Email
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" style={{ fontSize: '20px', top: '4px' }} children={<EmailIcon color="gray.300" />} />
                                <Input
                                    name="email"
                                    placeholder="Nhập vào email"
                                    value={formik.values.email}
                                    onChange={(e) => setInputValue("email", e.target.value)}
                                    fontSize='sm'
                                    size='lg'
                                />
                            </InputGroup>
                            {formik.errors.email && formik.touched.email && (
                                <p className="text-error">{formik.errors.email}</p>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl mb="15px" isInvalid={formik.errors.status && formik.touched.status}>
                            <FormLabel
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}>
                                Trạng thái
                            </FormLabel>
                            <Switch
                                isChecked={formik.values.status}
                                size="lg"
                                onChange={(e) => setInputValue("status", e.target.checked)}
                            />
                            {formik.errors.status && formik.touched.status && (
                                <p className="text-error">{formik.errors.status}</p>
                            )}
                        </FormControl>
                    </GridItem>
                </Grid>
                <FormControl mb="15px" isInvalid={formik.errors.key && formik.touched.key}>
                    <FormLabel
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Google Key
                    </FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" style={{ fontSize: '20px', top: '3px' }} children={<LockIcon color="gray.300" />} />
                        <Input
                            name="key"
                            placeholder="Nhập vào google key"
                            value={formik.values.key}
                            onChange={(e) => setInputValue("key", e.target.value)}
                            fontSize='sm'
                            size='lg'
                        />
                    </InputGroup>
                    {formik.errors.key && formik.touched.key && (
                        <p className="text-error">{formik.errors.key}</p>
                    )}
                </FormControl>
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
