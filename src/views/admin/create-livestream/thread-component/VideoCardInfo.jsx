/* eslint-disable */
import React from "react";
// Chakra imports
import {
  Flex, Icon, Image, Text, useColorModeValue,
  SkeletonCircle
} from "@chakra-ui/react";

export default function VideoCardInfo(props) {
  const { dataGeneral } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("brands.900", "white");

  return (
    <Flex direction={{ base: "column" }} justify='center' w='100%'>
      <Flex position='relative' align='center'>
        {
          dataGeneral?.videoThumbnail ? (
            <Image src={dataGeneral?.videoThumbnail} h='100px' borderRadius='5px' me='16px' />
          ) : (
            <SkeletonCircle size='100' width="100px" borderRadius="5px" me="16px" />
          )
        }
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
            {dataGeneral?.videoTitle}
          </Text>
          <Text
            color='secondaryGray.800'
            fontSize={{
              base: "sm",
            }}
            fontWeight='400'
            me='14px'>
            {dataGeneral?.videoDuration}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
