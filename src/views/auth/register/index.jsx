/* eslint-disable */
import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

// Tranlation context API
import { useTranslation } from 'react-i18next';

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Image
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { toast } from 'react-toastify';

// Custom components
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth.png";
import { useAuth } from "../../../contexts/authenContext";
import history from '../../../utils/history';
import { registerUserApi } from "../../../api/Auth/index";
import { MESSSAGE_STATUS_CODE } from "../../../variables";
import logo from '../../../assets/img/logo.svg';

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  confirm_password: ""
}

const Register = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const validateSchema = Yup.object().shape({
    fullname: Yup.string().min(2, t('content.minimum_2_char')),
    email: Yup.string().email(t('content.check_valid_email')).required(t('content.required_field')), 
    password: Yup.string()
      .required(t('content.required_field'))
      .min(8, t('content.check_number_character'))
      // .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, t('content.check_number_password'))
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, t('content.check_special_character_password')),
    confirm_password: Yup.string().when("password", (password, field) => {
      if (password) {
        return field.required(t('content.check_matching_password')).oneOf([Yup.ref("password")], t('content.check_matching_password'));
      }
    }),
  });

  const handleClick = () => setShow(!show);

  const handleRegisterNotification = (data) => {
    if (data.data && data.data.error_code == 0) {
      toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
    } else {
      toast.error(data.data.message);
    }
  }

  const handleOnSubmit = async (values) => {
    let { confirm_password, ...newUser } = values;
    setLoading(true);
    try {
      const response = await registerUserApi(newUser);
      if (response.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
        handleRegisterNotification(response);

        setLoading(false);
        if (response) {
          history.push('#/auth/sign-in');
          window.location.reload()
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response) {
        toast.error(t(`error_code.${err?.response?.data?.error_code}`));
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

  const formLogin = (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel
          display='flex'
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          mb='8px'>
          Họ tên<Text color={brandStars}>*</Text>
        </FormLabel>
        <Input
          name="fullname"
          value={formik.values.fullname}
          onChange={(e) => setInputValue("fullname", e.target.value)}
          isRequired={true}
          variant='auth'
          fontSize='sm'
          ms={{ base: "0px", md: "0px" }}
          type='fullname'
          placeholder='Nguyễn Văn A'
          fontWeight='500'
          size='md'
        />
        {formik.errors.fullname && formik.touched.fullname && (
          <p className="text-error">{formik.errors.fullname}</p>
        )}
        <FormLabel
          display='flex'
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          mt='24px'>
          Email<Text color={brandStars}>*</Text>
        </FormLabel>
        <Input
          name="email"
          value={formik.values.email}
          onChange={(e) => setInputValue("email", e.target.value)}
          isRequired={true}
          variant='auth'
          fontSize='sm'
          ms={{ base: "0px", md: "0px" }}
          type='email'
          placeholder='mail@ssc.com'
          fontWeight='500'
          size='md'
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-error">{formik.errors.email}</p>
        )}
        <FormLabel
          ms='4px'
          mt='24px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          display='flex'>
          Mật khẩu<Text color={brandStars}>*</Text>
        </FormLabel>
        <InputGroup size='md'>
          <Input
            name="password"
            value={formik.values.password || ''}
            onChange={(e) => setInputValue("password", e.target.value)}
            isRequired={true}
            fontSize='sm'
            placeholder='Nhập mật khẩu'
            size='md'
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
        <FormLabel
          ms='4px'
          mt='24px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          display='flex'>
          Nhập lại mật khẩu<Text color={brandStars}>*</Text>
        </FormLabel>
        <InputGroup size='md'>
          <Input
            name="confirm_password"
            value={formik.values.confirm_password || ''}
            onChange={(e) => setInputValue("confirm_password", e.target.value)}
            isRequired={true}
            fontSize='sm'
            placeholder='Nhập lại mật khẩu'
            size='md'
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
        <Button
          type="submit"
          disabled={loading}
          fontSize='sm'
          variant='brand'
          fontWeight='500'
          w='100%'
          h='50'
          my='24px'>
          {loading ? "Chờ chút..." : "Đăng ký"}
        </Button>
      </FormControl>
    </form>
  )

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Image src={logo} h='70px' w='90px' mb='10%' />
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            {t('content.register')}
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Nhập email và mật khẩu của bạn!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          { formLogin }
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Đã có tài khoản?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Đăng nhập
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default Register;
