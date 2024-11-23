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
import { deleteGoogleKeyAPI, fetchListAllGoogleKeyAPI } from "../../../api/GoogleKey";
import CreateGoogleKey from "./components/CreateGoogleKey";
import AvatarText from '../../../components/AvatarText';
import ModalCustomGeneral from "../../../components/modal/ModalCustomGeneral";
import { MdAccessTime } from "react-icons/md";
import { reverseTimeDate } from "../../../utils/handleValidate";
import MenuAgent from "./components/MenuAgent";
import DetailGoogleKey from "./components/DetailGoogleKey";
import EditGoogleKey from "./components/EditGoogleKey";

export default function ManageGoogleKey() {
  const [tableList, setTableList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [menuSelected, setMenuSelected] = useState();
  const [selectedRow, setSelectedRow] = useState({});

  const {
    isOpen: isOpenNewGoogleKey,
    onOpen: onOpenNewGoogleKey,
    onClose: onCloseNewGoogleKey
  } = useDisclosure();

  const {
    isOpen: isOpenDetailGoogleKey,
    onOpen: onOpenDetailGoogleKey,
    onClose: onCloseDetailGoogleKey
  } = useDisclosure();

  const {
    isOpen: isOpenEditGoogleKey,
    onOpen: onOpenEditGoogleKey,
    onClose: onCloseEditGoogleKey
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteGoogleKey,
    onOpen: onOpenDeleteGoogleKey,
    onClose: onCloseDeleteGoogleKey
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
        toast.error(t(`error_code.${err?.response?.data?.error_code}`));
      }
    }
  }

  useEffect(() => {
    handleFetchListUserPack(currentPage, limitPage);
  }, [currentPage, limitPage]);

  const detailGoogleKey = (item) => {
    setSelectedRow(item);
    onOpenDetailGoogleKey();
  }
  const editGoogleKey = (item) => {
    setSelectedRow(item);
    onOpenEditGoogleKey();
  }
  const deleteGoogleKey = (item) => {
    setSelectedRow(item);
    onOpenDeleteGoogleKey();
  }

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
        return (
          <MenuAgent
            originalData={row?.original}
            setMenuSelected={setMenuSelected}
            detailGoogleKey={() => {detailGoogleKey(row?.original)}}
            editGoogleKey={() => {editGoogleKey(row?.original)}}
            deleteGoogleKey={() => {deleteGoogleKey(row?.original)}}
          />
        )
      }
    },
  ];

  const handleOpenModalCreateAgent = () => {
    onOpenNewGoogleKey();
  }

  const handleConfirmDeleteGoogleKey = async () => {
    try {
        const responseConfirmReset = await deleteGoogleKeyAPI({id: menuSelected?.id});

        if (responseConfirmReset.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
            onCloseDeleteGoogleKey();

            window.location.reload();
            await handleFetchAgentServerOfUserOriginal();
        }
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err?.response?.data?.error_code}`));
        }
        onCloseDeleteGoogleKey();
    }
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
      <ModalCustomGeneral
        size="lg"
        isOpen={isOpenDetailGoogleKey}
        onClose={onCloseDetailGoogleKey}
        title="Chi tiết Google Key"
        content={
          <DetailGoogleKey
            dataGeneral={selectedRow}
            handleFetchResource={handleFetchListUserPack}
            onClose={onCloseDetailGoogleKey}
          />
        }
      />
      <ModalCustomGeneral
        size="lg"
        isOpen={isOpenEditGoogleKey}
        onClose={onCloseEditGoogleKey}
        title="Cập nhật Google Key"
        content={
          <EditGoogleKey
            dataGeneral={selectedRow}
            handleFetchResource={handleFetchListUserPack}
            onClose={onCloseEditGoogleKey}
          />
        }
      />
      <ModalCustomGeneral
        size="xl"
        isOpen={isOpenDeleteGoogleKey}
        onClose={onCloseDeleteGoogleKey}
        title="Xóa google key"
        content="Xóa google key đã chọn. Tiếp tục ?"
        footer={true}
        handleConfirm={handleConfirmDeleteGoogleKey}
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