/* eslint-disable */
import React from "react";

import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import {
  MdOutlineMoreHoriz,
  MdCancel,
  MdDeleteOutline,
  MdOutlinePerson,
  MdPlayArrow,
  MdEditSquare,
  MdLockReset,
  MdOutlineAssignmentInd,
  MdOutlineAssignmentReturn
} from "react-icons/md";
import { ROLE_USER } from "../../../../variables";
import { checkRoleUser, getCurrRoleUser } from "../../../../utils/handleValidate";
import { useAuth } from "../../../../contexts/authenContext";

export default function MenuAgent(props) {
  const {
    editAgentServer,
    detailAgentServer,
    assignAgentFor,
    assignAgentResellerFor,
    delAgentServer,
    originalData,
    setMenuSelected,
    resetAgent,
    ...rest
  } = props;

  const { profile } = useAuth();
  
  const groupVideoMenu = [
    {
      title: 'Chỉnh sửa',
      icons: MdEditSquare,
      action: editAgentServer,
      role: [ROLE_USER.ADMIN]
    },
    {
      title: 'Chi tiết',
      icons: MdOutlinePerson,
      action: detailAgentServer,
      role: [ROLE_USER.ADMIN]
    },
    {
      title: 'Gán User',
      icons: MdOutlineAssignmentInd,
      action: assignAgentFor,
      role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER]
    },
    {
      title: 'Gán Reseller',
      icons: MdOutlineAssignmentReturn,
      action: assignAgentResellerFor,
      role: [ROLE_USER.ADMIN]
    },
    {
      title: 'Reset',
      icons: MdLockReset,
      action: resetAgent,
      role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER, ROLE_USER.USER_DEFAULT]
    },
    {
      title: 'Xóa',
      icons: MdDeleteOutline,
      action: delAgentServer,
      role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER]
    },
  ]

  const textColor = useColorModeValue("secondaryGray.800", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("gray.700", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // Ellipsis modals
  const {
    isopen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  return (
    <Menu isopen={isOpen1} onClose={onClose1} placement="auto-start">
      <MenuButton
        align='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        border="2px solid #dddddd"
        lineHeight='100%'
        onClick={onOpen1}
        borderRadius='10px'
        {...rest}>
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w='24px' h='24px' />
      </MenuButton>
      <MenuList
        w='fit-content'
        minW='unset'
        maxW='200px !important'
        backdropFilter='blur(63px)'
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius='20px'
        p='10px'>
        {
          groupVideoMenu.map((item, index) => {
            if (item.role.includes(getCurrRoleUser(profile))) {
              return (
                <MenuItem
                  key={index}
                  transition='0.2s linear'
                  my="12px"
                  color={textColor}
                  _hover={textHover}
                  p='0px'
                  borderRadius='8px'
                  _active={{
                    bg: "transparent",
                  }}
                  _focus={{
                    bg: "transparent",
                  }}
                  onClick={() => {
                    item.action()
                    setMenuSelected(originalData)
                  }}
                  mx="15px">
                  <Flex align='center'>
                    <Icon as={item.icons} h='16px' w='16px' mr='8px' />
                    <Text fontSize='md' color="black" fontWeight='400'>
                      {
                        (item.title === 'Gán User') ? (originalData?.user_obj ? 'Hủy Gán User' : 'Gán User') : (item.title === 'Gán Reseller') ? (originalData?.reseller_obj ? 'Hủy Gán Reseller' : 'Gán Reseller' ) : item.title 
                      }
                    </Text>
                  </Flex>
                </MenuItem>
              )
            }
          })
        }
      </MenuList>
    </Menu>
  );
}
