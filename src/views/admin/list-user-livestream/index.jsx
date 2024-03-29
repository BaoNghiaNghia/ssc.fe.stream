/* eslint-disable */
// Chakra imports
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Icon,
  Text,
  Badge,
  useDisclosure,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import TableListLiveStream from "./components/TableListLiveStream";

// Assets
import { MESSSAGE_STATUS_CODE, USER_PACKAGE_STATUS, USER_PACKAGE_USED} from "../../../variables/index";
import { fetchListUserStreamApi } from "../../../api/Stream/index";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { removeEmpty, reverseTimeDate, truncate } from "../../../utils/handleValidate";
import MenuUserStream from "./components/MenuUserStream";
import ModalCustom from "./components/ModalCustom";
import activity from 'react-useanimations/lib/activity';
import UseAnimations from "react-useanimations";
import { MdLockReset, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import EditUserStream from "./components/EditUserStream";
import TableEmpty from "./components/TableEmpty";
import FilterHeader from "./components/FilterHeader";
import FormFilterCustom from "./components/FilterForm";
import ModalCustomGeneral from "../../../components/modal/ModalCustomGeneral";

const initFormFilter = {
  keyword: ''
}

export default function ListUserLivestream() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableUserStream, setTableUserStream] = useState({});
  const [paginationData, setPaginationData] = useState({});
  const [selectedUserStream, setSelectedUserStream] = useState({});
  const [showArr, setShowArr] = useState([]);
  const [filter, setFilter] = useState(initFormFilter);

  const [activeFilter, setActiveFilter] = useState(false);

  const handleClickArr = (id, value) => {
    let myArray = [...showArr],
    objIndex = showArr.findIndex((obj => obj.id == id));
    myArray[objIndex].value = !value;
    setShowArr(myArray);
  };

  const {
    isOpen: isOpenUserStream,
    onOpen: onOpenUserStream,
    onClose: onCloseUserStream
  } = useDisclosure();

  const {
    isOpen: isOpenFilterModal,
    onOpen: onOpenFilterModal,
    onClose: onCloseFilterModal
} = useDisclosure();

  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  const onSearchVideoStream = (value) => {
    setFilter(prevState => ({ ...prevState, keyword: value }));
  }

  const handleSearchTable = async (string) => {
    setSearch(string);
    try {
      setTimeout(async () => {
        await handleFetchResource({
          search: string
        });
      }, 1000);
    } catch (err) {
      if (err.response) {
        toast.error(t(`error_code.${err.response.data.error_code}`));
      }
      console.log(err);
    }
  }

  const handleConfirmFilter = async () => {
    try {
      console.log('--- filter nè ---')
        await handleFetchResource({});
        // setActiveFilter(true);
        onCloseFilterModal();
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
        onCloseFilterModal();
    }
  }

  const handleFetchResource = async (params) => {
    setIsLoading(true);
    try {
      let filterParams = removeEmpty(filter);
      const responseUserStream = await fetchListUserStreamApi({...params, ...filterParams} || {});
      let dataUserStream = [];
      if (responseUserStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
          dataUserStream = responseUserStream.data.data.items;
          let stateTemp = dataUserStream.map((item, index) => {
            return {
              id: index,
              value: false
            }
          });
          setShowArr(stateTemp);
          setPaginationData(responseUserStream.data.data.meta);
          setIsLoading(false);
      }
      setTableUserStream(dataUserStream);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err.response) {
        toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }

  const handleFetchResourceOriginal = async (params) => {
    setIsLoading(true);
    try {
      const responseUserStream = await fetchListUserStreamApi(params || {});
      let dataUserStream = [];
      if (responseUserStream.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
          dataUserStream = responseUserStream.data.data.items;
          let stateTemp = dataUserStream.map((item, index) => {
            return {
              id: index,
              value: false
            }
          });
          setShowArr(stateTemp);
          setPaginationData(responseUserStream.data.data.meta);
          setIsLoading(false);
      }
      setTableUserStream(dataUserStream);
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
    handleFetchResourceOriginal({});
  }, []);

  const handleOpenFilterModal = () => {
    onOpenFilterModal();
  }

  const handleResetFilter = async () => {
    try {
        setFilter(prevState => ({ ...prevState, 'keyword': '' }));
        // setActiveFilter(false);
        await handleFetchResourceOriginal();
        onCloseFilterModal();
    } catch (err) {
        if (err.response) {
            toast.error(t(`error_code.${err.response.data.error_code}`));
        }
        onCloseFilterModal();
    }
}

  const editCurrUserStream = (item) => () => {
    setSelectedUserStream(item);
    onOpenUserStream();
  }

  const columnsDataComplex = [
    {
      Header: "Tên luồng",
      accessor: "name",
      Cell: ({ value, row }) => {
        return (
          <Text fontWeight={"bold"} color={"black"}>
            { truncate(value, 25) }
          </Text>
        )
      }
    },
    {
      Header: "Mô tả",
      accessor: "description",
      Cell: ({ value, row }) => {
        return (
          <>
            { value !== "" ? (
              <Text color="black">{ truncate(value, 25) }</Text>
            ): (<Text>...</Text>)}
          </>
        )
      }
    },
    {
      Header: "Mã livestream",
      accessor: "key",
      Cell: ({ value, row }) => {
        let objIndex = showArr.findIndex((obj => obj.id == row.index));
        let state = showArr[objIndex].value
        return (
          <InputGroup size='md'>
            <Input
              name="key"
              value={value}
              // onChange={(e) => setInputValue("key", e.target.value)}
              isRequired={true}
              fontSize='sm'
              color="black"
              isDisabled={true}
              placeholder="Chưa có key"
              size='lg'
              type={state ? "text" : "password"}
              variant='auth'
            />
            <InputRightElement display='flex' alignItems='center' mt='4px'>
              <Icon
                color="black"
                _hover={{ cursor: "pointer" }}
                as={state ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={() => handleClickArr(row.index, state)}
              />
            </InputRightElement>
          </InputGroup>
        )
      }
    },
    {
      Header: "Từ ngày",
      accessor: "",
      Cell: ({ value, row }) =>  {
        return (
          <Text fontSize={"sm"} fontWeight="bold">
              {reverseTimeDate(row.original.started_at)}
            </Text>
        )
      }
    },
    {
      Header: "Đến ngày",
      accessor: "",
      Cell: ({ value, row }) =>  {
        return (
          <Text fontSize={"sm"} fontWeight="bold">
                {reverseTimeDate(row.original.expired_at)}
            </Text>
        )
      }
    },
    {
      Header: "Sử dụng",
      accessor: "",
      Cell: ({ value, row }) => {
        console.log('--- chec k-----', row.original?.live_streaming)
        return (
            <Flex align='center'>
              {
                (row.original?.live_streaming == true) ? (
                  <Text w="fit-content" style={{ display: "inline-flex" }} borderRadius="3px" py="3px" px="6px" fontSize="13px"
                    bg="green"
                    color="white">
                    <UseAnimations 
                      name="activity"
                      animation={activity} size={22}
                      className="animation-icon"
                      fillColor="green"
                      strokeColor="white"
                    />
                    {USER_PACKAGE_USED[Number(row.original?.live_streaming)]?.message}
                  </Text>
                ) :  (
                  // <Badge borderRadius="4px" variant='solid' colorScheme={USER_PACKAGE_USED[Number(row.original?.live_streaming)]?.color}>
                  //   <Text fontSize='xs' fontWeight='500'> 
                  //       {USER_PACKAGE_USED[Number(row.original?.live_streaming)]?.message}
                  //   </Text>
                  // </Badge>
                  '...'
                )
              }
            </Flex>
        )
      }
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value, row }) => {
        return (
            <Flex align='center'>
                <Badge borderRadius="4px" variant='subtle' colorScheme={USER_PACKAGE_STATUS[value]?.color}>
                    <Text fontSize='xs' fontWeight='700'> 
                        {USER_PACKAGE_STATUS[value].message}
                    </Text>
                </Badge>
            </Flex>
        )
      }
    },
    {
      Header: "Chỉnh sửa",
      accessor: "",
      Cell: ({ value, row }) => {
        return (
          <MenuUserStream
            // idVideo={row.original.id}
            editCurrUserStream={editCurrUserStream(row.original)}
          />
        )
      }
    }
  ];

  const filterGroup = () => {
    return (
        <FilterHeader
            title="Danh sách luồng"
            handleOpenFilterModal={handleOpenFilterModal}
            activeFilter={activeFilter}
        />
    )
}

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <ModalCustom
        size={"lg"}
          isOpen={isOpenUserStream}
          onClose={onCloseUserStream}
          title="Chỉnh sửa luồng"
          content={
            <EditUserStream
              dataGeneral={selectedUserStream}
              handleFetchResource={handleFetchResourceOriginal}
              onCloseUserStream={onCloseUserStream}
            />
          }
      />
      <ModalCustomGeneral
        size="lg"
        isOpen={isOpenFilterModal}
        onClose={onCloseFilterModal}
        title="Bộ lọc tìm kiếm"
        content={
            <FormFilterCustom
                filter={filter}
                onSearch={onSearchVideoStream}
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
        Object.keys(tableUserStream).length == 0 ? (
          <TableEmpty
            columnsData={columnsDataComplex}
            filterGroup={filterGroup()}
            tableData={[]}
          />
        ) : (
          <TableListLiveStream
            filterGroup={filterGroup()}
            isLoading={isLoading}
            search={search}
            onSearch={handleSearchTable}
            paginationData={paginationData}
            columnsData={columnsDataComplex}
            tableData={tableUserStream}
            handleFetchResource={handleFetchResourceOriginal}
          />
        )
      }
    </Box>
  );
}