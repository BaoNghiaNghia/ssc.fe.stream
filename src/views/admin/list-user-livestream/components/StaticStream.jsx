/* eslint-disable */
// Chakra imports
import React from "react";
import {
  Icon,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import MiniStatistics from "../../../../components/card/MiniStatistics";
import IconBox from "../../../../components/icons/IconBox";
import { VIDEO_STREAMING_STATUS } from "../../../../variables";

export default function StaticStream(props) {
  const { listStatistics } = props;
  // Chakra Color Mode
  const boxBg = useColorModeValue("white", "whiteAlpha.100");

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4, "xl": 4, "2xl": 6 }}
      gap='10px'
      mb='10px'>
      {
        Object.entries(VIDEO_STREAMING_STATUS).map((item, index) => {
          return (
            <MiniStatistics
              key={index}
              bgColor="white"
              startContent={
                <IconBox
                  w='30px'
                  h='30px'
                  bg={boxBg}
                  icon={
                    <Icon w='28px' h='28px' as={VIDEO_STREAMING_STATUS[index].icon} color={'#49aeff'} />
                  }
                />
              }
              name={VIDEO_STREAMING_STATUS[index].message}
              value={listStatistics.find(item => item.status === index)?.total || 0}
            />
          )
        })
      }
  
    </SimpleGrid>
  );
}