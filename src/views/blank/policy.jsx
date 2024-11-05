/* eslint-disable */
import { 
  SimpleGrid, Text, Center, Flex,
  Grid, GridItem,
  ListItem, Icon,
  Button, Image,
  UnorderedList,
} from "@chakra-ui/react";
import history from '../../utils/history';
import React from "react";
import BlankIllustration from '../../layouts/blank/Default';
import illustration from "../../assets/img/auth/auth.png";
import { IoArrowBack } from "react-icons/io5";
import logo from '../../assets/img/logo.svg';

export default function Policy() {
  // Chakra Color Mode
  const handleGoBackStep = () => {
    history.push('#/admin/create-livestream');
    window.location.reload();
  }

  return (
    <BlankIllustration illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        pl={{ base: "45%" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        flexDirection='column'>
        <Grid
          templateColumns='repeat(5, 1fr)'
          gap={2}
          mb="80px"
        >
          <GridItem colSpan={1}>
            <Button
              onClick={handleGoBackStep}
              variant="ghost"
              mt="10px"
              fontWeight="400"
              mr="1%">
              <Icon
                transition='0.2s linear'
                w='20px'
                h='20px'
                mr='10px'
                fontWeight="100"
                as={IoArrowBack}
                color='gray.400'
              />
              Quay lại
            </Button>
          </GridItem>
          <GridItem colStart={5} colEnd={8} alignContent="right">
            <Image src={logo} h='70px' w='100px' mb='18%' />
          </GridItem>
        </Grid>
        <Center mb="25px" textAlign="center">
          <Text fontSize='3xl' fontWeight='bold'>Chính sách bảo mật và miễn trừ trách nhiệm MKStream</Text>
        </Center>

        <SimpleGrid mb="25px">
          <Text fontSize='xl' fontWeight='bold' >1. Chính sách bảo mật</Text>
          <UnorderedList>
            <ListItem>Toàn bộ các thông tin MKStream yêu cầu khách hàng cung cấp như:</ListItem>
              <Text fontSize='md'> - Số điện thoại</Text>
              <Text fontSize='md'> - Đường link tài khoản facebook</Text>
              <Text fontSize='md'>Chỉ để phục vụ một mục đích duy nhất là chăm sóc khách hàng dễ hơn, chúng tôi cam kết không chia sẻ các thông tin này với bất kỳ bên thứ 3 nào.</Text>
            <ListItem>MKStream không lưu trữ thông tin tài khoản của khách hàng sử dụng dịch vụ, tất cả nghiệp vụ Livestream đều được thực hiện qua Key Stream (Khóa Luồng) đây là Key Stream do bên khách hàng cung cấp.</ListItem>
            <ListItem>MKStream không can thiệp cũng không biết được nội dung livestream của khách hàng.</ListItem>
          </UnorderedList>
        </SimpleGrid>

        <SimpleGrid mb="10px">
          <Text fontSize='xl' fontWeight='bold'>2. Miễn trừ trách nhiệm</Text>
          <UnorderedList>
            <ListItem fontSize='md'>Phần mềm MKStream là một phần mềm trung gian giúp khách hàng có thể livestream được nội dung video lên nền tảng mong muốn, chính vì thế chúng tôi hoàn toàn không kiểm soát, không tác động, không biết nội dung Livestream của khách hàng là gì.</ListItem>
            <ListItem fontSize='md'>Khách hàng phải toàn toàn chịu trách nhiệm đối với nội dung mà mình Livestream qua MKStream.</ListItem>
            <ListItem fontSize='md'>MKStream không chiu trách nhiệm pháp lý đối với bất kỳ nội dung livestream nào của khách hàng.</ListItem>
          </UnorderedList>
        </SimpleGrid>
      </Flex>
    </BlankIllustration>
  );
}
