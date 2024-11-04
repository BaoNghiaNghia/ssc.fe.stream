/* eslint-disable */
// Chakra imports
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { MdOutlineDateRange } from "react-icons/md";
import { MESSSAGE_STATUS_CODE, ROLE_USER } from "../../../variables/index";
import { reverseTimeDate } from "../../../utils/handleValidate";

import TableEmpty from "../list-user-livestream/components/TableEmpty";
import MenuAgent from "./components/MenuAgent";
import { useAuth } from "../../../contexts/authenContext";
import ModalCustomGeneral from "../../../components/modal/ModalCustomGeneral";
import FilterHeader from "./components/FilterHeader";
import CreateNewPackage from "./components/CreateNewPackage";
import { MdAccessTime, MdCancel, MdCheckCircle, MdOutlineHub } from "react-icons/md";
import TableUserManager from "./components/TableUserManager";
import { adminConfirmUserPackageApi, fetchAdminListApi } from "../../../api/UserPackage";
import { fetchAdminListUser } from "../../../api/Auth";
import { FaRegUserCircle } from "react-icons/fa";

export default function ManageAdminLivestream() {
  const [tableList, setTableList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [selectedAgentServer, setSelectedAgentServer] = useState({});
  const [menuSelected, setMenuSelected] = useState();

  const [listAdmin, setListAdmin] = useState([]);

  const { profile } = useAuth();

  const showPayment = JSON.parse(profile) 
        && Object.keys(JSON.parse(profile)).length != 0 && JSON.parse(profile)?.other_info?.show_payment || false;

  const {
    isOpen: isOpenNewAgentServer,
    onOpen: onOpenNewAgentServer,
    onClose: onCloseNewAgentServer
  } = useDisclosure();

  const {
    isOpen: isOpenConfirmPayment,
    onOpen: onOpenConfirmPayment,
    onClose: onCloseConfirmPayment
  } = useDisclosure();

  const { t } = useTranslation();

  const fetchAdminListUserFunc = async () => {
    try {
        const responseEdit = await fetchAdminListUser({
            limit: 1000
        });
        if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            setListAdmin(responseEdit.data.data.users.map(item => {
                return {
                    label: item.fullname,
                    value: item.id
                }
            }));
        }
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
    }
  }

  const handleFetchListUserPack = async (params) => {
    try {
      const responseListUserPack = await fetchAdminListApi(params || {});
      if (responseListUserPack.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
        let adminList = responseListUserPack.data.data;
        setPaginationData(adminList.meta);
        setTableList(adminList.items);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }

  useEffect(() => {
    handleFetchListUserPack({});
    fetchAdminListUserFunc();
  }, []);

  const col1 = [
    {
      Header: "Người dùng",
      accessor: "user_obj",
      role: [ROLE_USER.USER_DEFAULT],
      sticky: "left",
      Cell: ({ value, row }) => {
        return (
          <Flex style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <FaRegUserCircle color="#80808080" style={{ width:'30px', height: '30px', marginRight: '9px' }} />
            <Text fontWeight={"600"} color={"black"}>
              {value?.fullname}
            </Text>
          </Flex>
        )
      }
    },
    {
      Header: "Loại gói",
      accessor: "package_name",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        const badgeStyle = value === "premium" 
          ? { background: 'linear-gradient(45deg, orange 0%, rgb(250, 82, 82) 100%)', color: 'white' } 
          : { background: 'green', color: 'white' };

        return (
          <Flex align='center'>
            <Badge
                style={{ ...badgeStyle, fontWeight: 500, borderRadius: '6px'}}
                justifyContent="center"
                alignContent="center"
            >
                {value}
            </Badge>
          </Flex>
        )
        return (
          <Flex align='center'>
            <Text color="black" fontSize='sm'>
            <Badge variant='solid' borderColor="white" bgColor='green' justifyContent="center"  color="white"
                alignContent="center">{value?.toUpperCase()}</Badge>
            </Text>
          </Flex>
        )
      }
    },
    {
      Header: "Số luồng",
      accessor: "stream_number",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <span style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <MdOutlineHub style={{ color: 'orange', marginRight: '7px', width: '25px', height: '25px' }} />
            <Text
              colorScheme="black" 
              fontSize={{ base: "sm", }}
              me='8px'>{value} luồng
            </Text>
          </span>
        )
      }
    },
    {
      Header: "Thời hạn",
      accessor: "package_days",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <span style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <MdOutlineDateRange style={{ color: '#80808080', marginRight: '7px', width: '22px', height: '22px' }}/>
            <Text
              colorScheme="black" 
              fontSize={{ base: "sm", }}>{value} ngày
            </Text>
          </span>
        )
      }
    },
  ];

  const colPayment = [
    {
      Header: "Giá ban đầu",
      accessor: "price",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Text
            colorScheme="black" 
            textDecoration="line-through"
            fontSize={{ base: "sm", }}
            me='8px'>{value?.toLocaleString()} VNĐ
          </Text>
        )
      }
    },
    {
      Header: "khuyến mãi",
      accessor: "discount",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Text
            colorScheme="black" 
            fontSize={{ base: "sm", }}
            me='8px'>{value} %
          </Text>
        )
      }
    },
    {
      Header: "Tổng cộng",
      accessor: "final_price",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Text
            textColor="facebook.600"
            fontWeight="600" 
            fontSize={{ base: "sm", }}
            me='8px'>{value?.toLocaleString()} VNĐ
          </Text>
        )
      }
    },
  ]

  const col3 = [
    {
      Header: "Từ ngày",
      accessor: "",
      Cell: ({ value, row }) =>  {
        return (
          <Text fontSize={"sm"} fontWeight="bold" style={{ display: 'flex', alignContent: 'center', alignItems: 'center', fontStyle: 'italic', color: 'gray' }}>
            <MdAccessTime color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
            {row.original?.started_at ? reverseTimeDate(row?.original?.started_at) : "..."}
          </Text>
        )
      }
    },
    {
      Header: "Đến ngày",
      accessor: "",
      Cell: ({ value, row }) =>  {
        return (
          <Text fontSize={"sm"} fontWeight="bold" style={{ display: 'flex', alignContent: 'center', alignItems: 'center', fontStyle: 'italic', color: 'gray' }}>
            <MdAccessTime color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
            {row.original?.expired_at ? reverseTimeDate(row?.original?.expired_at) : "..."}
          </Text>
        )
      }
    },
    {
      Header: "Xác nhận",
      accessor: "confirmed",
      role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER],
      Cell: ({ value, row }) => {
        return (
          <Flex align='center'>
            <Icon
              w='24px'
              h='24px'
              me='5px'
              color={
                value === true
                  ? "green.500"
                  : value === false
                  ? "red.500"
                  : null
              }
              as={
                value === true
                  ? MdCheckCircle
                  : value === false
                  ? MdCancel
                  : null
              }
            />
            <Text color="black" fontSize='sm' fontWeight='700'>
              {value === true ? 'Đã xác nhận' : 'Chưa xác nhận'}
            </Text>
          </Flex>
        )
      }
    },
    {
      Header: "Hành động",
      accessor: "",
      role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER],
      Cell: ({ value, row }) => {
        if (!row?.original?.confirmed) {
          return (
            <MenuAgent
              originalData={row?.original}
              setMenuSelected={setMenuSelected}
              confirmActivePackage={() => {
                confirmActivePackage(row.original)
              }}
            />
          )
        } else {
          return '...';
        }
      }
    },
  ]

  const columnsServerAgent = [...col1, ...colPayment, ...col3];
  const columnsServerAgentNoPayment = [...col1, ...col3];

  const handleOpenModalCreateAgent = () => {
    onOpenNewAgentServer();
  }

  const confirmActivePackage = (item) => {
    setSelectedAgentServer(item);
    onOpenConfirmPayment();
  }

  const handleConfirmConfirmActivePackage= async () => {
    try {
        const responseConfirmReset = await adminConfirmUserPackageApi({ id: menuSelected?.id });
        if (responseConfirmReset.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
            onCloseConfirmPayment();
            window.location.reload();
            await handleFetchListUserPack();
        }
    } catch (err) {
        if (err?.response) {
            toast.error(t(`error_code.${err?.response?.data.error_code}`));
        }
        onCloseConfirmPayment();
    }
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModalCustomGeneral
        size={"lg"}
        isOpen={isOpenNewAgentServer}
        onClose={onCloseNewAgentServer}
        title="Tạo luồng livestream"
        content={
          <CreateNewPackage
            dataGeneral={selectedAgentServer}
            listAdmin={listAdmin}
            handleFetchResource={handleFetchListUserPack}
            onClose={onCloseNewAgentServer}
          />
        }
      />
      <ModalCustomGeneral
        size="xl"
        isOpen={isOpenConfirmPayment}
        onClose={onCloseConfirmPayment}
        title="Xác nhận luồng"
        content="Xác nhận thông tin luồng chính xác. Tiếp tục ?"
        footer={true}
        handleConfirm={handleConfirmConfirmActivePackage}
      />
      {
        tableList?.length === 0 ? (
          <TableEmpty
            columnsData={columnsServerAgent}
            tableData={[]}
            filterHeader={
              <FilterHeader
                title="Danh sách đăng ký gói "
                onModalCreate={handleOpenModalCreateAgent}
              />
            }
          />
        ) : (
          <TableUserManager
            paginationData={paginationData}
            filterHeader={
              <FilterHeader
                title="Danh sách đăng ký gói "
                onModalCreate={handleOpenModalCreateAgent}
              />
            }
            columnsData={ showPayment === true ? columnsServerAgent : columnsServerAgentNoPayment}
            tableData={tableList}
            handleFetchResource={handleFetchListUserPack}
          />
        )
      }
    </Box>
  );
}