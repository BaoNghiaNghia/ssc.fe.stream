/* eslint-disable */
// Chakra imports
import React, {useEffect, useState} from "react";
import {
  useColorModeValue,
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  Card,
  VStack,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Button,
  useDisclosure,
  Spinner
} from "@chakra-ui/react";

import { MESSSAGE_STATUS_CODE, PACKAGE_ITEM_COLOR } from "../../../variables/index";

import { FaCheckCircle } from 'react-icons/fa';
import history from "../../../utils/history";
import TabPayment from "./components/TabPayment";
import ModalStreamVideo from "./components/ModalStreamVideo";
import { toast } from "react-toastify";
import { fetchInfoUserPackageApi, fetchListUserPackageApi } from "../../../api/UserPackage";
import { useTranslation } from "react-i18next";

const PriceWrapper = ({ ...props }) => {
  const { borderTopColor, children } = props;
  return (
    <Box
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor="transparent"
      borderTopWidth="7px"
      borderRadius={'xl'}
      borderTopColor={borderTopColor}>
      {children}
    </Box>
  )
};

export default function PackagePlanInfo() {
  const [ loading, setLoading] = useState(false);
  const [ infoPackage, setInfoPackage] = useState([]);
  
  const { t } = useTranslation();

  const { isOpen: isOpenBuyPackage, onOpen: onOpenBuyPackage, onClose: onCloseBuyPackage } = useDisclosure();
  const [currentUserPackage, setCurrentUserPackage] = useState([]);
  
  const handleSelectPackage = (planType) => () => {
    setLoading(true);
    history.push(`#/admin/plan/${planType}`);
    window.location.reload();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const handleFetchInfoUserPackageApi = async () => {
    try {
      const responseInfoPackage = await fetchInfoUserPackageApi();
      if (responseInfoPackage.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
        let infoPackageResp = responseInfoPackage.data.data;
        let arrInfoPackage = [];
        Object.entries(infoPackageResp).map(([plan, value], index) => {
          let data = {};
          if (plan == "trial") {
            data = {
              packageColor: "gray",
              packageCode: plan,
              textColor: "black",
              total: (100 - value.discount)*value.price_per_month,
              pricePerMonth: value.price_per_month*100,
              packageDetail: [
                'Số lượng: 100 luồng livestream',
                'Băng thông: không giới hạn',
                `Giảm giá: ${value.discount} %`,
                `Giá gốc: ${(value.price_per_month*100).toLocaleString()} VNĐ`
              ]
            }
          } else {
            data = {
              packageColor: PACKAGE_ITEM_COLOR[index].packageColor,
              packageCode: plan,
              textColor: PACKAGE_ITEM_COLOR[index].textColor,
              total: (100 - value.discount)*value.price_per_month,
              pricePerMonth: value.price_per_month*100,
              packageDetail: [
                'Số lượng: 100 luồng livestream',
                'Băng thông: không giới hạn',
                `Giảm giá: ${value.discount} %`,
                `Giá gốc: ${(value.price_per_month*100).toLocaleString()} VNĐ`
              ]
            }
          }
          arrInfoPackage.push(data)
        });

        setInfoPackage(Array.from(arrInfoPackage));
      }
    } catch (err) {
      if (err.response) {
          toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }

  const fetchUserPackage = async () => {
    try {
        const responseListUserPackage = await fetchListUserPackageApi();
        if (responseListUserPackage.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            let allUserPackage = responseListUserPackage.data.data.items;
            setCurrentUserPackage(allUserPackage);
        }
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
    }
  }

  useEffect(() =>{ 
    handleFetchInfoUserPackageApi();
    fetchUserPackage();
  }, []);

  const modalContent = (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      textAlign="center"
      justify="center"
      spacing={{ base: 7, lg: 7 }}
      py={10}>
      {
        infoPackage.map((plan, id) => {
          return (
            <PriceWrapper borderTopColor={plan.packageColor} id={id} key={id}>
              <Card
                overflowX={{ sm: "scroll", lg: "hidden" }}
                borderRadius={'xl'}>
                <Box py={1} px={12}>
                    <Text fontWeight="600" fontSize="2xl" my="5px">
                      {plan.packageCode.toUpperCase()}
                    </Text>
                    <Text fontSize="3xl" fontWeight="700" textColor="blue.500">
                      {plan.total.toLocaleString()}
                    </Text>
                    <Text fontSize="l" color="gray.500">
                      VND/tháng
                    </Text>
                </Box>
                <VStack
                  py={5}
                  borderBottomRadius={'xl'}>
                  <List spacing={3} textAlign="start" px={4}>
                    {
                      plan.packageDetail.map((desc, key) => {
                        return (
                          <ListItem id={key} key={key}>
                            <ListIcon as={FaCheckCircle} color="green.500" />
                              {desc}
                          </ListItem>)
                      })
                    }
                  </List>
                  {
                    (plan.packageCode !== "trial") ? (
                      <Box w="80%" pt={7}>
                        <Button
                          w="full"
                          colorScheme="blue"
                          _hover={{ bg: "black" }}
                          onClick={handleSelectPackage(plan.packageCode)}
                          variant="brand">
                          Mua ngay
                        </Button>
                      </Box>
                    ) : null
                  }
                </VStack>
              </Card>
            </PriceWrapper>
          )
        })
      }
    </Stack>
  );

  return (
    <>
      <Box 
        pt={{ base: "100px", md: "100px", xl: "100px" }}
      > 
        <ModalStreamVideo
            isOpen={isOpenBuyPackage}
            onClose={onCloseBuyPackage}
            title="Thông tin các gói"
            content={modalContent}
        />
        <TabPayment
          tableData={currentUserPackage}
          onOpen={onOpenBuyPackage}/>
      </Box>
    </>
  )
}
