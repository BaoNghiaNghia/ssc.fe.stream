/* eslint-disable */
import {
    Text,
    useColorModeValue,
    Button,
    Icon,
    FormControl,
    Grid,
    Flex,
    GridItem,
} from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/authenContext";

import React from "react"
import { IoAddCircleOutline } from "react-icons/io5";
import { getCurrRoleUser } from "../../../../utils/handleValidate";
import { ROLE_USER } from "../../../../variables";
import { MdFilterList } from "react-icons/md";

export default function FilterHeader(props) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { profile } = useAuth();

    const {
        title,
        onModalCreate,
        handleOpenFilterModal
    } = props;

    const isAdmin = [ROLE_USER.ADMIN].includes(getCurrRoleUser(profile));

    return (
        <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(8, 1fr)'
            gap={0}
            px={4}
        >
            <GridItem colSpan={6} margin="auto 0">
                <FormControl>
                    <Text
                        color={textColor}
                        fontSize='lg'
                        fontWeight='700'
                        mb="5px"
                        lineHeight='100%'>
                        {title}
                    </Text>
                </FormControl>
            </GridItem>

            <GridItem colSpan={2} display="flex" justifyContent="flex-end" alignItems="center">
                <Flex gap={4}>
                    {isAdmin && (
                        <Button
                            _hover={{ bg: "gray.100" }}
                            size="md"
                            variant='outline'
                            borderRadius='10px'
                            px='10px'
                            w="fit-content"
                            onClick={onModalCreate}
                            py='20px'
                            aria-label="Add Server"
                            mr={0}
                        >
                            <Icon
                                transition='0.2s linear'
                                w='28px'
                                h='28px'
                                pr='10px'
                                as={IoAddCircleOutline}
                                color={"black"}
                            />
                            Thêm server
                        </Button>
                    )}
                    <Button 
                        _hover={{ bg: "gray.100" }}
                        size="md"
                        variant='outline' 
                        borderRadius='5px'
                        px='10px'
                        w="fit-content"
                        py='20px'
                        onClick={handleOpenFilterModal}
                        aria-label="Open Filter Modal"
                        ml={0}
                    >
                        <Icon
                            transition='0.2s linear'
                            w='32px'
                            h='32px'
                            pr='10px'
                            as={MdFilterList}
                            color={"black"}
                        />
                        Bộ lọc
                    </Button>
                </Flex>
            </GridItem>
        </Grid>
    );
}
