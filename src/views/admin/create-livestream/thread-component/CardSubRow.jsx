/* eslint-disable */
// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card";
// Assets
import React from "react";
import { IoArrowForward, IoPauseOutline } from "react-icons/io5";
import { VIDEO_STREAMING_STATUS } from "../../../../variables/index";
import Menu from './MenuVideo';
import { reverseTimeDate, toHHMMSS, truncate } from "../../../../utils/handleValidate";
import CardCreateNewVideo from "./CardCreateNewVideo";

export default function CardSubRow(props) {
  const {
      detailCurrVideoStream, killCurrVideoStream, 
      delCurrVideoStream, playRightAwayVideo, editCurrVideoStream,
      setMenuSelected, idUserStream,
      handleOpenModalCreateStream, videoData,
  } = props;

  const textColor = useColorModeValue("navy.700", "white");

  const itemCreateNew = () => {
    return (
      <CardCreateNewVideo
        idUserStream={idUserStream}
        handleOpenModalCreateStream={handleOpenModalCreateStream}
      />
    )
  }

  const listWithData = (videoItem) => {
      return (
          <>
            <Card p='1px' bgColor="white" borderRadius="5px">
                <Flex
                    direction="column"
                    justifyContent='space-around'
                    alignItems="stretch">
                    <Box mb={{ base: "10px", "2xl": "10px" }} position='relative'>
                        <Image
                            src={videoItem.video_info.thumbnail}
                            w={{ base: "100%", "3xl": "100%" }}
                            h={{ base: "100%", "3xl": "100%" }}
                            borderRadius='10px'
                        />
                        <Button
                            position='absolute'
                            bg={VIDEO_STREAMING_STATUS[videoItem.status]?.color || 'gray.300'}
                            color={VIDEO_STREAMING_STATUS[videoItem.status].textColor}
                            _hover={{ bg: "whiteAlpha.700" }}
                            _active={{ bg: "white" }}
                            _focus={{ bg: "white" }}
                            p="10px !important"
                            fontSize="sm"
                            top='5px'
                            right='5px'
                            borderRadius='3px'
                            h='20px'>
                            <Icon as={VIDEO_STREAMING_STATUS[videoItem.status].icon}
                                w='14px' h='auto' mr="3px" color={VIDEO_STREAMING_STATUS[videoItem.status].textColor} />
                            {VIDEO_STREAMING_STATUS[videoItem.status].message}
                        </Button>
                        <Button
                            position='absolute'
                            bg='whiteAlpha.700'
                            _hover={{ bg: "whiteAlpha.700" }}
                            _active={{ bg: "white" }}
                            _focus={{ bg: "white" }}
                            p="10px !important"
                            fontSize="xs"
                            bottom='0px'
                            left='0px'
                            borderRadius='3px'
                            h='20px'>
                            {toHHMMSS(videoItem.video_info.duration)}
                        </Button>
                    </Box>
                    <Flex
                        justify='space-between'
                        ml="5px"
                        mb='auto'>
                        <Flex >
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: "sm",
                                }}
                                mb='5px'
                                fontWeight='bold'
                                me='14px'>
                                {truncate(videoItem.video_info.title, 33)}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        direction="column"
                        mt='5px'>
                        <Text fontWeight='500' fontSize='sm' align="center">
                            <Icon
                                transition='0.2s linear'
                                w='12px'
                                h='12px'
                                as={IoArrowForward}
                                color='black'
                                mr="3px"
                            />
                            {reverseTimeDate(videoItem.started_at)}
                        </Text>
                        <Text fontWeight='500' fontSize='sm' align="center">
                            <Icon
                                transition='0.2s linear'
                                w='12px'
                                h='12px'
                                as={IoPauseOutline}
                                color='black'
                                mr="3px"
                            />
                            {reverseTimeDate(videoItem.ended_at)}
                        </Text>
                    </Flex>
                    <Flex
                        align='center'
                        justify='space-between'
                        // direction={{
                        //   base: "row",
                        //   md: "column",
                        //   lg: "row",
                        //   xl: "column",
                        //   "2xl": "row",
                        // }}
                        px="5px"
                        pb="5px"
                        mt='10px'>
                        <Text
                            color='secondaryGray.900'
                            fontSize={{
                                base: "sm",
                            }}
                            fontWeight='500'
                            me='10px'>
                            <Badge variant='subtle'>{videoItem.resolution}</Badge>
                        </Text>
                        <Menu
                            idVideo={videoItem.id}
                            stateVideo={videoItem.status}
                            playRightAwayVideo={() => {
                                playRightAwayVideo()
                                setMenuSelected(row.original.id)
                            }}
                            editCurrVideoStream={() => {
                                editCurrVideoStream()
                                setMenuSelected(row.original.id)
                            }}
                            killCurrVideoStream={() => {
                                killCurrVideoStream()
                                setMenuSelected(videoItem.id)
                            }}
                            detailCurrVideoStream={() => {
                                detailCurrVideoStream(videoItem)
                                setMenuSelected(videoItem)
                            }}
                            delCurrVideoStream={() => {
                                delCurrVideoStream()
                                setMenuSelected(videoItem.id)
                            }}
                        />
                    </Flex>
                </Flex>
            </Card>
          </>
      )
  }

  const listWithourData = () => {
      return (
          <Flex
              direction={{ base: "column" }}
              p='0px'
              justify='center'
              alignContent="center"
              backgroundSize="contain"
              align={'center'}
              border="2px solid #ececec"
              borderRadius="10px"
              minH="300px"
          >
              <Text color="gray.400">
                  Hiện chưa có video
              </Text>
          </Flex>
      )
  }

  return (
    <SimpleGrid columns={{ base: 4, "md": 4, "lg": 5, "xl": 8,"2xl": 8 }} gap='10px' pt="20px" pb="30px" pl="20px" pr="20px" backgroundColor="#f6f6f6">
        {itemCreateNew()}
        { videoData.length > 0 ? videoData.map(videoItem => listWithData(videoItem)) : listWithourData()}
    </SimpleGrid>

  );
}
