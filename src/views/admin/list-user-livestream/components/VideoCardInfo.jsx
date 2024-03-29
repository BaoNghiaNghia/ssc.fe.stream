/* eslint-disable */
import React from "react";
// Chakra imports
import { Flex, Icon, Image, Text, useColorModeValue } from "@chakra-ui/react";

import { useTranslation } from 'react-i18next';
import { toHHMMSS } from "../../../../utils/handleValidate";


export default function VideoCardInfo(props) {
  const { thumbnail, title, duration } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const { t } = useTranslation();

  return (
    <Flex direction={{ base: "column" }} justify='center' w='100%'>
      <Flex position='relative' align='center'>
        <Image src={thumbnail} h='100px' borderRadius='5px' me='16px' />
        <Flex
          direction='column'
          w={{ base: "70%", md: "100%" }}
          me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
          <Text
            color={textColor}
            fontSize={{
              base: "md",
            }}
            mb='5px'
            fontWeight='bold'
            me='14px'>
            {title}
          </Text>
          <Text
            color='secondaryGray.800'
            fontSize={{
              base: "sm",
            }}
            fontWeight='400'
            me='14px'>
            {toHHMMSS(duration)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
