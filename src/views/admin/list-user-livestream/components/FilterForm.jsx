/* eslint-disable */
import {
    useColorModeValue,
    FormLabel,
    FormControl
} from '@chakra-ui/react';

import React from "react"
import { SearchBar } from '../../../../components/searchBar/SearchBar';

export default function FormFilterCustom(props) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { onSearch, filter } = props;

    return (
        <FormControl align="right" mb="20px">
            <FormLabel
                htmlFor="stream_id"
                fontSize="xs"
                fontWeight="md"
                color="gray.700"
                _dark={{
                    color: 'gray.50',
                }}>
                Tìm kiếm key:
            </FormLabel>
            <SearchBar
                name="keyword"
                mb={{ base: '10px', md: 'unset' }}
                me="10px" 
                data={filter.keyword}
                onSearch={(value) => onSearch(value)}
            />
        </FormControl>
    );
}
