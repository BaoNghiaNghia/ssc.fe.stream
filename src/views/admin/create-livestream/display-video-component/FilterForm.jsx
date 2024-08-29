/* eslint-disable */
import {
    Grid,
    Icon,
    GridItem,
    FormLabel,
    FormControl,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react';

import React from "react";
import { SearchBar } from '../../../../components/searchBar/SearchBar';
import { MdFeaturedVideo, MdOutlineComputer } from 'react-icons/md';



export default function FormFilterCustom(props) {
    const { onSearch } = props;

    const {
        filter,
        handleChangeStateFilter,
        listFieldVideo,
        statusFieldVideo,
        allUserStream,
        setFilter,
        listServerAgent
    } = props;

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(3, 1fr)'
            gap={4}
        >
            <GridItem colSpan={1}>
                <FormControl align="right" mb="20px">
                    <FormLabel
                        htmlFor="stream_id"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Tìm kiếm tiêu đề:
                    </FormLabel>
                    <SearchBar
                        name="keyword"
                        mb={{ base: '10px', md: 'unset' }}
                        me="10px" 
                        data={filter.keyword}
                        onSearch={(value) => onSearch(value)}
                    />
                </FormControl>
                <FormControl align="right">
                    <FormLabel
                        htmlFor="stream_id"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Số kết quả video:
                    </FormLabel>
                    <NumberInput
                        min={1} max={50}
                        clampValueOnBlur={false}
                        value={filter.limit}
                        onChange={(value) => setFilter(prevState => ({
                            ...prevState,
                            'limit': value
                        }))}
                        variant="flushed"
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
                <FormControl align="right" mb="20px">
                    <FormLabel
                        htmlFor="stream_id"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Sắp xếp:
                    </FormLabel>
                    <Select
                        name="order_by"
                        value={filter.order_by}
                        onChange={handleChangeStateFilter}
                        _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                        focusBorderColor="brand.400"
                        placeholder="Chọn thứ tự"
                        shadow="sm"
                        variant="flushed"
                        size="md"
                        w="full"
                        rounded="md">
                        {listFieldVideo.map((item, id) => {
                            return (<option id={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </Select>
                </FormControl>
                <FormControl align="right">
                    <FormLabel
                        htmlFor="status"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Trạng thái:
                    </FormLabel>
                    <Select
                        name="status"
                        value={filter.status}
                        onChange={handleChangeStateFilter}
                        _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                        focusBorderColor="brand.400"
                        placeholder="Chọn trạng thái"
                        shadow="sm"
                        variant="flushed"
                        size="md"
                        w="full"
                        rounded="md">
                        {statusFieldVideo.map((item, id) => {
                            return (<option id={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
                <FormControl align="right" mb="20px">
                    <FormLabel
                        htmlFor="stream_id"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        <Icon as={MdFeaturedVideo} w='12px' h='12px' mr="5px" />
                        Theo luồng:
                    </FormLabel>
                    <Select
                        name="stream_id"
                        value={filter.stream_id}
                        onChange={handleChangeStateFilter}
                        _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                        focusBorderColor="brand.400"
                        placeholder="Chọn luồng"
                        shadow="sm"
                        variant="flushed"
                        size="md"
                        w="full"
                        rounded="md">
                        {allUserStream.map((item, id) => {
                            return (<option id={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </Select>
                </FormControl>
                <FormControl align="right" mb="20px">
                    <FormLabel
                        htmlFor="agent_id"
                        fontSize="xs"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        <Icon as={MdOutlineComputer} w='12px' h='12px' mr="5px" />
                        Theo server:
                    </FormLabel>
                    <Select
                        name="agent_id"
                        value={filter.agent_id}
                        onChange={handleChangeStateFilter}
                        _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                        focusBorderColor="brand.400"
                        placeholder="Chọn server"
                        shadow="sm"
                        variant="flushed"
                        size="md"
                        w="full"
                        rounded="md">
                        {listServerAgent.map((item, id) => {
                            return (<option id={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </Select>
                </FormControl>
            </GridItem>
        </Grid>
    );
}
