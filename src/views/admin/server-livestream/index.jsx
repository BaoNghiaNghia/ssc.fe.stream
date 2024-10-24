/* eslint-disable */
// Chakra imports
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Badge,
  useDisclosure,
  Switch,
  Button,
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FiServer } from "react-icons/fi";

import { MESSSAGE_STATUS_CODE, ROLE_USER, listOptionServerAgent, statusFieldVideo } from "../../../variables/index";
import { fetchListAgentServerOfUser, fetchListAdminAgentServerStream, resetAdminAgentServerStream, deleteAgentServerStream, resetAgentServerStream } from "../../../api/Stream/index";
import { checkRoleUser, formatDate, getCurrRoleUser, removeEmpty } from "../../../utils/handleValidate";

import TableEmpty from "../list-user-livestream/components/TableEmpty";
import TableManageServerLivestream from "./components/TableManageServerLivestream";
import MenuAgent from "./components/MenuAgent";
import { useAuth } from "../../../contexts/authenContext";
import ModalCustomGeneral from "../../../components/modal/ModalCustomGeneral";
import EditAgentServer from "./components/EditAgentServer";
import FilterHeader from "./components/FilterHeader";
import CreateAgentServer from "./components/CreateAgentServer";
import DetailAgentServer from "./components/DetailAgentServer";
import AssignAgentFor from "./components/AssignAgentFor";
import { MdComputer, MdLockReset, MdPersonOutline } from "react-icons/md";
import { truncate } from "lodash";
import FormFilterCustom from "./components/FormFilterCustom";
import AssignResellerFor from "./components/AssignResellerFor";

const initFormFilter = {
  keyword: '',
  order_by: null
}

