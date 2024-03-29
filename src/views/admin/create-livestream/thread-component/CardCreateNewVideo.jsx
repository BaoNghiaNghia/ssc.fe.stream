/* eslint-disable */
// Chakra imports
import {
    Button,
    Flex,
    Icon
} from "@chakra-ui/react";
// Assets
import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import background from '../../../../assets/img/video-youtube.png'

export default function CardCreateNewVideo(props) {
    const { idUserStream, handleOpenModalCreateStream } = props;
    return (
        <Flex 
            direction={{ base: "column" }} 
            p='0px'
            justify='center'
            alignContent="center"
            backgroundImage={background}
            backgroundSize="contain"
            align={'center'}
            border="2px solid #e8f3ff"
            borderRadius="10px"
            minH="300px"
        >
            <Button
                variant='solid'
                bgColor="blue.500"
                _hover={{ bg: "blue.700" }}
                size="sm"
                fontSize='sm'
                color={"white"}
                fontWeight='500'
                borderRadius='10px'
                px='10px'
                w="fit-content"
                onClick={handleOpenModalCreateStream(idUserStream)}
                py='20px'>
                <Icon
                    transition='0.2s linear'
                    w='35px'
                    h='35px'
                    pr='10px'
                    as={IoAddCircleOutline}
                    color={"white"}
                />
                Thêm Video
            </Button>
        </Flex>
    );
}
