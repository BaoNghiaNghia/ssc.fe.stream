/* eslint-disable */
import {
  Text,
  useColorModeValue,
  Button,
  Icon,
  FormControl,
  Grid,
  GridItem,
  Tooltip,
  Select,
} from "@chakra-ui/react";

import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdFilterList } from "react-icons/md";
import UseAnimations from "react-useanimations";
import alertOctagon from "react-useanimations/lib/alertOctagon";
export default function FilterHeader(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const {
    title,
    handleOpenFilterModal,
    handleOpenModalCreateStream,
    activeFilter,
  } = props;

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={4}
      mb={0}
      px={2}
    >
      <GridItem colSpan={7} margin="auto 0">
        <FormControl>
          <Text
            color={textColor}
            fontSize="lg"
            fontWeight="700"
            mb="5px"
            ml="20px"
            lineHeight="100%"
          >
            {title}
          </Text>
        </FormControl>
      </GridItem>
      <GridItem
        colSpan={5}
        margin="auto 0"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
      >
        <Button
          _hover={{ bg: "gray.100" }}
          size="md"
          variant="outline"
          borderRadius="5px"
          w="fit-content"
        >
          <UseAnimations
            name="alertOctagon"
            animation={alertOctagon}
            size={28}
            className="animation-icon"
            fillColor="black"
            strokeColor="black"
          />
          <Tooltip
            label="Hướng dẫn sử dụng luồng livestream"
            placement="top"
          >
            Hướng dẫn
          </Tooltip>
        </Button>
        <Button
          _hover={{ bg: activeFilter ? "green" : "gray.100" }}
          size="md"
          variant="outline"
          borderRadius="5px"
          w="fit-content"
          onClick={() => {
            handleOpenFilterModal();
          }}
        >
          <Icon
            transition="0.2s linear"
            w="32px"
            h="32px"
            pr="10px"
            as={MdFilterList}
            color={activeFilter ? "white" : "black"}
          />
          Bộ lọc
        </Button>
        <Button
          size="md"
          variant="solid"
          color={"green"}
          backgroundColor={"green.100"}
          borderRadius="5px"
          onClick={handleOpenModalCreateStream()}
        >
          <Icon
            transition="0.2s linear"
            w="32px"
            h="32px"
            pr="10px"
            as={IoAddCircleOutline}
          />
          Thêm Video
        </Button>
      </GridItem>
    </Grid>
  );
}
