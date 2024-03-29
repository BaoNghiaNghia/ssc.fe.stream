/* eslint-disable */
import {
    Flex,
    Table,
    Checkbox,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Badge,
    SimpleGrid,
    Button,
    Icon,
    FormControl,
    Spinner,
    Grid,
    GridItem,
    Avatar,
    AvatarGroup,
    FormLabel,
    Select
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";

const displayTypeChildTable = [
    {
        label: 'Video Stream - Dạng bảng',
        value: 'table-video'
    },
    {
        label: 'Luồng phát - Dạng bảng',
        value: 'table-thread'
    },
    {
        label: 'Luồng phát - Dạng thẻ',
        value: 'card-thread'
    },
]

export default function FilterHeader(props) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const {
        title,
        handleOpenFilterModal,
        activeFilter
    } = props;

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(10, 1fr)'
            gap={4}
            mb={4}
        >
            <GridItem colSpan={9} margin="auto 0">
                <FormControl>
                    <Text
                        color={textColor}
                        fontSize='lg'
                        fontWeight='700'
                        mb="5px"
                        ml="20px"
                        lineHeight='100%'>
                        {title}
                    </Text>
                </FormControl>
            </GridItem>
            
            <GridItem colSpan={1} margin="auto 0" align="center">
                <Button 
                    _hover={{ bg: "gray.100" }}
                    size="md"
                    color={activeFilter === true ? "white" : "black"}
                    colorScheme={activeFilter === true ? "green" : "black"}
                    variant="solid"
                    borderRadius='5px'
                    px='10px'
                    w="fit-content"
                    py='20px'
                    onClick={() => {
                        handleOpenFilterModal();
                    }}>
                    <Icon
                        transition='0.2s linear'
                        w='32px'
                        h='32px'
                        pr='10px'
                        as={MdFilterList}
                        color={activeFilter === true ? "white" : "black"}
                    />
                    Bộ lọc
                </Button>
            </GridItem>
        </Grid>
    );
}
