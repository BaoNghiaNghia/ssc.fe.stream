/* eslint-disable */
// Chakra imports
import React, { useEffect, useState } from "react";
import {
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { DEFAULT_PERPAGE, MESSSAGE_STATUS_CODE, ROLE_USER } from "../../../variables/index";

import TableEmpty from "../list-user-livestream/components/TableEmpty";
import { useAuth } from "../../../contexts/authenContext";
import FilterHeader from "./components/FilterHeader";
import TableUserManager from "./components/TableUserManager";
import { fetchListAllGoogleKeyAPI } from "../../../api/GoogleKey";

export default function ManageGoogleKey() {
  const [tableList, setTableList] = useState([]);
  const [paginationData, setPaginationData] = useState({});

  const { profile } = useAuth();

  const {
    isOpen: isOpenNewAgentServer,
    onOpen: onOpenNewAgentServer,
    onClose: onCloseNewAgentServer
  } = useDisclosure();

  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(DEFAULT_PERPAGE);

  const handleFetchListUserPack = async (page, limit) => {
    try {
      const respListGoogleKey = await fetchListAllGoogleKeyAPI({ page, limit });

      if (respListGoogleKey.error_code === MESSSAGE_STATUS_CODE.SUCCESS.code) {
        let adminList = respListGoogleKey.data.data;
        setPaginationData(adminList?.meta);
        setTableList(adminList?.google_keys);
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
        return (
          <span>{value}</span>
        )
      }
    },
    {
      Header: "Key",
      accessor: "key",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return <span>{value}</span>
      }
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (<span>{value}</span>)
      }
    },
    {
      Header: "Khởi tạo",
      accessor: "created_at",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (<span>{value}</span>)
      }
    },
    {
      Header: "Cập nhật",
      accessor: "updated_at",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (<span>{value}</span>)
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
    onOpenNewAgentServer();
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {
        tableList?.length === 0 ? (
          <TableEmpty
            columnsData={col1}
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
            columnsData={ col1}
            tableData={tableList}
            handleFetchResource={handleFetchListUserPack}
          />
        )
      }
    </Box>
  );
}