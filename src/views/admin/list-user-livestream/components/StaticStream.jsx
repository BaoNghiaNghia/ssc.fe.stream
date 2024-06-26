/* eslint-disable */
// Chakra imports
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  FormLabel,
  Select,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
// Custom components
import MiniStatistics from "../../../../components/card/MiniStatistics";
import IconBox from "../../../../components/icons/IconBox";
import {
  MdBarChart
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { VIDEO_STREAMING_STATUS } from "../../../../variables";

export default function StaticStream(props) {
  const { listStatistics } = props;
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("white", "whiteAlpha.100");

  const { t } = useTranslation();

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4, "xl": 4, "2xl": 6 }}
      gap='15px'
      mb='20px'>
      {
        Object.entries(VIDEO_STREAMING_STATUS).map((item, index) => {
          return (
            <MiniStatistics
              key={index}
              bgColor="white"
              startContent={
                <IconBox
                  w='56px'
                  h='56px'
                  bg={boxBg}
                  icon={
                    <Icon w='32px' h='32px' as={VIDEO_STREAMING_STATUS[index].icon} color={brandColor} />
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