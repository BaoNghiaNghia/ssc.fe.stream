/* eslint-disable */
// Chakra imports
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { HiOutlineMail } from "react-icons/hi";

import { MESSSAGE_STATUS_CODE } from "../../../variables/index";

import TableEmpty from "../list-user-livestream/components/TableEmpty";
import ModalCustomGeneral from "../../../components/modal/ModalCustomGeneral";
import FilterHeader from "./components/FilterHeader";
import TableUserManager from "./components/TableUserManager";
import { fetchAdminListUser } from "../../../api/Auth";
import CreateNewUser from "./components/CreateNewPackage";
import { FaRegUserCircle } from "react-icons/fa";

export default function ListAccountUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [paginationData, setPaginationData] = useState({});
  const [selectedAgentServer, setSelectedAgentServer] = useState({});

  const [listAdminUser, setListAdminUser] = useState([]);

  const {
    isOpen: isOpenNewAgentServer,
    onOpen: onOpenNewAgentServer,
    onClose: onCloseNewAgentServer
  } = useDisclosure();

  const { t } = useTranslation();

  const handleFetchListUserDetail = async (params) => {
    setIsLoading(true);
    try {
        const responseEdit = await fetchAdminListUser(params || {});
        if (responseEdit.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            setListAdminUser(responseEdit.data.data.users);
            setPaginationData(responseEdit.data.data.meta);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
    }
  }

  useEffect(() => {
    handleFetchListUserDetail();
  }, []);

  const columnsListUser = [
    {
      Header: "Người dùng",
      accessor: "fullname",
      sticky: "left",
      Cell: ({ value, row }) => {
        return (
          <Flex style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <FaRegUserCircle color="#80808080" style={{ width:'30px', height: '30px', marginRight: '9px' }} />
            <Text fontSize="sm" fontWeight={"600"} color={"black"}>
              {value}
            </Text>
          </Flex>
        )
      }
    },
    {
      Header: "Email",
      accessor: "email",
      sticky: "left",
      Cell: ({ value, row }) => {
        return (
          <Flex>
            <HiOutlineMail color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
            <Text fontSize="sm" fontWeight={"500"} color={"gray.500"}>
              {value}
            </Text>
          </Flex>
        )
      }
    }
  ];

  const handleOpenModalCreateAgent = () => {
    onOpenNewAgentServer();
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModalCustomGeneral
        size={"lg"}
        isOpen={isOpenNewAgentServer}
        onClose={onCloseNewAgentServer}
        title="Tạo người dùng"
        content={
          <CreateNewUser
            dataGeneral={selectedAgentServer}
            listAdmin={listAdminUser}
            handleFetchResource={handleFetchListUserDetail}
            onClose={onCloseNewAgentServer}
          />
        }
      />
      <Grid
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={2}
        >
        <GridItem colSpan={1} margin="auto 0">     
          {
            listAdminUser.length === 0 ? (
              <TableEmpty
                columnsData={columnsListUser}
                tableData={[]}
              />
            ) : (
              <TableUserManager
                paginationData={paginationData}
                filterHeader={
                  <FilterHeader
                    title="Danh sách người dùng"
                    onModalCreate={handleOpenModalCreateAgent}
                  />
                }
                columnsData={columnsListUser}
                tableData={listAdminUser}
                handleFetchResource={handleFetchListUserDetail}
              />
            )
          }
        </GridItem>
      </Grid>
    </Box>
  );
}