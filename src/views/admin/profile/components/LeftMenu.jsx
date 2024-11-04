/* eslint-disable */
// Chakra imports
import React from "react";
import {
  List,
  ListItem,
  Button,
  Icon
} from "@chakra-ui/react";
import { MdLockOutline, MdPayment, MdPersonOutline } from "react-icons/md";

export default function LeftMenu(props) {

  const { handleChangeVerticalTabs, activeTabId, resumeData } = props;

  return (
      <List w="100%">
        {resumeData && resumeData.map((item, index) => {
          return (
            <ListItem 
              key={index}
            >
              <Button
                onClick={() => handleChangeVerticalTabs(index)}
                key={index}
                px="50px"
                py="30px"
                fontSize="md"
                borderRadius="4px"
                width="100%"
                fontWeight="500"
                borderBottom="2px solid #e1e1e1"
                variant={activeTabId === index ? "solid" : "ghost"}
                backgroundColor={activeTabId === index ? "blue.100" : "white"}
                >
                <Icon
                    me='10px'
                    h='20px'
                    w='20px'
                    color={activeTabId === index ? "facebook" : "whiteAlpha"}
                    as={(index == 0) ? MdPersonOutline : (index == 1) ? MdLockOutline : MdPayment}
                />
                {item.menu}
              </Button>
            </ListItem>
          )
        })}
      </List>
  );
}
