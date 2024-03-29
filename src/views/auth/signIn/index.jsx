/* eslint-disable */
import React, { useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

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
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';

// Custom components
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth.png";
import { useAuth } from "../../../contexts/authenContext";
import history from '../../../utils/history';
import { loginUserApi } from '../../../api/Auth/index';
import { MESSSAGE_STATUS_CODE, ROLE_USER } from "../../../variables/index";

import logo from '../../../assets/img/logo.svg';

const initialValues = {
  email: "",
  password: ""
}


const SignIn = () => {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const { t } = useTranslation();

  const validateSchema = Yup.object().shape({
    email: Yup.string().email(t('content.check_valid_email')).required(t('content.required_field')),
    password: Yup.string()
      .required(t('content.required_field'))
      .min(8, t('content.check_number_character'))
      // .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, t('content.check_number_password'))
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, t('content.check_special_character_password')),
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setProfile, setToken } = useAuth();

  const handleClick = () => setShow(!show);

  const handleLoginNotification = (data) => {
    if (data.error_code == 0) {
      toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`))
    } else {
      toast.error(data.message);
    }
  }

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await loginUserApi(values);
      if (response.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
        let dataResponse = response.data.data;
        let {id, ...rest} = dataResponse.user;
        setToken(dataResponse.token);

        setProfile(JSON.stringify({
          plan: 'trail',
          ...rest
        }));

        handleLoginNotification(response.data);

        history.push('/#/admin/home-page');
        window.location.reload();
      }
      setLoading(false);
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
          size='lg'
        />
        {formik.errors.email && formik.touched && (
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
        {formik.errors.password && formik.touched && (
          <p className="text-error">{formik.errors.password}</p>
        )}
        <Flex justifyContent='space-between' align='center' my='24px'>
          <FormControl display='flex' alignItems='center'>
            <Checkbox
              id='remember-login'
              colorScheme='brandScheme'
              me='10px'
            />
            <FormLabel
              htmlFor='remember-login'
              mb='0'
              fontWeight='normal'
              color={textColor}
              fontSize='sm'>
              Giữ tôi luôn đăng nhập
            </FormLabel>
          </FormControl>
          <NavLink to='/auth/forgot-password'>
            <Text
              color={textColorBrand}
              fontSize='sm'
              w='124px'
              fontWeight='500'>
              Quên mật khẩu?
            </Text>
          </NavLink>
        </Flex>
        <Button
          type="submit"
          disabled={loading}
          fontSize='sm'
          variant='brand'
          fontWeight='500'
          w='100%'
          h='50'
          mb='24px'>
          {loading ? "Chờ chút..." : "Đăng nhập"}
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
        <Image src={logo} h='70px' w='100px' mb='20%' />
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Đăng nhập
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Nhập email và mật khẩu của bạn để đăng nhập!
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
              Chưa có tài khoản?
              <NavLink to='/auth/register'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Tạo tài khoản mới
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
