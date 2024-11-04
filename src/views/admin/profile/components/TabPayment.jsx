/* eslint-disable */
// Chakra imports
import React from "react";
import {
    Button,
    Flex,
    Icon,
    Text,
    Card
} from "@chakra-ui/react";

import {
    columnsPaymentHistory
} from "../../../../variables/index";
import TablePayment from "./TablePayment";
import { IoAddCircleOutline } from "react-icons/io5";

export default function TabPayment(props) {
    let tableData = [];

    return (
        <Card mb={{ base: "20px", lg: "20px" }} style={{ boxShadow: 'none' }}>
            <Flex justify='space-between' mx="30px" mt="30px" mb='37px' display="flex">
                <Text color="black" align="left" pb="10px" fontSize={"lg"} fontWeight="bold">
                    Lịch sử giao dịch
                </Text>
                <Button 
                    mt={{ base: "20px", "2xl": "auto" }}
                    variant='solid'
                    colorScheme="red"
                    fontWeight='500'>
                    <Icon
                        transition='0.2s linear'
                        w='25px'
                        h='25px'
                        pr='5px'
                        as={IoAddCircleOutline}
                        color='white'
                    />
                    Mua gói
                </Button>
            </Flex>
            <Card
                direction='column'
                w='100%'
                px='0px'
                overflowX={{ base: "scroll"}}>
                <TablePayment
                    columnsData={columnsPaymentHistory}
                    tableData={tableData}
                />
            </Card>
        </Card>
    );
}
