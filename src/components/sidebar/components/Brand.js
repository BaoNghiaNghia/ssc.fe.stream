/* eslint-disable */
import React from "react";

// Chakra imports
import { Flex, Image, useColorModeValue } from "@chakra-ui/react";

// Custom components
import logo from "../../../assets/img/logo.svg"
import { HSeparator } from "../../../components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='50px' w='175px' my='32px' color={logoColor} /> */}
      <Image src={logo} h='70px' w='175px' my='32px' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
