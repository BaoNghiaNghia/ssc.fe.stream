/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Switch,
  Text,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { HiCheck, HiX } from "react-icons/hi"

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { DEFAULT_PERPAGE, MESSSAGE_STATUS_CODE, ROLE_USER } from "../../../variables/index";

import TableEmpty from "../list-user-livestream/components/TableEmpty";
import FilterHeader from "./components/FilterHeader";
import TableUserManager from "./components/TableUserManager";
import { fetchListAllGoogleKeyAPI } from "../../../api/GoogleKey";
import CreateGoogleKey from "./components/CreateGoogleKey";
import AvatarText from '../../../components/AvatarText';
import ModalCustomGeneral from "../../../components/modal/ModalCustomGeneral";
import { MdAccessTime } from "react-icons/md";
import { reverseTimeDate } from "../../../utils/handleValidate";

export default function ManageGoogleKey() {
  const [tableList, setTableList] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  const {
    isOpen: isOpenNewGoogleKey,
    onOpen: onOpenNewGoogleKey,
    onClose: onCloseNewGoogleKey
  } = useDisclosure();

  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(DEFAULT_PERPAGE);

  const handleFetchListUserPack = async (page, limit) => {
    try {
      const respListGoogleKey = await fetchListAllGoogleKeyAPI({ page, limit });
      if (respListGoogleKey?.data?.error_code === 0) {
        setPaginationData(respListGoogleKey.data.data?.meta);
        setTableList(respListGoogleKey.data.data?.google_keys);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }

  useEffect(() => {
    handleFetchListUserPack(currentPage, limitPage);
  }, [currentPage, limitPage]);

  const col1 = [
    {
      Header: "Email",
      accessor: "email",
      role: [ROLE_USER.USER_DEFAULT],
      sticky: "left",
      Cell: ({ value, row }) => {
        const truncateName = (value) => (value.length > 25 ? `${value.substring(0, 22)}...` : value);
        return (
          <Flex style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <AvatarText name={value} inputSize="md" />
            <Text fontWeight={"500"} color={"black"}>
              {truncateName(value)}
            </Text>
          </Flex>
        )
      }
    },
    {
      Header: "Key",
      accessor: "key",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return <code>{value}</code>
      }
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Switch
            colorPalette="blue"
            size="lg"
            isChecked={value}
            thumbLabel={{ on: <><HiCheck />Hoạt động</>, off: <><HiX />Không hoạt động</> }}
          />
        )
      }
    },
    {
      Header: "Khởi tạo",
      accessor: "created_at",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Text fontSize={"sm"} fontWeight="600" style={{ display: 'flex', alignContent: 'center', alignItems: 'center', color: 'gray' }}>
            <MdAccessTime color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
            {reverseTimeDate(value)}
          </Text>
        )
      }
    },
    {
      Header: "Cập nhật",
      accessor: "updated_at",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Text fontSize={"sm"} fontWeight="600" style={{ display: 'flex', alignContent: 'center', alignItems: 'center', color: 'gray' }}>
            <MdAccessTime color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
            {reverseTimeDate(value)}
          </Text>
        )
      }
    },
    {
      Header: "Hành động",
      accessor: "",
      role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER],
      Cell: ({ value, row }) => {
        if (!row?.original?.confirmed) {
          return (<span>{value}</span>)
        } else {
          return '...';
        }
      }
    },
  ];

  const handleOpenModalCreateAgent = () => {
    onOpenNewGoogleKey();
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModalCustomGeneral
        size="lg"
        isOpen={isOpenNewGoogleKey}
        onClose={onCloseNewGoogleKey}
        title="Tạo mới Google Key"
        content={
          <CreateGoogleKey
            handleFetchResource={handleFetchListUserPack}
            onClose={onCloseNewGoogleKey}
          />
        }
      />
      {
        tableList?.length === 0 ? (
          <TableEmpty
            columnsData={col1}
            tableData={[]}
            filterHeader={
              <FilterHeader
                title="Danh sách google keys "
                onModalCreate={handleOpenModalCreateAgent}
              />
            }
          />
        ) : (
          <TableUserManager
            paginationData={paginationData}
            filterHeader={
              <FilterHeader
                title="Danh sách google keys "
                onModalCreate={handleOpenModalCreateAgent}
              />
            }
            columnsData={ col1}
            tableData={tableList}
            handleFetchResource={handleFetchListUserPack}
          />
        )
      }
    </Box>
  );
}