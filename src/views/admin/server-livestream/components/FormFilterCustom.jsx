/* eslint-disable */
import {
    Grid,
    GridItem,
    FormLabel,
    FormControl,
    Select,
} from '@chakra-ui/react';

import React from "react";
import { SearchBar } from '../../../../components/searchBar/SearchBar';

export default function FormFilterCustom(props) {
    const { onSearch } = props;

    const {
        filter,
        handleChangeStateFilter,
        listOptionServerAgent,
    } = props;

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(1, 1fr)'
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
                        Tìm theo tên, mô tả:
                    </FormLabel>
                    <SearchBar
                        name="keyword"
                        mb={{ base: '10px', md: 'unset' }}
                        me="10px" 
                        data={filter.keyword}
                        onSearch={(value) => onSearch(value)}
                    />
                </FormControl>
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
                        {listOptionServerAgent.map((item, id) => {
                            return (<option id={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </Select>
                </FormControl>
            </GridItem>
        </Grid>
    );
}
