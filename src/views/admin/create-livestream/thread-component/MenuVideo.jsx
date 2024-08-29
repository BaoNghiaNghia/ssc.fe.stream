/* eslint-disable */
import React from "react";

// Chakra imports
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
} from "react-icons/md";
import { VIDEO_STATUS_GENERAL } from "../../../../variables";

export default function MenuVideo(props) {
  const {
    playRightAwayVideo,
    editCurrVideoStream,
    detailCurrVideoStream,
    killCurrVideoStream,
    delCurrVideoStream,
    dataVideo,
    setMenuSelected,
    ...rest
  } = props;

  const groupVideoMenu = [
    {
      title: 'Phát ngay',
      icons: MdPlayArrow,
      action: playRightAwayVideo,
      stateValidate: [VIDEO_STATUS_GENERAL.PENDING]
    },
    {
      title: 'Chỉnh sửa',
      icons: MdEditSquare,
      action: editCurrVideoStream,
      stateValidate: [
        VIDEO_STATUS_GENERAL.PENDING,
        VIDEO_STATUS_GENERAL.STREAMING,
        VIDEO_STATUS_GENERAL.ERROR,
        VIDEO_STATUS_GENERAL.CANCELED,
        // VIDEO_STATUS_GENERAL.DOWNLOADING,
      ]
    },
    {
      title: 'Chi tiết',
      icons: MdOutlinePerson,
      action: detailCurrVideoStream,
      stateValidate: [
        VIDEO_STATUS_GENERAL.PENDING,
        VIDEO_STATUS_GENERAL.STREAMING,
        VIDEO_STATUS_GENERAL.FINISHED,
        VIDEO_STATUS_GENERAL.CANCELED,
        VIDEO_STATUS_GENERAL.ERROR,
        VIDEO_STATUS_GENERAL.EXPIRED_STREAM,
        VIDEO_STATUS_GENERAL.DOWNLOADING,
      ]
    },
    {
      title: 'Hủy phát',
      icons: MdCancel,
      action: killCurrVideoStream,
      stateValidate: [
        VIDEO_STATUS_GENERAL.STREAMING,
        VIDEO_STATUS_GENERAL.DOWNLOADING,
      ]
    },
    {
      title: 'Xóa',
      icons: MdDeleteOutline,
      action: delCurrVideoStream,
      stateValidate: [
        VIDEO_STATUS_GENERAL.PENDING,
        VIDEO_STATUS_GENERAL.FINISHED,
        VIDEO_STATUS_GENERAL.CANCELED,
        VIDEO_STATUS_GENERAL.ERROR,
        VIDEO_STATUS_GENERAL.EXPIRED_STREAM
      ]
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
    isopen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  return (
    <Menu isopen={isOpenModal} onClose={onCloseModal} placement="auto-start">
      <MenuButton
        id="menu-video-action"
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}

        _focus={bgFocus}
        _active={bgFocus}
        w='30px'
        h='30px'
        border="1px solid #dddddd"
        onClick={(e) => {
          // e.preventDefault();
          onOpenModal()
        }}
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
        p='15px'>
        {
          groupVideoMenu.map((item, index) => {
            let stateValidate = item.stateValidate;
            return (
              <MenuItem
                key={index}
                transition='0.2s linear'
                color={textColor}
                _hover={textHover}
                p='0px'
                borderRadius='8px'
                _active={{
                  bg: "transparent",
                }}
                isDisabled={!stateValidate.includes(dataVideo.status)}
                _focus={{
                  bg: "transparent",
                }}
                onClick={() => {
                    item.action()
                    setMenuSelected(dataVideo)
                }}
                mx="15px"
                my='10px'>
                <Flex align='center'>
                  <Icon as={item.icons} h='16px' w='16px' mr='8px' />
                  <Text fontSize='md' color="black" fontWeight='400'>
                    {item.title}
                  </Text>
                </Flex>
              </MenuItem>
            )
          })
        }
      </MenuList>
    </Menu>
  );
}
