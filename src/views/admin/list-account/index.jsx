/* eslint-disable */
// Chakra imports
import React from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import TotalSpent from "../default/components/TotalSpent";

export default function () {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
      </SimpleGrid>
    </Box>
  );
}
