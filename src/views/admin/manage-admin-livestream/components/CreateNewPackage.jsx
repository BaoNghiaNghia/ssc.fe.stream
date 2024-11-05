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
    InputLeftAddon,
    Select
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import { setIn, useFormik } from "formik";

import { toast } from 'react-toastify';

import Card from "../../../../components/card/Card";
import { MESSSAGE_STATUS_CODE } from '../../../../variables';
import { MdComputer, MdOutlineFolder, MdPerson, MdPersonPin } from 'react-icons/md';
import { createUserPackageApi, fetchInfoUserPackageApi } from '../../../../api/UserPackage';

export default function CreateNewPackage(props) {
    const { dataGeneral, handleFetchResource, onClose, listAdmin } = props;

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClick = () => setShow(!show);
    const textColor = useColorModeValue("navy.700", "white");

    const [infoPackage, setInfoPackage] = useState([]);

    const initialValues = {
        user_id: "",
        package_name: "",
        package_days: 12,
        stream_number: 100,
    }

    const { t } = useTranslation();

    const validateSchema = Yup.object().shape({
        user_id: Yup.string().required(t('content.required_field')),
        package_name: Yup.string().required(t('content.required_field')),
        package_days: Yup.number().required(t('content.required_field')),
        stream_number: Yup.number().required(t('content.required_field')),
    });

    const handleFetchInfoUserPackageApi = async () => {
        try {
            const responseInfoPackage = await fetchInfoUserPackageApi();
            if (responseInfoPackage.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                let mapPack = Object.entries(responseInfoPackage.data.data).map(([plan, value], index) => {
                    return {
                        label: plan,
                        value: plan
                    }
                });
                setInfoPackage(mapPack);
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

    useEffect(() => {
        handleFetchInfoUserPackageApi();
    }, []);

    const handleOnSubmitFormCreate = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const { package_days, ...rest } = values;
            rest.package_days = package_days*30;
            const responseEdit = await createUserPackageApi({ ...rest });
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
                toast.error(t(`error_code.${err.response.data.error_code}`));
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
            <Card align='left'>
                <FormControl as={GridItem} colSpan={[6, 3]} mb="3%">
                    <FormLabel
                        htmlFor="user_id"
                        fontSize="md"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Chọn người dùng:
                    </FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={<Icon as={MdPerson} color="gray" w='40px' fontSize='md'
                            size='lg'/>} />
                        <Select
                            id="user_id"
                            name="user_id"
                            value={formik.values.user_id || ""}
                            onChange={(e) => setInputValue("user_id", e.target.value)}
                            autoComplete="user_id"
                            placeholder="--- Chọn người dùng  ---"
                            _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                            _placeholder={{ color: "gray.400" }}
                            focusBorderColor="brand.400"
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md">
                            { listAdmin.map((item, id) => {
                                return ( <option id={item.value} value={item.value}>{item.label}</option> )
                            })}
                        </Select>
                    </InputGroup>
                    {formik.errors.user_id && formik.touched.user_id && (
                        <p className="text-error">{formik.errors.user_id}</p>
                    )}
                </FormControl>
                <FormControl as={GridItem} colSpan={[6, 3]} mb="5%">
                    <FormLabel
                        htmlFor="package_name"
                        fontSize="md"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Chọn loại:
                    </FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={<Icon as={MdOutlineFolder} color="gray" w='40px' fontSize='md'
                            size='lg'/>} />
                        <Select
                            id="package_name"
                            name="package_name"
                            value={formik.values.package_name || ""}
                            onChange={(e) => setInputValue("package_name", e.target.value)}
                            autoComplete="package_name"
                            placeholder="--- Chọn loại  ---"
                            _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                            _placeholder={{ color: "gray.400" }}
                            focusBorderColor="brand.400"
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md">
                            { infoPackage.map((item, id) => {
                                return ( <option id={item.value} value={item.value}>{item.label}</option> )
                            })}
                        </Select>
                    </InputGroup>
                    {formik.errors.package_name && formik.touched.package_name && (
                        <p className="text-error">{formik.errors.package_name}</p>
                    )}
                </FormControl>
                <Grid
                    margin="auto 0"
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(8, 1fr)'
                    gap={4} mb={4}>
                    <GridItem colSpan={2}>
                        <FormControl align="right">
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}>
                                Thời hạn
                                (tháng)
                            </FormLabel>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl align="right">
                            <NumberInput
                                min={1} max={200}
                                clampValueOnBlur={false}
                                value={formik.values.package_days}
                                onChange={(e) => setInputValue("package_days", Number(e))}
                                variant="outline">
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            {formik.errors.package_days && formik.touched.package_days && (
                                <p className="text-error">{formik.errors.package_days}</p>
                            )}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl align="right">
                            <FormLabel
                                ms='4px'
                                pt="10px"
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}>
                                Số luồng:
                            </FormLabel>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl align="right">
                            <NumberInput
                                min={1} max={200}
                                clampValueOnBlur={false}
                                value={formik.values.stream_number}
                                onChange={(e) => setInputValue("stream_number", Number(e))}
                                variant="outline">
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            {formik.errors.stream_number && formik.touched.stream_number && (
                                <p className="text-error">{formik.errors.stream_number}</p>
                            )}
                        </FormControl>
                    </GridItem>
                    
                </Grid>
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