export default function ServerLiveStreamAgent() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableServerLivestream, setTableServerLivestream] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [selectedAgentServer, setSelectedAgentServer] = useState({});
  const [menuSelected, setMenuSelected] = useState();

  const [filter, setFilter] = useState(initFormFilter);

  const { profile } = useAuth();

  const {
    isOpen: isOpenEditAgentServer,
    onOpen: onOpenEditAgentServer,
    onClose: onCloseEditAgentServer
  } = useDisclosure();

  const {
    isOpen: isOpenNewAgentServer,
    onOpen: onOpenNewAgentServer,
    onClose: onCloseNewAgentServer
  } = useDisclosure();

  const {
    isOpen: isOpenFilterModal,
    onOpen: onOpenFilterModal,
    onClose: onCloseFilterModal
  } = useDisclosure();

  const {
    isOpen: isOpenAssignAgentServer,
    onOpen: onOpenAssignAgentServer,
    onClose: onCloseAssignAgentServer
  } = useDisclosure();

  const {
    isOpen: isOpenAssignAgentResellerServer,
    onOpen: onOpenAssignAgentResellerServer,
    onClose: onCloseAssignAgentResellerServer
  } = useDisclosure();

  const {
    isOpen: isOpenDetailAgentServer,
    onOpen: onOpenDetailAgentServer,
    onClose: onCloseDetailAgentServer
  } = useDisclosure();

  const {
    isOpen: isOpenResetAgent,
    onOpen: onOpenResetAgent,
    onClose: onCloseResetAgent
  } = useDisclosure();

  const {
    isOpen: isOpenDelAgentServer,
    onOpen: onOpenDelAgentServer,
    onClose: onCloseDelAgentServer
  } = useDisclosure();

  const { t } = useTranslation();

  const handleFetchAgentServerOfUser = async (params) => {
    setIsLoading(true);
    try {
      let serverInfo = {}
      if ([ROLE_USER.ADMIN, ROLE_USER.RESELLER].includes(getCurrRoleUser(profile))) {
        let filterParams = removeEmpty(filter);
        if (filterParams['order_by']) {
            let orderByArr = filterParams['order_by'].split(" ");
            filterParams['order'] = orderByArr[0]
            filterParams['by'] = orderByArr.slice(-1).pop();
            delete filterParams['order_by'];
        }

        const responseServerLivestream = await fetchListAdminAgentServerStream({ ...params, ...filterParams });
        if (responseServerLivestream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
          serverInfo = responseServerLivestream.data.data;
          setPaginationData(serverInfo.meta);
          setTableServerLivestream(serverInfo.items);
        }
      } else if (getCurrRoleUser(profile) === ROLE_USER.USER_DEFAULT) {
        const responseServerLivestream = await fetchListAgentServerOfUser(params || {});
        if (responseServerLivestream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
          serverInfo = responseServerLivestream.data.data;
          setPaginationData(serverInfo.meta);
          setTableServerLivestream(serverInfo.items);
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err.response) {
        toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }

  const handleFetchAgentServerOfUserOriginal = async (params) => {
    setIsLoading(true);
    try {
      let serverInfo = {}
      if ([ROLE_USER.ADMIN, ROLE_USER.RESELLER].includes(getCurrRoleUser(profile))) {
        const responseServerLivestream = await fetchListAdminAgentServerStream(params || {});
        if (responseServerLivestream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
          serverInfo = responseServerLivestream.data.data;
          setPaginationData(serverInfo.meta);
          setTableServerLivestream(serverInfo.items);
        }
      } else if (getCurrRoleUser(profile) === ROLE_USER.USER_DEFAULT) {
        const responseServerLivestream = await fetchListAgentServerOfUser(params || {});
        if (responseServerLivestream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
          serverInfo = responseServerLivestream.data.data;
          setPaginationData(serverInfo.meta);
          setTableServerLivestream(serverInfo.items);
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err.response) {
        toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }
  

  useEffect(() => {
    handleFetchAgentServerOfUserOriginal({});
  }, []);

  const columnsServerAgent = [
    {
      Header: "Tên",
      accessor: "name",
      role: [ROLE_USER.USER_DEFAULT],
      sticky: "left",
      Cell: ({ value, row }) => {
        return (
          <Flex>
            <FiServer color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
            <Text fontSize="sm" fontWeight={"bold"} color={"black"}>
              {value && truncate(value)}
            </Text>
          </Flex>
        )
      }
    },
    {
      Header: "Mô tả",
      accessor: "description",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <>
            {
              value ? (
                <Text
                  colorScheme="black" 
                  fontSize={{ base: "sm", }}
                  me='8px'>{value && truncate(value)}
                </Text>
              ) : "..."
            }
          </>
        )
      }
    },
    {
      Header: "Phụ trách",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Flex style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            {
              row.original.user_obj ? (
                <>
                  <FaRegUserCircle color="#80808080" style={{ width:'30px', height: '30px', marginRight: '9px' }} />
                  <Text
                    colorScheme="black" 
                    fontWeight={"900"}
                    fontSize={{ base: "sm", }}
                    me='8px'>{row.original.user_obj?.fullname && truncate(row.original.user_obj?.fullname)}
                  </Text>
                </>
              ) : "..."
            }
          </Flex>
        )
      }
    },
    {
      Header: "Reseller",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Flex>
            {
              row.original?.reseller_obj ? (
                <>
                  <Icon as={MdPersonOutline} color="gray" w='20px' h='20px' marginRight="5px"/>
                  <Text
                    colorScheme="black" 
                    fontWeight={"900"}
                    fontSize={{ base: "sm", }}
                    me='8px'>{row.original?.reseller_obj?.fullname && truncate(row.original?.reseller_obj?.fullname)}
                  </Text>
                </>
              ) : "..."
            }
          </Flex>
        )
      }
    },
    {
      Header: "Tối đa",
      accessor: "max_stream",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <Text
            textColor="blue.700"
            fontWeight={"900"}
            fontSize={{ base: "sm", }}
            me='8px'>
            {
              value !== 0 ? (
                <Badge color="white" bg='blackAlpha.600'>
                    {value}
                </Badge>
              ) : <>{value}</>
            }
          </Text>
        )
      }
    },
    {
      Header: "Đang chờ",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        let temp = row.original.statuses.find(item => item.status === 0).total;
        return (
          <Text
            textColor="blue.700"
            fontWeight={"900"}
            fontSize={{ base: "sm", }}
            me='8px'>
            {
              temp !== 0 ? (
                <Badge bg='gray.200'>
                    {temp}
                </Badge>
              ) : <span style={{ color: '#80808080' }}>{temp}</span>
            }
          </Text>
        )
      }
    },
    {
      Header: "Đang phát",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        let temp = row.original.statuses.find(item => item.status === 1).total;
        return (
          <Text
            textColor="blue.700"
            fontWeight={"900"}
            fontSize={{ base: "sm", }}
            me='8px'>
            {
              temp !== 0 ? (
                <Badge colorScheme='green'>
                    {temp}
                </Badge>
              ) : <span style={{ color: '#80808080' }}>{temp}</span>
            }
          </Text>
        )
      }
    },
    {
      Header: "Hoàn thành",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        let temp = row.original.statuses.find(item => item.status === 2).total;
        return (
          <Text
            textColor="blue.700"
            fontWeight={"900"}
            fontSize={{ base: "sm", }}
            me='8px'>
            {
              temp !== 0 ? (
                <Badge colorScheme='blue'>
                    {temp}
                </Badge>
              ) : <span style={{ color: '#80808080' }}>{temp}</span>
            }
          </Text>
        )
      }
    },
    {
      Header: "Đã hủy",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        let temp = row.original.statuses.find(item => item.status === 3).total;
        return (
          <Text
            textColor="blue.700"
            fontWeight={"900"}
            fontSize={{ base: "sm", }}
            me='8px'>
            {
              temp !== 0 ? (
                <Badge colorScheme='orange'>
                    {temp}
                </Badge>
              ) : <span style={{ color: '#80808080' }}>{temp}</span>
            }
          </Text>
        )
      }
    },
    {
      Header: "Lỗi",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        let temp = row.original.statuses.find(item => item.status === 4).total;
        return (
          <Text
            textColor="blue.700"
            fontWeight={"900"}
            fontSize={{ base: "sm", }}
            me='8px'>
            {
              temp !== 0 ? (
                <Badge colorScheme='red' >
                    {temp}
                </Badge>
              ) : <span style={{ color: '#80808080' }}>{temp}</span>
            }
          </Text>
        )
      }
    },
    {
      Header: "Hết hạn",
      accessor: "",
      role: [ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        let temp = row.original.statuses.find(item => item.status === 5).total;
        return (
          <Text
            textColor="blue.700"
            fontWeight={"900"}
            fontSize={{ base: "sm", }}
            me='8px'>
            {
              temp !== 0 ? (
                <Badge colorScheme='green'>
                    {temp}
                </Badge>
              ) : <span style={{ color: '#80808080' }}>{temp}</span>
            }
          </Text>
        )
      }
    },
  ];

  const columnAction = [
    {
      Header: "Hành động",
      accessor: "",
      role: [ROLE_USER.ADMIN, ROLE_USER.USER_DEFAULT],
      Cell: ({ value, row }) => {
        return (
          <MenuAgent
            originalData={row.original}
            setMenuSelected={setMenuSelected}
            detailAgentServer={() => {
              detailAgentServer(row.original)
            }}
            assignAgentFor={() => {
              assignAgentFor(row.original)
            }}
            assignAgentResellerFor={() => {
              assignAgentResellerFor(row.original)
            }}
            editAgentServer={() => {
              editAgentServer(row.original)
            }}
            delAgentServer={() => {
              delAgentServer(row.original)
            }}
            resetAgent={() => {
              resetAgent(row.original)
            }}
          />
        )
      }
    },
  ]

  const columnsAdminServerAgent = [...columnsServerAgent,
    {
      Header: "Ngày hết hạn",
      accessor: "",
      Cell: ({ value, row }) =>  {
        return (
          <Text fontSize={"sm"} fontWeight="bold" style={{ display: 'flex', alignContent: 'center', alignItems: 'center', color:'#80808080' }}>
            <MdAccessTime color="#80808080" style={{ width:'20px', height: '20px', marginRight: '7px' }} />
            {row.original?.expired_at ? formatDate(row.original?.expired_at) : "..."}
          </Text>
        )
      }
    }, 
    {
      Header: "Trạng thái",
      accessor: "status",
      role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER],
      Cell: ({ value, row }) => {
        return (
          <Switch
            isChecked={value}
            size={"lg"}
            pt="10px"
            readOnly
          />
        )
      }
    }
  ];

  const handleConfirmFilter = async () => {
    try {
        await handleFetchAgentServerOfUser();
        onCloseFilterModal();
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
        onCloseFilterModal();
    }
  }

  const handleResetFilter = async () => {
    try {
        setFilter(prevState => ({ ...prevState, 'keyword': '' }));
        setFilter(prevState => ({ ...prevState, 'order_by': null }));


        await handleFetchAgentServerOfUserOriginal();
        onCloseFilterModal();

    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
        onCloseFilterModal();
    }
  }

  const onSearchServer = (value) => {
    setFilter(prevState => ({ ...prevState, keyword: value }));
  }

  const handleChangeStateFilter = (e) => {
    const { name, value } = e.target;
    setFilter(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOpenFilterModal = () => {
    onOpenFilterModal();
  }

  const handleOpenModalCreateAgent = () => {
    onOpenNewAgentServer();
  }

  const detailAgentServer = (item) => {
    setSelectedAgentServer(item);
    onOpenDetailAgentServer();
  }
  
  const assignAgentFor = (item) => {
    setSelectedAgentServer(item);
    onOpenAssignAgentServer();
  }

  const assignAgentResellerFor = (item) => {
    setSelectedAgentServer(item);
    onOpenAssignAgentResellerServer();
  }

  const editAgentServer = (item) => {
    setSelectedAgentServer(item);
    onOpenEditAgentServer();
  }

  const resetAgent = (item) => {
    setSelectedAgentServer(item);
    onOpenResetAgent();
  }
  
  const delAgentServer = (item) => {
    setSelectedAgentServer(item);
    onOpenDelAgentServer();
  }

  const handleConfirmDelAgent = async () => {
    try {
        const responseConfirmReset = await deleteAgentServerStream({id: menuSelected.id});
        if (responseConfirmReset.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
            onCloseDelAgentServer();

            window.location.reload();
            await handleFetchAgentServerOfUserOriginal();

        }
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
        onCloseDelAgentServer();
    }
  }

  const handleConfirmResetAgent = async () => {
    try {
      if (checkRoleUser(profile, ROLE_USER.ADMIN) || checkRoleUser(profile, ROLE_USER.RESELLER)) {
        const responseConfirmReset = await resetAdminAgentServerStream({ id: menuSelected.id });
        if (responseConfirmReset.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
            onCloseResetAgent();
            _sleep(500);
            window.location.reload();
            await handleFetchAgentServerOfUserOriginal();
        }
      } else if (checkRoleUser(profile, ROLE_USER.USER_DEFAULT)) {
        const responseConfirmReset = await resetAgentServerStream({ id: menuSelected.id });
        if (responseConfirmReset.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            toast.success(t(`error_code.${MESSSAGE_STATUS_CODE.SUCCESS.code}`));
            onCloseResetAgent();
            _sleep(500);
            window.location.reload();
            await handleFetchAgentServerOfUserOriginal();
        }
      }
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
        onCloseResetAgent();
    }
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModalCustomGeneral
        size={"lg"}
        isOpen={isOpenNewAgentServer}
        onClose={onCloseNewAgentServer}
        title="Tạo mới Server"
        content={
          <CreateAgentServer
            dataGeneral={selectedAgentServer}
            handleFetchResource={handleFetchAgentServerOfUserOriginal}
            onClose={onCloseNewAgentServer}
          />
        }
      />
      <ModalCustomGeneral
        size={"lg"}
        isOpen={isOpenDetailAgentServer}
        onClose={onCloseDetailAgentServer}
        title="Chi tiết Server"
        content={
          <DetailAgentServer
            dataGeneral={selectedAgentServer}
            handleFetchResource={handleFetchAgentServerOfUserOriginal}
            onClose={onCloseDetailAgentServer}
          />
        }
      />
      <ModalCustomGeneral
        size={"lg"}
        isOpen={isOpenEditAgentServer}
        onClose={onCloseEditAgentServer}
        title="Chỉnh sửa Server Livestream"
        content={
          <EditAgentServer
            dataGeneral={selectedAgentServer}
            handleFetchResource={handleFetchAgentServerOfUserOriginal}
            onClose={onCloseEditAgentServer}
          />
        }
      />
      <ModalCustomGeneral
        size={"lg"}
        isOpen={isOpenAssignAgentServer}
        onClose={onCloseAssignAgentServer}
        title="Gán người dùng"
        content={
          <AssignAgentFor
            dataGeneral={selectedAgentServer}
            handleFetchResource={handleFetchAgentServerOfUserOriginal}
            onClose={onCloseAssignAgentServer}
          />
        }
      />

      <ModalCustomGeneral
        size={"lg"}
        isOpen={isOpenAssignAgentResellerServer}
        onClose={onCloseAssignAgentResellerServer}
        title="Gán Reseller"
        content={
          <AssignResellerFor
            dataGeneral={selectedAgentServer}
            handleFetchResource={handleFetchAgentServerOfUserOriginal}
            onClose={onCloseAssignAgentResellerServer}
          />
        }
      />

      <ModalCustomGeneral
        size="xl"
        isOpen={isOpenResetAgent}
        onClose={onCloseResetAgent}
        title="Khởi động lại server"
        content="Server và các luồng livestream sẽ khởi động lại. Tiếp tục ?"
        footer={true}
        handleConfirm={handleConfirmResetAgent}
      />

      <ModalCustomGeneral
        size="xl"
        isOpen={isOpenDelAgentServer}
        onClose={onCloseDelAgentServer}
        title="Xóa server"
        content="Xóa toàn bộ thông tin server. Tiếp tục ?"
        footer={true}
        handleConfirm={handleConfirmDelAgent}
      />
      <ModalCustomGeneral
        size="md"
        isOpen={isOpenFilterModal}
        onClose={onCloseFilterModal}
        title="Bộ lọc tìm kiếm"
        content={
          <FormFilterCustom
            filter={filter}
            onSearch={onSearchServer}
            handleChangeStateFilter={handleChangeStateFilter}
            listOptionServerAgent={listOptionServerAgent}
            statusFieldVideo={statusFieldVideo}
            setFilter={setFilter}
          />
        }
        handleConfirm={handleConfirmFilter}
        footer={true}
        addButton={
          <Button rightIcon={<MdLockReset fontSize="md" />} 
              colorScheme='blue' variant='ghost' 
              size="md" borderRadius="5px" mr="5px"
              fontWeight="500"
              onClick={handleResetFilter}
              _hover={{
                  bg: "#e2e8f0"
              }}>
              Reset bộ lọc
          </Button>
        }
      />
      {
        tableServerLivestream.length === 0 ? (
          <TableEmpty
            columnsData={columnsServerAgent}
            filterHeader={
              <FilterHeader
                title="Danh sách Server Livestream"
                onModalCreate={handleOpenModalCreateAgent}
                handleOpenFilterModal={handleOpenFilterModal}
              />
            }
            tableData={[]}
          />
        ) : (
          <TableManageServerLivestream
            paginationData={paginationData}
            filterHeader={
              <FilterHeader
                title="Danh sách Server Livestream"
                onModalCreate={handleOpenModalCreateAgent}
                handleOpenFilterModal={handleOpenFilterModal}
              />
            }
            columnsData={
              (checkRoleUser(profile, ROLE_USER.ADMIN) || checkRoleUser(profile, ROLE_USER.RESELLER))
                ? [...columnsAdminServerAgent, ...columnAction]
                : [...columnsServerAgent, ...columnAction]
            }
            // tableData={[]}
            tableData={tableServerLivestream || []}
            handleFetchResource={handleFetchAgentServerOfUserOriginal}
          />
        )
      }
    </Box>
  );
}