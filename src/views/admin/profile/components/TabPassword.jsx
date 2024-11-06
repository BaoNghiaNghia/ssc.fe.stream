/* eslint-disable */
// Chakra imports
import React, { useState, useCallback } from "react";
import {
    Button,
    Icon,
    Text,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
    Card,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";

import { useAuth } from "../../../../contexts/authenContext";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";


import * as Yup from "yup";
import { useFormik } from "formik";

// Tranlation context API
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import history from '../../../../utils/history';
import { updatePasswordUser } from "../../../../api/Auth/index";
import { MESSSAGE_STATUS_CODE } from "../../../../variables";
import { _sleep } from "../../../../utils/handleValidate";

const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: ""
}

export default function TabPassword(props) {
    const [formDataProfile, setFormDataProfile] = useState({});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const { profile, setToken } = useAuth();
    // Chakra Color Mode

    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const textColorSecondary = "gray.400";


    const handleClick = () => setShow(!show);

    const { t } = useTranslation();

	const handleLogoutEvent = () => {
		setToken();
		history.push('#/auth/sign-in');
	};

    const validateSchema = Yup.object().shape({
        old_password: Yup.string()
            .required(t('content.required_field'))
            .min(8, t('content.check_number_character'))
            // .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
            .matches(/\d/, t('content.check_number_password'))
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, t('content.check_special_character_password')),
        new_password: Yup.string()
            .required(t('content.required_field'))
            .min(8, t('content.check_number_character'))
            .matches(/\d/, t('content.check_number_password'))
            .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, t('content.check_special_character_password')),
        confirm_password: Yup.string()
            .required(t('content.check_matching_password'))
            .oneOf([Yup.ref("new_password")], t('content.check_matching_password')),
    });

    const handleChangePasswordNotification = (data) => {
        if (data.data && data.data.error_code == 0) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`))
        } else {
            toast.error(data.data.message);
        }
    }
    const handleOnSubmit = async (values) => {
        let { confirm_password, ...newPassword } = values;
        setLoading(true);
        try {
            const response = await updatePasswordUser(newPassword);
            if (response.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                handleChangePasswordNotification(response);
                setLoading(false);
                formik.resetForm();
            }
            await Promise.all(
                _sleep(1000),
                handleLogoutEvent()
            )
        } catch (err) {
            setLoading(false);
            console.log(err);
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: handleOnSubmit,
    });

    const setInputValue = useCallback(
        (key, value) => {
            formik.setValues({
                ...formik.values,
                [key]: value,
            })
        },
        [formik]
    );

    return (
        <form onSubmit={formik.handleSubmit}>
            <Text color="black" align="left" pb="10px">
                Cập nhật mật khẩu:
            </Text>
            <Card align='center' style={{ padding: '10px' }}>
                <FormControl mb="15px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Mật khẩu hiện tại<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size='md'>
                        <Input
                            name="old_password"
                            value={formik.values.old_password.trim() || ''}
                            onChange={(e) => setInputValue("old_password", e.target.value)}
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
                    {formik.errors.old_password && formik.touched.old_password && (
                        <p className="text-error">{formik.errors.old_password}</p>
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
                        Mật khẩu mới<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size='md'>
                        <Input
                            name="new_password"
                            value={formik.values.new_password.trim() || ''}
                            onChange={(e) => setInputValue("new_password", e.target.value)}
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
                    {formik.errors.new_password && formik.touched.new_password && (
                        <p className="text-error">{formik.errors.new_password}</p>
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
                        Nhập lại mật khẩu mới<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size='md'>
                        <Input
                            name="confirm_password"
                            value={formik.values.confirm_password.trim() || ''}
                            onChange={(e) => setInputValue("confirm_password", e.target.value)}
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
                    {formik.errors.confirm_password && formik.touched.confirm_password && (
                        <p className="text-error">{formik.errors.confirm_password}</p>
                    )}
                </FormControl>
                <Button 
                    mt={{ base: "20px", "2xl": "auto" }}
                    variant='brand'
                    isLoading={loading}
                    loadingText={"Chờ chút"}
                    type="submit"
                    fontWeight='500'>
                    Thay đổi
                </Button>
            </Card>
        </form>
    );
}
