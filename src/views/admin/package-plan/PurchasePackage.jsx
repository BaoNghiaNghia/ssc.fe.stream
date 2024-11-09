/* eslint-disable */
import { 
    Box,
    SimpleGrid,
    Text,
    Grid,
    Flex,
    Select,
    Card,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    GridItem,
    TabPanels,
    Tooltip,
    Button,
    Badge,
    Icon,
    Image,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import { useLocation } from "react-router-dom";
import { IoInformationCircleSharp } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { MESSSAGE_STATUS_CODE, MK_AGENCY_PROVIDER, listPricingMonthly, listStreamThread } from '../../../variables/index';
// import PaymentQRCode from '../../../assets/img/PaymentQRCode.jpg'
import { fetchInfoUserPackageApi, fetchListUserPackageApi, preOrderUserPackageApi } from '../../../api/UserPackage/index';
import { fetchProfileDetail } from '../../../api/Auth';
import ModalPackageConfirm from './components/ModalPackageConfirm';
import { useTranslation } from 'react-i18next';
import history from '../../../utils/history';

function PurchasePackage() {
    const location = useLocation();

    const packageName = location.pathname.split('/').slice(-1).pop();
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [selectMonth, setSelectMonth] = useState(1);
    const [selectThread, setSelectThread] = useState(100);

    const [currentUserPackage, setCurrentUserPackage] = useState({});
    const [ infoPackage, setInfoPackage] = useState({});

    const { t } = useTranslation();

    const fetchCurrentUser = async () => {
        try {
            const responseProfile = await fetchProfileDetail({}, {
                headers: {
                    Agency: MK_AGENCY_PROVIDER
                }
            });
            if (responseProfile.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                return responseProfile.data.data.id;
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

    const handleFetchInfoUserPackageApi = async () => {
        try {
          const responseInfoPackage = await fetchInfoUserPackageApi();
          if (responseInfoPackage.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            let arrInfoPackage = [];
    
            let arrColor = ["orange", "green", "blue", "purple", "teal"]
            Object.entries(responseInfoPackage.data.data).map(([plan, value], index) => {
                if (plan == packageName) {
                    arrInfoPackage = {
                        packageColor: arrColor[index],
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
                }
            });
    
            setInfoPackage(arrInfoPackage);
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
                let currUser = await fetchCurrentUser();
                let currUserPackage = await allUserPackage.find(item => item.user_id == currUser);
                setCurrentUserPackage(currUserPackage);
            }
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
        }
    }

    useEffect(() => {
        handleFetchInfoUserPackageApi();
        fetchUserPackage();
    }, []);

    const handleSubmitPurchase = async () => {
        setLoading(true);
        let currUser = await fetchCurrentUser();
        try {
            const data = {
                package_name: packageName,
                user_id: currUser,
                package_days: selectMonth*30,
                stream_number: parseInt(selectThread),
            }

            const responseOrder = await preOrderUserPackageApi(data);
            if (responseOrder.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
                toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
                setTimeout(() =>{ 
                    history.push('#/admin/plan');
                    window.location.reload();
                },2000)
            }
            setLoading(false);
        } catch (err) {
            if (err.response) {
                toast.error(t(`error_code.${err.response.data.error_code}`));
            }
            setLoading(false);
            console.log(err);
        }
    }

    const checkCurrPackage = (currentUserPackage.package_name == packageName);

    let TabPanelPurchaseNew = () => {
        return (
            <TabPanel>
                <SimpleGrid columns='6' gap='20px' my="30px" alignContent="center">
                    <Text fontSize='sm'>Gói cước mới</Text>
                    <Text fontSize='l' fontWeight="600" textTransform="uppercase">
                        <Badge borderRadius="4px" variant='solid' color={infoPackage.textColor} colorScheme={infoPackage.packageColor}>
                            {infoPackage.packageCode}
                        </Badge>
                    </Text>
                    <Text fontSize='sm'>{
                        checkCurrPackage  ? '(Đang sử dụng)' : ''
                    }</Text>
                </SimpleGrid>
                {/* <SimpleGrid columns='6' gap='20px' my="30px">
                    <Text fontSize='sm'>Email của bạn</Text>
                    <Text fontSize='md' fontWeight="600">dddd</Text>
                </SimpleGrid> */}
                <SimpleGrid columns='6' gap='20px' my="30px">
                    <Text fontSize='sm'>Mô tả gói cước</Text>
                    <Text fontSize='md' fontWeight="600">{infoPackage.packageDetail && infoPackage.packageDetail[0]}</Text>
                </SimpleGrid>
                <SimpleGrid columns='6' gap='20px' my="30px">
                    <Text fontSize='sm'>Thời hạn</Text>
                    <Select
                        id="package_duration"
                        name="package_duration"
                        value={selectMonth}
                        onChange={(e) => setSelectMonth(e.target.value)}
                        autoComplete="package_duration"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md">
                        { listPricingMonthly.map((item, id) => {
                            return ( <option my="5px" id={item.value} value={item.value}>{item.label}</option> )
                        })}
                    </Select>
                </SimpleGrid>
                <SimpleGrid columns='6' gap='20px' my="30px">
                    <Text fontSize='sm'>Số luồng livestream</Text>
                    <Select
                        id="thread"
                        name="thread"
                        value={selectThread}
                        onChange={(e) => setSelectThread(e.target.value)}
                        autoComplete="thread"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md">
                        { listStreamThread.map((item, id) => {
                            return ( <option my="5px" id={item.value} value={item.value}>{item.label}</option> )
                        })}
                    </Select>
                </SimpleGrid>
                <Grid
                    my="30px"
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}
                    >
                    <GridItem colSpan={1}><Text fontSize='sm'>Thanh toán</Text></GridItem>
                    <GridItem colSpan={5}>
                        <Text fontSize='md' textDecoration="line-through" color="gray"fontWeight="600">{infoPackage.pricePerMonth && infoPackage.pricePerMonth.toLocaleString()} VND</Text>
                        <Text fontSize='md' color="blue" fontWeight="600" display="flex">
                            {infoPackage.total && (selectThread*selectMonth*infoPackage.total/100).toLocaleString()} VND
                            <Tooltip label='Giảm giá 15%' hasArrow>
                                <Icon as={IoInformationCircleSharp} w='24px' h='24px' color="blue" />
                            </Tooltip>
                        </Text>
                    </GridItem>
                </Grid>
                <Grid
                    my="30px"
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}>
                    <GridItem colSpan={1}><Text fontSize='sm'>Phương thức thanh toán</Text></GridItem>
                    <GridItem colSpan={5} borderWidth="1px" borderRadius="5px" borderColor="gray.200" px="15px" py="15px">
                        <Grid
                            templateRows='repeat(1, 1fr)'
                            templateColumns='repeat(2, 1fr)'
                            gap={4}>
                            <GridItem colSpan={1}>
                                <Text fontSize='sm' color="black" fontWeight="200" mb="5px">
                                    <Icon as={FaCheckCircle} w='12px' h='auto' color="green.500" mr="5px">1</Icon>
                                    Đăng nhập vào <strong>Internet banking</strong> ( ngân hàng điện tử )
                                </Text>
                                <Text fontSize='sm' color="black" fontWeight="200">
                                    <Icon as={FaCheckCircle} w='12px' h='auto' color="green.500" mr="5px">2</Icon> 
                                    Tạo giao dịch chuyển tiền tới tài khoản sau
                                </Text>
                                <Card my="10px" p="20px" bgColor="gray.200"> 
                                    <Text fontSize='md' color="black" fontWeight="700">
                                        Tran Thi Thuy Trang
                                    </Text>
                                    <Text fontSize='md' color="black" fontWeight="700">
                                        1031154635
                                    </Text>
                                    <Text fontSize='md' color="black" fontWeight="700">
                                        Vietcombank - Trụ sở CN Bảo Lộc
                                    </Text>
                                </Card>
                                
                                <Text fontSize='sm' color="red" fontWeight="200" mt="50px">
                                    ** Chú ý: Gói cước sẽ được nâng cấp sau khi khách hàng thanh toán thành công.
                                </Text>
                                <Text fontSize='sm' color="red" fontWeight="200">
                                    ** Chuyển khoản thiếu không được nâng cấp, chuyển khoản thừa bị mất 10% phí xử lý
                                </Text>
                                <Text fontSize='sm' color="red" fontWeight="200">
                                    ** Các giao dịch quá 15 ngày không báo kiểm tra sẽ không được xử lý
                                </Text>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Text fontSize='sm' color="black" fontWeight="200">
                                    <Icon as={FaCheckCircle} w='12px' h='auto' color="green.500" mr="5px">3</Icon>
                                        Hoặc quét <strong>Mã QR</strong>
                                </Text>
                                {/* <Card display="flex" justifyContent="center" alignContent="center" flexDirection="row" boxShadow="none">
                                    <Image src={PaymentQRCode} h='316px'/>
                                </Card> */}
                            </GridItem>
                        </Grid>
                    </GridItem>
                </Grid>
                <SimpleGrid column={1} display="flex" justifyContent="flex-end">
                    <Button 
                        width="20%" h='44px' mr='20px' 
                        px="20px" variant='brand' size='md'
                        _active={{ bg: "black" }}
                        _hover={{ bg: "black" }}
                        onClick={handleSubmitPurchase}>           
                        { loading ? <Spinner size='sm' color="white"/> : !checkCurrPackage ? 'Mua gói' : 'Gia hạn' }
                    </Button>
                </SimpleGrid>
            </TabPanel>
        )
    }
    
    let TabPanelExtendPackage = () => {
        return (
            <TabPanel>
                <Grid
                    my="30px"
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(6, 1fr)'
                    gap={4}>
                    <GridItem colSpan={1}>
                        <Text fontSize='lg'fontWeight='extrabold'>
                            Tính năng đang phát triển
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text fontSize='lg'>
                            Tính năng đang phát triển
                        </Text>
                    </GridItem>
                </Grid>
            </TabPanel>
        )
    }
    
    return (
        <>
            <ModalPackageConfirm
                isOpen={isOpen}
                onClose={onClose}
                // handleAddURLVideo={handleAddURLVideo}
                // setInputValue={setInputValue}
                // formik={formik}
            />
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <Tabs size='md' variant='enclosed'>
                    <TabList>
                        <Tab
                            _selected={{ color: 'white', bg: 'blue.500' }}
                            >{ checkCurrPackage ? 'Gia hạn' : 'Mua gói' }</Tab>
                        <Tab
                            isDisabled={!checkCurrPackage}
                            _selected={{ color: 'white', bg: 'blue.500' }}
                            _active={{ color: 'white', bg: 'blue.500' }}
                            _disabled={{ color: 'gray.400', bg: 'white' }}>Đổi gói</Tab>
                    </TabList>
                    <Card mb={{ base: "0px", "2xl": "20px" }} py={{ base: "10px" }} px={{ base: "15px" }}>
                        <TabPanels>
                            {TabPanelPurchaseNew()}
                            {TabPanelExtendPackage()}
                        </TabPanels>
                    </Card>
                </Tabs>
            </Box>
        </>
    )
};

export default PurchasePackage;