import { MdCloudDownload, MdOutlineClose, MdOutlineDone, MdOutlineError, MdPause, MdPlayArrow, MdWatchLater } from "react-icons/md";

/* eslint-disable */
const config = {
    develop: {
        API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:17100'
    },
    production: {
        API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:17100'
    }
};

export const MK_AGENCY_PROVIDER = "stream.api-mht.com";

export const regexYoutubeLink = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const regexProtocol = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const BASE_URL=process.env.REACT_APP_API_URL;

export const PACKAGE_ITEM_COLOR = [
  {
    packageColor: "orange",
    textColor: "black",
  },
  {
    packageColor: "green",
    textColor: "white",
  },
  {
    packageColor: "blue",
    textColor: "white",
  },
  {
    packageColor: "purple",
    textColor: "white",
  },
  {
    packageColor: "teal",
    textColor: "black",
  },
];

// 7 seconds timeout request
export const TIMEOUT_REQUEST_API = 70000;

export const MESSSAGE_STATUS_CODE = {
    SUCCESS: {
        code: 200,
        message: 'Success'
    },
    INTERNAL_NETWORK_ERROR: {
        code: 500,
        message: 'Internal network error'
    },
    NO_CONTENT: {
        code: 204,
        message: 'No content'
    },
    NOT_FOUND: {
        code: 404,
        message: 'Not found'
    },
    BAD_REQUEST: {
        code: 400,
        message: 'Bad request'
    },
    UNAUTHORISED: {
        code: 401,
        message: 'Unauthorized'
    },
    INVALID_BODY: {
        code: 403,
        message: 'Invalid body'
    },
    UNDER_CONSTRUCTION: {
        code: 593,
        message: 'System is currently undergoing maintenance. Please try again later.'
    },
    PERMISSION_DENIED: {
        code: 406,
        message: 'Permission Denied'
    },
    WRONG_PAGINATION: {
        code: 407,
        message: 'Wrong pagination query'
    },
    INVALID_PASSWORD: {
        code: 4000,
        message: 'Invalid password'
    },
    INVALID_BODY: {
        code: 4001,
        message: 'Invalid body'
    },
    INVALID_EMAIL: {
        code: 4002,
        message: 'Invalid email'
    },
    USER_REGISTERED: {
        code: 4003,
        message: 'User already registered'
    },
    USER_NOT_FOUND: {
        code: 4004,
        message: 'User not found'
    },
    EMAIL_PASSWORD_INVALID: {
        code: 4005,
        message: 'Email or password invalid'
    },
    WRONG_PAGINATION_QUERY: {
        code: 4006,
        message: 'Wrong pagination query'
    },
    WRONG_BODY: {
        code: 5002,
        message: 'Wrong body'
    },
    PACKAGE_CONFIRMED: {
        code: 5003,
        message: 'Package already confirmed'
    },
    INVALID_PACKAGE_DAYS: {
        code: 5004,
        message: 'Invalid package days. Must be multiple of 30'
    },
    TRAIL_PACKAGE_CREATED: {
        code: 5005,
        message: 'Trial package already created'
    },
    INVALID_PACKAGE_NAME: {
        code: 5006,
        message: 'Invalid package name'
    },
    CONFLICT_TIME_STREAM: {
        code: 3001,
        message: 'Conflict time stream'
    },
    INVALID_RESOLUTION: {
        code: 3002,
        message: 'Invalid resolution'
    },
    AGENT_EXISTS: {
        code: 3503,
        message: 'Agent exists'
    },
    INVALID_URL: {
      code: 3003,
      message: 'Invalid url'
    },
    INVAID_START_END_TIME: {
      code: 3004,
      message: 'Invalid start end time, ended time must be after started time, and ended time must be after now'
    },
    INVALID_YOUTUBE_STREAM_KEY: {
      code: 3005,
      message: 'Invalid youtube live stream key'
    },
    USER_STREAM_NOT_FOUND: {
      code: 3006,
      message: 'User stream not found'
    },
    STREAMING_NOT_FOUND: {
      code: 3007,
      message: 'Streaming not found'
    },
    STREAMING_NOT_RUNNING: {
      code: 3008,
      message: 'Streaming not running'
    },
    STREAMING_RUNNING: {
      code: 3011,
      message: 'Streaming is streaming'
    },
    STREAM_EXPIRED: {
      code: 3010,
      message: 'Stream expired'
    },
    STREAMING_AGENT_NOT_RUNNING: {
      code: 3009,
      message: 'Stream from agent not running'
    },
    NOT_FOUND_AGENT: {
      code: 3504,
      message: 'Not found agent'
    },
    AGENT_ASSIGNED: {
      code: 3505,
      message: 'Agent assigned'
    },
    AGENT_NOT_RUNNING: {
      code: 3506,
      message: 'Agent not running'
    },
    OUT_OF_MAX_STREAM: {
      code: 3509,
      message: 'Out of max stream'
    },
    ONLY_UPDATE_PENDING_STREAM: {
      code: 3012,
      message: 'Only update pending streaming'
    },
    ONLY_PLAY_PENDING_STREAM: {
      code: 3013,
      message: 'Only play pending streaming'
    },
    INVALID_ORDER_BY: {
      code: 3014,
      message: 'Invalid order by'
    },
    KEY_STREAM_EXIST_IN_OTHER: {
      code: 3601,
      message: 'Key of stream exists at other stream'
    },
    REFUSED_UPDATE_WHEN_STREAMING: {
      code: 3602,
      messsage: 'Can not update stream when it is livestreaming'
    },
    STREAMING_STATUS_DOWNLOADING: {
      code: 6,
      message: 'Video is dowloading'
    }
}

