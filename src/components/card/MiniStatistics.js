/* eslint-disable */

import React from "react";
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue
} from "@chakra-ui/react";
import Card from "./Card";

export default function MiniStatistics(props) {
  const { startContent, endContent, name, value, bgColor } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray";

  return (
    <Card p='16px' bgColor={bgColor || 'white'}>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight='100%'
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}>
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "xl",
            }}>
            {value} video
          </StatNumber>
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
