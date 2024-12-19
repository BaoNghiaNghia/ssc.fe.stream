/* eslint-disable */
// Chakra imports
import React from "react";
import { SimpleGrid, Text, useColorModeValue, Button, Icon } from "@chakra-ui/react";

// Custom components
import Card from "../../../../components/card/Card.js";
import Information from "./Information.jsx";
import { IoStarOutline } from "react-icons/io5";
import history from "../../../../utils/history.js";

// Assets
export default function PackageDetailInfo(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const handleUpgradePackage = () => {
    history.push('#/admin/plan');
    window.location.reload();
  }

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='l'
        mt='10px'
        mb='4px'>
        Hạn mức
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Bạn đang sử dụng gói cước FREE
      </Text>
      <SimpleGrid columns='2' gap='10px'>
        <Information
          boxShadow={cardShadow}
          title='Phát hôm nay'
          value='0/1 video'
        />
        <Information
          boxShadow={cardShadow}
          title='Đang phát'
          value='0/1 video'
        />
      </SimpleGrid>
      <Button 
        mt={{ base: "10px", "2xl": "auto" }}
        variant='brand'
        onClick={handleUpgradePackage}
        fontWeight='500'>
        <Icon
            transition='0.2s linear'
            w='20px'
            h='20px'
            pr='5px'
            as={IoStarOutline}
            color='white'
        />
        Nâng hạn mức
      </Button>
    </Card>
  );
}