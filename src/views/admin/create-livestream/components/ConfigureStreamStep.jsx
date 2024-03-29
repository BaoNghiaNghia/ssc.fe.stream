/* eslint-disable */
import React, { useState } from 'react'
import {
    Heading,
    FormControl,
    GridItem,
    FormLabel,
    Select,
    useColorModeValue,
    Badge
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import { validateYouTubeUrl } from '../../../../utils/handleValidate';
import { VIDEO_RESOLUTION_DEFAULT } from '../../../../variables';

const ConfigureStreamStep = (props) => {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");

    const { t } = useTranslation();

    const { 
        listVideoResolution,
        formik,
        setInputValue,
        isEdit,
        allUserStream,
        displaySubRowState,
        listServerAgent
    } = props;

    const checkYoutubeLink = validateYouTubeUrl(formik.values.url);

    console.log('---- formik nè ----',  (isEdit || false) && !checkYoutubeLink);

    return (
        <>
            <Heading color={textColor} fontSize='20px' my='20px'>
                Cấu hình
            </Heading>

            <FormControl as={GridItem} colSpan={[6, 3]} mb="3%">
                <FormLabel
                    htmlFor="agent_id"
                    fontSize="md"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Chọn server:
                </FormLabel>
                <Select
                    id="agent_id"
                    name="agent_id"
                    isDisabled={isEdit || false}
                    // isDisabled={displaySubRowState === "table-video" || displaySubRowState === "table-thread" ? false : true}
                    value={formik.values.agent_id || ""}
                    onChange={(e) => setInputValue("agent_id", e.target.value)}
                    autoComplete="agent_id"
                    placeholder="--- Chọn server ---"
                    _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                    _placeholder={{ color: "gray.400" }}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="md"
                    w="full"
                    rounded="md">
                    { listServerAgent.map((item, id) => {
                        return ( <option id={item.value} value={item.value}>{item.label}</option> )
                    })}
                </Select>
                {formik.errors.agent_id && formik.touched.agent_id && (
                    <p className="text-error">{formik.errors.agent_id}</p>
                )}
            </FormControl>
            <FormControl as={GridItem} colSpan={[6, 3]} mb="3%">
                <FormLabel
                    htmlFor="stream_id"
                    fontSize="md"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Luồng liên kết:
                </FormLabel>
                <Select
                    id="stream_id"
                    name="stream_id"
                    isDisabled={isEdit || false}
                    // isDisabled={displaySubRowState === "table-video" || displaySubRowState === "table-thread" ? false : true}
                    value={formik.values.stream_id}
                    onChange={(e) => setInputValue("stream_id", e.target.value)}
                    autoComplete="stream_id"
                    placeholder="--- Chọn luồng ---"
                    _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                    _placeholder={{ color: "gray.400" }}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="md"
                    w="full"
                    rounded="md">
                    { allUserStream.map((item, id) => {
                        return ( <option id={item.value} value={item.value}>{item.label}</option> )
                    })}
                </Select>
                {formik.errors.stream_id && formik.touched.stream_id && (
                    <p className="text-error">{formik.errors.stream_id}</p>
                )}
            </FormControl>
            {
                checkYoutubeLink ? (
                    <FormControl as={GridItem} colSpan={[6, 3]} mb="3%">
                        <FormLabel
                            htmlFor="country"
                            fontSize="md"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                                color: 'gray.50',
                            }}>
                            Độ phân giải video:
                        </FormLabel>
                        <Select
                            id="resolution"
                            name="resolution"
                            value={ checkYoutubeLink ? formik.values.resolution : VIDEO_RESOLUTION_DEFAULT['1080p'].name}
                            // value={ formik.values.resolution }
                            isDisabled={checkYoutubeLink ? (isEdit || false) : true}
                            onChange={(e) => setInputValue("resolution", e.target.value)}
                            autoComplete="resolution"
                            _placeholder={{ color: "gray.400" }}
                            isReadOnly
                            placeholder="--- Chọn độ phân giải ---"
                            focusBorderColor="brand.400"
                            shadow="sm"
                            size="md"
                            w="full"
                            rounded="md">
                            { listVideoResolution.map((item, id) => {
                                return ( 
                                    <option id={item.value} value={item.value}>{item.label}</option>
                                )
                            }) }
                        </Select>
                        {formik.errors.resolution && formik.touched.resolution && (
                            <p className="text-error">{formik.errors.resolution}</p>
                        )}
                    </FormControl>
                ) : null
            }
        </>
    )
}

export default ConfigureStreamStep;