/* eslint-disable */
import React, { useState, useCallback } from 'react'
import {
    Button,
    Icon,
    FormLabel,
    Input,
    FormControl,
    InputGroup,
    InputRightElement,
    GridItem,
    InputLeftAddon,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from 'react-toastify';

import Card from "../../../../components/card/Card";
import { MESSSAGE_STATUS_CODE, ROLE_USER } from '../../../../variables';
import { MdOutlineRemoveRedEye, MdPerson, MdVoicemail } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { registerUserApi } from '../../../../api/Auth';
import { useAuth } from '../../../../contexts/authenContext';
import { getCurrRoleUser, getCurrUserID } from '../../../../utils/handleValidate';

export default function CreateNewUser(props) {
    const { handleFetchResource, onClose} = props;

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClick = () => setShow(!show);
    const textColorSecondary = "gray.400";

    const initialValues = {
        fullname: "",
        email: "",
        password: ""
    }

    const { t } = useTranslation();
    const { profile } = useAuth();

    const validateSchema = Yup.object().shape({
        fullname: Yup.string().required(t('content.required_field')),
        email: Yup.string().required(t('content.required_field')),
        password: Yup.string()
            .required(t('content.required_field'))
            .min(8, t('content.check_number_character'))
            .matches(/\d/, t('content.check_number_password'))
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, t('content.check_special_character_password')),
    });

    const handleOnSubmitFormCreate = async (values, { resetForm }) => {
        setLoading(true);
        try {
            if (getCurrRoleUser(profile) === ROLE_USER.RESELLER) {
                values['referer_id'] = getCurrUserID(profile);
            }
            const responseEdit = await registerUserApi(values);
            if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                await handleFetchResource({});
                resetForm();
                onClose();
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.response) {
                toast.error(t(`error_code.${err?.response?.data?.error_code}`));
            }
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: handleOnSubmitFormCreate,
    });

    const setInputValue = useCallback(
        (key, value) => {
            formik.setValues({ ...formik.values, [key]: value });
        }, [formik]
    );

    return (
        <form onSubmit={formik.handleSubmit} >
            <Card  align='left'>
                <FormControl as={GridItem} colSpan={[6, 3]} mb="3%">
                    <FormLabel
                        htmlFor="fullname"
                        fontSize="md"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Họ tên:
                    </FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={<Icon as={MdPerson} color="gray" w='40px' fontSize='md'
                            size='lg'/>} />
                        <Input
                            placeholder="Nhập họ tên"
                            value={formik.values.fullname}
                            _placeholder={{ color: "gray.400" }}
                            onChange={(e) => setInputValue("fullname", e.target.value)}
                            size="md"
                        />
                    </InputGroup>
                    {formik.errors.fullname && formik.touched.fullname && (
                        <p className="text-error">{formik.errors.fullname}</p>
                    )}
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]} mb="3%">
                    <FormLabel
                        htmlFor="email"
                        fontSize="md"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Email:
                    </FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={<Icon as={MdVoicemail} color="gray" w='40px' fontSize='md'
                            size='lg'/>} />
                        <Input
                            placeholder="Nhập email"
                            value={formik.values.email}
                            _placeholder={{ color: "gray.400" }}
                            onChange={(e) => setInputValue("email", e.target.value)}
                            size="md"
                        />
                    </InputGroup>
                    {formik.errors.email && formik.touched.email && (
                        <p className="text-error">{formik.errors.email}</p>
                    )}
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]} mb="5%">
                    <FormLabel
                        htmlFor="password"
                        fontSize="md"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Mật khẩu:
                    </FormLabel>
                    <InputGroup size='md'>
                        <Input
                            name="password"
                            value={formik.values.password || ''}
                            onChange={(e) => setInputValue("password", e.target.value)}
                            isRequired={true}
                            fontSize='sm'
                            placeholder='Nhập mật khẩu'
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
                    {formik.errors.password && formik.touched.password && (
                        <p className="text-error">{formik.errors.password}</p>
                    )}
                </FormControl>
                
                <Button
                    isLoading={loading}
                    loadingText='Chờ chút'
                    mt={{ base: "20px", "2xl": "auto" }}
                    variant='brand'
                    type="submit"
                    fontWeight='500'>
                    Xác nhận
                </Button>
            </Card>
        </form>
    )
}
