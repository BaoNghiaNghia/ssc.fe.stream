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
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

// Custom components
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth.png";
import { useAuth } from "../../../contexts/authenContext";
import history from '../../../utils/history';
import { updatePasswordUser } from '../../../api/Auth/index';
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: ""
}

const ForgotPassword = () => {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setProfile, setToken } = useAuth();

  const { t } = useTranslation();

  const validateSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
  });

  const handleClick = () => setShow(!show);

  const handleOnSubmit = async (values) => {
    try {
      const response = await updatePasswordUser(values);
  
      let {id, ...rest} = response.user;
      setToken(response.token);
      setProfile(JSON.stringify(rest));
      history.push('#/admin');
    } catch (err) {
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
          value={formik.values.username}
          onChange={(e) => setInputValue("email", e.target.value)}
          isRequired={true}
          variant='auth'
          fontSize='sm'
          ms={{ base: "0px", md: "0px" }}
          type='email'
          placeholder='mail@simmmple.com'
          fontWeight='500'
          size='lg'
        />
        {formik.errors.email && formik.touched && (
          <p className="text-error">{formik.errors.email}</p>
        )}
        <Button
          type="submit"
          // disabled={!formik.isValid}
          fontSize='sm'
          variant='brand'
          fontWeight='500'
          w='100%'
          h='50'
          my='24px'>
          Đổi mật khẩu
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
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Đổi mật khẩu
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Nhập email bạn thường dùng
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

export default ForgotPassword;
