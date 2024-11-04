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
    FormHelperText
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import { setIn, useFormik } from "formik";

import { toast } from 'react-toastify';

import Card from "../../../../components/card/Card";

import {
    converter_ISO8601_To_YYYYMMDDHHMMSS,
} from '../../../../utils/handleValidate';

import { updateUserStream } from '../../../../api/Stream';
import { MESSSAGE_STATUS_CODE } from '../../../../variables';
import { RiEyeCloseLine } from 'react-icons/ri';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

export default function EditUserStream(props) {
    const { dataGeneral, handleFetchResource, onCloseUserStream } = props;

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const textColorSecondary = "gray.400";

    const initialValues = {
        name: dataGeneral?.name,
        description: dataGeneral?.description,
        key: dataGeneral?.key,
        channel_id: dataGeneral?.channel_id,
    }

    const { t } = useTranslation();

    const validateSchema = Yup.object().shape({
        name: Yup.string().required(t('content.required_field')),
        description: Yup.string().required(t('content.required_field')),
        key: Yup.string().required(t('content.required_field')),
        channel_id: Yup.string().required(t('content.required_field'))
    });

    const handleOnSubmitFormEdit = async (values, { resetForm }) => {
        try {

            const responseEdit = await updateUserStream({ ...values, id: dataGeneral.id });
            if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                await handleFetchResource({});
                resetForm();
                onCloseUserStream();
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
            if ((key == 'started_at' || key == 'ended_at')) {
                formik.setValues({ ...formik.values, [key]: converter_ISO8601_To_YYYYMMDDHHMMSS(value) });
            } else { formik.setValues({ ...formik.values, [key]: value }); }
        }, [formik]
    );

    return (
        <form onSubmit={formik.handleSubmit} >
            <Card p={0} align='center'>
                <FormControl mb="15px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Tên luồng<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        name="name"
                        value={formik.values.name}
                        onChange={(e) => setInputValue("name", e.target.value)}
                        isRequired={true}
                        fontSize='sm'
                        size='lg'
                    />
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
                        Mô tả luồng<Text color={brandStars}>*</Text>
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
                <FormControl mb="15px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'
                    >
                        Channel ID<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        name="channel_id"
                        value={formik.values.channel_id}
                        onChange={(e) => setInputValue("channel_id", e.target.value)}
                        isRequired={true}
                        placeholder='ID của channel youtube'
                        fontSize='sm'
                        size='lg'
                    />
                    {formik.errors.channel_id && formik.touched.channel_id && (
                        <p className="text-error">{formik.errors.channel_id}</p>
                    )}
                    <FormHelperText fontSize='sm' color='gray.500' textAlign={'left'}>
                        Sử dụng để kiểm tra trạng thái livestream của video youtube
                    </FormHelperText>
                </FormControl>
                <FormControl mb="15px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Mã livestream<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size='md'>
                        <Input
                            name="key"
                            value={formik.values.key}
                            onChange={(e) => setInputValue("key", e.target.value)}
                            isRequired={true}
                            fontSize='sm'
                            placeholder='Min. 8 characters'
                            size='lg'
                            type={show ? "text" : "password"}
                            variant='auth'
                        />
                        <InputRightElement display='flex' alignItems='center' mt='4px'>
                            <Icon
                                color={textColorSecondary}
                                _hover={{ cursor: "pointer" }}
                                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                onClick={handleClick}
                            />
                        </InputRightElement>
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
