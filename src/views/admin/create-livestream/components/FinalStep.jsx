/* eslint-disable */
import React from 'react'
import {
    Heading,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    SimpleGrid,
    useColorModeValue,
    Text,
    Grid
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

import { formatDate } from '../../../../utils/handleValidate';

const FinalStep = (props) => {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");

    const { t } = useTranslation();
    const {
        formik,
        setInputValue,
        isEdit
    } = props;

    return (
        <>
            <Heading color={textColor} fontSize='20px' my='20px'>
                Thời gian
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Thời gian bắt đầu:
                    </FormLabel>
                    <Grid
                        my="5px"
                        templateRows='repeat(1, 1fr)'
                        templateColumns='repeat(2, 1fr)'
                        gap={4}
                        >
                        <GridItem colSpan={1}>
                            <Input
                                placeholder="Select Date and Time"
                                isReadOnly={isEdit || false}
                                value={formik.values.started_at}
                                _placeholder={{ color: "gray.400" }}
                                onChange={(e) => setInputValue("started_at", e.target.value)}
                                size="md"
                                type="date"
                            />
                            {formik.errors.started_at && formik.touched.started_at && (
                                <p className="text-error">{formik.errors.started_at}</p>
                            )}
                        </GridItem>
                        <GridItem colSpan={1}>
                            <input
                                className="appearance-none px-6 py-5 focus:outline-none"
                                pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                type="time"
                                value={formik.values.started_time}
                                _placeholder={{ color: "gray.400" }}
                                disabled={isEdit || false}
                                onChange={(e) => setInputValue("started_time", e.target.value)}
                                // pattern="[0-9]{2}:[0-9]{2}"
                                style={{ padding: "7px 20px", border: "1px solid #e1e1e1", borderRadius: "8px", width: "100%"  }}
                                minLength={5}
                                maxLength={5}
                                locale="sv-sv"
                            />
                            <Text>    
                                {formik.errors.started_time && formik.touched.started_time && (
                                    <p className="text-error">{formik.errors.started_time}</p>
                                )}
                            </Text>
                        </GridItem>
                    </Grid>
                    <Text mt="8px"color="gray" fontSize="xs" size="xs">Ngày: <strong>{formik.values.started_at && formatDate(formik.values.started_at) || '...'}</strong> - Giờ: <strong>{formik.values.started_time || '...'}</strong></Text>
                </FormControl>

                <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Thời gian kết thúc:
                    </FormLabel>
                    <Grid
                        my="5px"
                        templateRows='repeat(1, 1fr)'
                        templateColumns='repeat(2, 1fr)'
                        gap={4}
                        >
                        <GridItem colSpan={1}>
                            <Input
                                placeholder="Select Date and Time"
                                value={formik.values.ended_at}
                                isReadOnly={isEdit || false}
                                onChange={(e) => setInputValue("ended_at", e.target.value)}
                                size="md"
                                type="date"
                            />
                            {formik.errors.ended_at && formik.touched.ended_at && (
                                <p className="text-error">{formik.errors.ended_at}</p>
                            )}
                        </GridItem>
                        <GridItem colSpan={1}>
                            <input
                                className="input-time-custom appearance-none focus:outline-none"
                                {...props}
                                type="time"
                                disabled={isEdit || false}
                                value={formik.values.ended_time}
                                _placeholder={{ color: "gray.400" }}
                                onChange={(e) => setInputValue("ended_time", e.target.value)}
                                style={{ padding: "7px 20px", border: "1px solid #e1e1e1", borderRadius: "8px", width:"100%" }}
                                pattern="[0-9]{2}:[0-9]{2}"
                                minLength={5}
                                maxLength={5}
                            />
                            {formik.errors.ended_time && formik.touched.ended_time && (
                                <p className="text-error">{formik.errors.ended_time}</p>
                            )}
                        </GridItem>
                    </Grid>
                    <Text mt="8px"color="gray" fontSize="xs" size="xs">Ngày: <strong>{formik.values.ended_at && formatDate(formik.values.ended_at) || '...'}</strong> - Giờ: <strong>{formik.values.ended_time || '...'}</strong></Text>
                </FormControl>
            </SimpleGrid>
        </>
    )
}

export default FinalStep;