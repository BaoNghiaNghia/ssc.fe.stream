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
    Tooltip,
    Select
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import UseAnimations from "react-useanimations";
import alertOctagon from 'react-useanimations/lib/alertOctagon';

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
        setDisplaySubRowState,
        handleOpenFilterModal,
        handleOpenModalCreateStream,
        activeFilter,
        displaySubRowState } = props;

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(12, 1fr)'
            gap={4} mb={4} px={2}
        >
            <GridItem colSpan={7} margin="auto 0">
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
            <GridItem colSpan={2} margin="auto 0">
                <FormControl align="right">
                    <Select
                        value={displaySubRowState}
                        onChange={(e) => {
                            console.log('--- target nè ----', e.target.value)
                            setDisplaySubRowState(e.target.value)
                        }}
                        _placeholderShown={{ color: 'gray.100', bg: 'gray.100' }}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        isDisabled={true}
                        variant="flushed"
                        size="sm"
                        w="full"
                        rounded="md">
                        {displayTypeChildTable.map((item, id) => {
                            return (<option id={item.value} value={item.value}>{item.label}</option>)
                        })}
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1} margin="auto 0" align="center">
                <FormControl>
                    <Button
                        _hover={{ bg: "gray.100" }}
                        size="md"
                        color={"black"}
                        colorScheme='black' 
                        variant='ghost' 
                        borderRadius='5px'
                        px='10px'
                        w="fit-content"
                        onClick={handleOpenModalCreateStream()}
                        py='20px'>
                        <Icon
                            transition='0.2s linear'
                            w='32px'
                            h='32px'
                            pr='10px'
                            as={IoAddCircleOutline}
                            color={"black"}
                        />
                        Thêm Video
                    </Button>
                </FormControl>
            </GridItem>
            <GridItem colSpan={1} align="center">
                <Button 
                    _hover={{ bg: "gray.100" }}
                    size="md"
                    color={"black"}
                    colorScheme={"black"}
                    variant="solid"
                    borderRadius='5px'
                    px='10px'
                    w="fit-content"
                    py='20px'>
                    {/* <Icon
                        transition='0.2s linear'
                        w='32px'
                        h='32px'
                        pr='10px'
                        as={MdFilterList}
                        color={"black"}
                    /> */}
                    <UseAnimations 
                        name="alertOctagon"
                        animation={alertOctagon} size={28}
                        className="animation-icon"
                        fillColor="black"
                        strokeColor="black"
                    />
                    <Tooltip label="Hướng dẫn sử dụng luồng livestream" placement='top'>Hướng dẫn</Tooltip>
                </Button>
            </GridItem>
            <GridItem colSpan={1} align="center">
                <Button 
                    _hover={{ bg: activeFilter === true ? "green" : "gray.100" }}
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
