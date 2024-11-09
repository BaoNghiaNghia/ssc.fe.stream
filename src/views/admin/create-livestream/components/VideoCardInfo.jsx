/* eslint-disable */
import React from "react";
import { Flex, Image, Text, useColorModeValue, SkeletonCircle } from "@chakra-ui/react";
import { toHHMMSS } from "../../../../utils/handleValidate";

export default function VideoCardInfo(props) {
  const { thumbnail, title, duration } = props;
  const textColor = useColorModeValue("brands.900", "white");

  return (
    <Flex position='relative' align='center' w='fit-content'>
      {
        thumbnail ? (
          <Image src={thumbnail} h='100px' borderRadius='5px' me='16px' />
        ) : (
          <SkeletonCircle size='100' width="100px" borderRadius="5px" me="16px" />
        )
      }
      <Flex direction='column' me={{ base: "4px", md: "10px" }}>
        <Text
          color={textColor}
          fontSize={{ base: "md" }}
          mb='5px'
          fontWeight='bold'
          noOfLines={2} // Ensures text does not overflow
        >
          {title}
        </Text>
        <Text color='secondaryGray.800' fontSize={{ base: "sm" }} fontWeight='400'>
          {toHHMMSS(duration)}
        </Text>
      </Flex>
    </Flex>
  );
}
