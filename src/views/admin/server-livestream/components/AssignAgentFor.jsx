/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react'
import {
    Button,
    FormLabel,
    FormControl,
    Select
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import { useFormik } from "formik";

import { toast } from 'react-toastify';

import Card from "../../../../components/card/Card";

import {
    assignAgentServerForUser,
    unAssignAgentServerForUser
} from '../../../../api/Stream';

import { MESSSAGE_STATUS_CODE } from '../../../../variables';
import { fetchAdminListUser } from '../../../../api/Auth';

export default function AssignAgentFor(props) {
    const { dataGeneral, handleFetchResource, onClose } = props;

    const [listAdmin, setListAdmin] = useState([]);
    const [loading, setLoading] = useState(false);

    const initialValues = {
        user_id: dataGeneral?.user_obj?.id,
    }

    const { t } = useTranslation();

    const validateSchema = Yup.object().shape({
        user_id: Yup.string().required(t('content.required_field')),
    });

    const fetchAdminListUserFunc = async () => {
        try {
            const responseEdit = await fetchAdminListUser({
                limit: 1000
            });
            if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                setListAdmin(responseEdit.data.data.users.map(item => {
                    return {
                        label: item.fullname,
                        value: item.id
                    }
                }));
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

    useEffect(() => {
        fetchAdminListUserFunc();
    }, []);

    const assignAgentServerForNewUser = async (values, resetForm) => {
        const responseEdit = await assignAgentServerForUser({ id: dataGeneral.id, ...values});
        if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
            await handleFetchResource({});
            resetForm();
            onClose();
        }
    }

    const unassignAgentServerOut = async (values, resetForm) => {
        const responseEdit = await unAssignAgentServerForUser({ id: dataGeneral.id, user_id: values});
        if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
            await handleFetchResource({});
            resetForm();
            onClose();
        }
    }

    const handleOnSubmitFormAssign = async (values, { resetForm }) => {
        setLoading(true);
        try {
            if (!dataGeneral?.user_obj?.id) {
                // console.log('---- assign user mới ---', { id: dataGeneral.id, ...values});
                await assignAgentServerForNewUser(values, resetForm);
            } else if (values.user_id === dataGeneral?.user_obj?.id) {
                // console.log('---- assign user cũ ---', { id: dataGeneral.id, ...values});
                await unassignAgentServerOut(dataGeneral?.user_obj?.id, resetForm);
                // toast.error(`${dataGeneral?.user_obj?.fullname} đã được gán`)
            } else {
                console.log('---- thay thế assign user ---', { id: dataGeneral.id, ...values});
                // await Promise.all(
                //     await unassignAgentServerOut(dataGeneral?.user_obj?.id),
                //     await assignAgentServerForNewUser(values, resetForm)
                // )
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: handleOnSubmitFormAssign,
    });

    const setInputValue = useCallback(
        (key, value) => {
            formik.setValues({ ...formik.values, [key]: value });
        }, [formik]
    );


    return (
        <form onSubmit={formik.handleSubmit} >
            <Card mb={{ base: "0px", lg: "20px" }} px="20px" pb="10px" align='center'>
                <FormControl align="right" mb="20px">
                    <FormLabel
                        fontSize="md"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Quản trị viên:
                    </FormLabel>
                    <Select
                        name="user_id"
                        value={formik.values.user_id}
                        onChange={(e) => setInputValue("user_id", e.target.value)}
                        autoComplete="user_id"
                        placeholder="--- Chọn tên ---"
                        _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                        _placeholder={{ color: "gray.400" }}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        isDisabled={dataGeneral?.user_obj?.id}
                        size="md"
                        w="full"
                        rounded="md">
                        {listAdmin.map((item, id) => {
                            return (<option id={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </Select>
                    {formik.errors.user_id && formik.touched.user_id && (
                        <p className="text-error">{formik.errors.user_id}</p>
                    )}
                </FormControl>
                <Button
                    isLoading={loading}
                    loadingText="Đang gán"
                    _hover={{  bg: "blue"  }}
                    mt={{ base: "20px", "2xl": "auto" }}
                    variant='brand'
                    type="submit"
                    fontWeight='500'>
                    {
                        dataGeneral?.user_obj?.id ? 'Hủy gán' : 'Gán mới'
                    }
                </Button>
            </Card>
        </form>
    )
}
