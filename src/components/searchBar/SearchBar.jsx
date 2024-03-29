/* eslint-disable */
import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const {
    data,
    onSearch,
    variant,
    background,
    children,
    placeholder,
    borderRadius,
    ...rest } = props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputText = useColorModeValue("gray.700", "gray.100");
  return (
    <InputGroup w={{ base: "100%" }} {...rest}>
      <InputLeftElement
        children={
          <IconButton
            bg='inherit'
            borderRadius='inherit'
            _hover={{  }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <SearchIcon color={searchIconColor} w='15px' h='15px' />
            }></IconButton>
        }
      />
      <Input
        variant='flushed'
        fontSize='md'
        color={inputText}
        value={data || ''}
        onChange={(e) => onSearch(e.target.value)}
        fontWeight='400'
        _placeholder={{ color: "gray.400" }}
        borderRadius={borderRadius ? borderRadius : "4px"}
        placeholder={placeholder ? placeholder : "Tìm kiếm..."}
      />
    </InputGroup>
  );
}