export const listOptionFieldVideo = [
  {
    label: 'Ngày bắt đầu, tăng dần',
    value: 'started_at desc'
  },
  {
      label: 'Ngày bắt đầu, giảm dần',
      value: 'started_at asc'
  },
  {
    label: 'Ngày kết thúc, tăng dần',
    value: 'ended_at desc'
  },
  {
      label: 'Ngày kết thúc, giảm dần',
      value: 'ended_at asc'
  },
  {
    label: 'Ngày tạo, tăng dần',
    value: 'created_at desc'
  },
  {
      label: 'Ngày tạo, giảm dần',
      value: 'created_at asc'
  }
];

export const listOptionServerAgent = [
  {
    label: 'Ngày hết hạn, tăng dần',
    value: 'expired_at desc'
  },
  {
      label: 'Ngày hết hạn, giảm dần',
      value: 'expired_at asc'
  },
]

export const statusFieldVideo = [
  {
      label: 'Đang chờ',
      value: 0
  },
  {
      label: 'Đang phát',
      value: 1
  },
  {
      label: 'Hoàn thành',
      value: 2
  },
  {
      label: 'Đã hủy',
      value: 3
  },
  {
      label: 'Video lỗi',
      value: 4
  },
  {
      label: 'Hết hạn',
      value: 5
  },
]

export default config[process.env.NODE_ENV || 'develop'];

export const VIDEO_RESOLUTION_DEFAULT = {
    '2160p' : {
        resolution: '3840x2610',
        name: '2160p',
        quantity: '4K',
        color: "red"
    },
    '1440p' : {
        resolution: '2560x1440',
        name: '1440p',
        quantity: '2K',
        color: "red"
    },
    '1080p' : {
        resolution: '1920x1080',
        name: '1080p',
        quantity: 'Full HD',
        color: "red"
    },
    '720p' : {
        resolution: '1280x720',
        name: '720p',
        quantity: 'HD',
        color: "orange"
    },
    '480p' : {
        resolution: '854x480',
        name: '480p',
        quantity: 'Standard',
        color: "yellow"
    },
    '360p' : {
        resolution: '640x360',
        name: '360p',
        quantity: 'Normal',
        color: "yellow"
    },
    '240p' : {
        resolution: '426x240',
        name: '240p',
        quantity: 'Youtube mininum',
        color: "yellow"
    },
  };
 
export const columnsInsertVideoStream = [
  {
    Header: "#",
    accessor: "order",
    maxWidth: 100,
    minWidth: 70,
    width: 70,
  },
  {
    Header: "VIDEO",
    accessor: "video",
  },
  {
    Header: "ACTION",
    accessor: "action",
    maxWidth: 100,
    minWidth: 50,
    width: 70,
  }
];

export const MULTI_STEP_FORM_CREATE_STREAM = [
  { title: 'Chọn video', description: "" },
  { title: 'Cấu hình', description: "" },
  { title: 'Thời gian', description: "" }
];

export const columnsPaymentHistory = [
  {
    Header: "TÊN GÓI",
    accessor: "package_name",
  },
  {
    Header: "THỜI HẠN",
    accessor: "package_days",
  },
  {
    Header: "SỐ LUỒNG",
    accessor: "stream_number"
  },
  {
    Header: "TỪ NGÀY",
    accessor: "started_at",
  },
  {
    Header: "ĐẾN NGÀY",
    accessor: "expired_at",
  },
  {
    Header: "GIÁ BAN ĐẦU",
    accessor: "price"
  },
  {
    Header: "KHUYẾN MÃI",
    accessor: "discount"
  },
  {
    Header: "TỔNG CỘNG",
    accessor: "final_price"
  },
  {
    Header: "HIỆU LỰC",
    accessor: "confirmed"
  },
];

