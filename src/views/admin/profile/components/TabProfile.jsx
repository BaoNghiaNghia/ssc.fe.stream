/* eslint-disable */
// Chakra imports
import React from "react";
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue,
    Avatar,
    FormControl,
    FormLabel,
    Input,
    Card,
    Grid,
    GridItem
} from "@chakra-ui/react";

import { useAuth } from "../../../../contexts/authenContext";

import avatar from "../../../../assets/img/avatars/avatar.png";
import banner from "../../../../assets/img/auth/banner.png";
import { IoNewspaper } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function TabProfile(props) {
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const textColorSecondary = "gray.400";
    const borderColor = useColorModeValue(
        "white !important",
        "#111C44 !important"
    );

    const { t } = useTranslation()
    const { profile } = useAuth();

    let profileUser = JSON.parse(profile);

    return (
        <>
            <Card mb="0px" align='left' pb="20px">
                <Box
                    bg={`url(${banner})`}
                    bgSize='cover'
                    borderRadius='4px'
                    h='131px'
                    w='100%'
                />
                <Flex px="50px" direction='column'>
                    <Avatar
                        src={avatar}
                        h='87px'
                        w='87px'
                        mt='-43px'
                        borderColor={borderColor}
                    />
                </Flex>
                <Flex px="50px" direction='column'>
                    <Grid
                        templateRows='repeat(1, 1fr)'
                        templateColumns='repeat(2, 1fr)'
                        gap={2}
                        >
                        <GridItem colSpan={1} margin="auto 0">    
                            <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
                                {profileUser?.fullname}
                            </Text>
                            <Text color={textColorSecondary} fontSize='sm'>
                                {t(`content.${profileUser?.group?.role}`)}
                            </Text>
                        </GridItem>
                    </Grid>
                </Flex>
            </Card>
            <Flex direction='row' alignContent="baseline" justifyContent="space-between" my="10px">
                <Text color="black" pt="30px">
                    Thông tin cá nhân:
                </Text>
                <Button
                    mt={{ base: "20px", "2xl": "auto" }}
                    variant='brand'
                    size="sm"
                    // onClick={onOpen()}
                    fontWeight='400'>
                    <Icon
                        transition='0.2s linear'
                        w='17px'
                        h='17px'
                        pr='5px'
                        as={IoNewspaper}
                        color='white'
                    />
                    Chỉnh sửa
                </Button>
            </Flex>
            <Card  align='center' style={{ padding: '10px' }}>
                <FormControl mb="10px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Họ và tên<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        name="email"
                        value={profileUser.fullname}
                        // onChange={(e) => setInputValue("email", e.target.value)}
                        isRequired={true}
                        isDisabled={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type='email'
                        placeholder='mail@ssc.com'
                        fontWeight='500'
                        size='lg'
                    />
                </FormControl>
                <FormControl mb="10px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Email<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        name="email"
                        value={profileUser.email}
                        // onChange={(e) => setInputValue("email", e.target.value)}
                        isRequired={true}
                        isDisabled={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type='email'
                        placeholder='mail@ssc.com'
                        fontWeight='500'
                        size='lg'
                    />
                </FormControl>
                <FormControl mb="10px">
                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        Số điện thoại<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        name="email"
                        // value={formik.values.email}
                        // onChange={(e) => setInputValue("email", e.target.value)}
                        isRequired={true}
                        isDisabled={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type='email'
                        placeholder='mail@ssc.com'
                        fontWeight='500'
                        size='lg'
                    />
                </FormControl>
            </Card>
        </>
    );
}