export const listPricingMonthly = [
  {
      label: '1 Tháng',
      value: 1
  },
  {
      label: '2 Tháng',
      value: 2
  },
  {
      label: '3 Tháng',
      value: 3
  },
  {
      label: '4 Tháng',
      value: 4
  },
  {
      label: '5 Tháng',
      value: 5
  },
  {
      label: '6 Tháng',
      value: 6
  },
  {
      label: '9 Tháng',
      value: 9
  },
  {
      label: '12 Tháng',
      value: 12
  },
]


export const listStreamThread = [
  {
      label: '100 luồng',
      value: 100
  },
  {
    label: '90 luồng',
    value: 90
  },
  {
    label: '60 luồng',
    value: 60
  },
  {
    label: '50 luồng',
    value: 50
  },
  {
    label: '40 luồng',
    value: 40
  },
  {
    label: '30 luồng',
    value: 30
  },
  {
    label: '20 luồng',
    value: 20
  },
  {
    label: '10 luồng',
    value: 10
  }
]


export const ROLE_USER = {
    USER_DEFAULT: 'user',
    ADMIN: 'admin',
    SUPER_ADMIN: 'superadmin',
    RESELLER: 'reseller'
}

export const resumeData = [
  {
    menu: "Tài khoản"
  },
  {
    menu: "Mật khẩu"
  }
];

export const VIDEO_STATUS_GENERAL = {
  PENDING: 0,
  STREAMING: 1,
  FINISHED: 2,
  CANCELED: 3,
  ERROR: 4,
  EXPIRED_STREAM: 5,
  DOWNLOADING: 6
}

export const VIDEO_STREAMING_STATUS = {
  0: {
    id: 0,
    message: 'Đang chờ',
    // message: 'Pending',
    color: 'gray.200',
    textColor: 'black',
    icon: MdPlayArrow
  },
  6: {
    id: 6,
    message: 'Đang tải',
    // message: 'Streaming',
    color: 'green.100',
    textColor: 'green',
    icon: MdCloudDownload
  },
  1: {
    id: 1,
    message: 'Đang phát',
    // message: 'Streaming',
    color: 'green',
    textColor: 'white',
    icon: MdPause
  },
  2: {
    id: 2,
    message: 'Hoàn thành',
    // message: 'Finished',
    color: 'blue.500',
    textColor: 'white',
    icon: MdOutlineDone
  },
  3: {
    id: 3,
    message: 'Đã hủy',
    // message: 'Canceled',
    color: 'orange',
    textColor: 'black',
    icon: MdOutlineClose
  },
  4: {
    id: 4,
    message: 'Có lỗi',
    // message: 'Error',
    color: 'red',
    textColor: 'white',
    icon: MdOutlineError
  },
  5: {
    id: 5,
    message: 'Hết hạn',
    // message: 'Expired Stream',
    color: 'teal.600',
    textColor: 'white',
    icon: MdWatchLater
  }
}

export const VIDEO_STREAMING_STATUS_STATISTIC = {
  // 0: {
  //   id: 0,
  //   message: 'Đang chờ',
  //   // message: 'Pending',
  //   color: 'gray.200',
  //   textColor: 'black',
  //   icon: MdPlayArrow
  // },
  6: {
    id: 6,
    message: 'Đang tải',
    // message: 'Streaming',
    color: 'green.100',
    textColor: 'green',
    icon: MdCloudDownload
  },
  1: {
    id: 1,
    message: 'Đang phát',
    // message: 'Streaming',
    color: 'green',
    textColor: 'white',
    icon: MdPause
  },
  // 2: {
  //   id: 2,
  //   message: 'Hoàn thành',
  //   // message: 'Finished',
  //   color: 'blue.500',
  //   textColor: 'white',
  //   icon: MdOutlineDone
  // },
  3: {
    id: 3,
    message: 'Đã hủy',
    // message: 'Canceled',
    color: 'orange',
    textColor: 'black',
    icon: MdOutlineClose
  },
  4: {
    id: 4,
    message: 'Có lỗi',
    // message: 'Error',
    color: 'red',
    textColor: 'white',
    icon: MdOutlineError
  },
  5: {
    id: 5,
    message: 'Hết hạn',
    // message: 'Expired Stream',
    color: 'teal.600',
    textColor: 'white',
    icon: MdWatchLater
  }
}

export const USER_PACKAGE_STATUS = {
  1: {
    message: 'Còn hạn',
    // message: 'Enabled',
    color: 'green'
  },
  2: {
    message: 'Hết hạn',
    // message: 'Expired',
    color: 'gray'
  },
}

export const USER_PACKAGE_USED = {
  1: {
    message: 'Đang phát',
    // message: 'Enabled',
    color: 'green'
  },
  0: {
    message: 'Đang chờ',
    // message: 'Expired',
    color: 'gray'
  },
}

export const DEFAULT_PERPAGE = 15;