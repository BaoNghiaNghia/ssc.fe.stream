/* eslint-disable */
import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdLock,
  MdConnectedTv,
  MdVerifiedUser,
  MdAllInbox,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

// Admin Imports
import MainDashboard from "./views/admin/default/index";
import Profile from "./views/admin/profile/index";
import CreateLivestream from "./views/admin/create-livestream/index";
import ListUserLivestream from "./views/admin/list-user-livestream/index";
import ManageAdminLivestream from "./views/admin/manage-admin-livestream/index";
import ListAccountUser from "./views/admin/list-account-user/index";
import PackagePlanInfo from "./views/admin/package-plan/index";

// Auth Imports
import SignInCentered from "./views/auth/signIn";
import Register from "./views/auth/register";
import ForgotPassword from "./views/auth/forgotPassword";
import PurchasePackage from "./views/admin/package-plan/PurchasePackage";
import { ROLE_USER } from "./variables/index";
import ServerLiveStreamAgent from "./views/admin/server-livestream/index";

// Blank
import Policy from "./views/blank/policy"
import ManageGoogleKey from "./views/admin/manage-google-key";

const routesForAuthenticated = [
  {
    name: "Thống kê",
    layout: "/admin",
    path: "/home-page",
    icon: <Icon as={MdHome} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: MainDashboard,
    role: [ROLE_USER.SUPER_ADMIN, ROLE_USER.USER_DEFAULT],
    children: [
      {
        name: "Cá nhân",
        path: "/profile",
        component: Profile,
        role: [ROLE_USER.USER_DEFAULT, ROLE_USER.ADMIN, ROLE_USER.SUPER_ADMIN, ROLE_USER.RESELLER]
      },
    ]
  },
  {
    name: "Quản lý người dùng",
    layout: "/admin",
    path: "/list-account",
    icon: <Icon as={MdVerifiedUser} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }} />,
    component: ListAccountUser,
    role: [ROLE_USER.ADMIN, ROLE_USER.RESELLER],
    children: []
  },
  {
    name: "Quản lý luồng",
    layout: "/admin",
    path: "/list-livestream",
    icon: <Icon as={MdPerson} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: ListUserLivestream,
    role: [ROLE_USER.USER_DEFAULT]
  },
  {
    name: "Quản lý livestream",
    layout: "/admin",
    path: "/create-livestream",
    icon: <Icon as={MdHome} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: CreateLivestream,
    role: [ROLE_USER.USER_DEFAULT]
  },
  {
    name: "Server livestream",
    layout: "/admin",
    path: "/server-livestream",
    icon: <Icon as={MdConnectedTv} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: ServerLiveStreamAgent,
    role: [ROLE_USER.USER_DEFAULT, ROLE_USER.ADMIN, ROLE_USER.RESELLER]
  },
  {
    name: "Quản lý gói livestream",
    layout: "/admin",
    path: "/manage-admin-livestream",
    icon: <Icon as={MdAllInbox} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: ManageAdminLivestream,
    role: [ROLE_USER.ADMIN, ROLE_USER.SUPER_ADMIN, ROLE_USER.RESELLER]
  },
  {
    name: "Quản lý Google Key",
    layout: "/admin",
    path: "/manage-google-key",
    icon: <Icon as={FcGoogle} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: ManageGoogleKey,
    role: [ROLE_USER.ADMIN, ROLE_USER.SUPER_ADMIN]
  },
];

const routePublic = [
  {
    name: "Cá nhân",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: Profile,
    role: [ROLE_USER.USER_DEFAULT, ROLE_USER.ADMIN, ROLE_USER.SUPER_ADMIN, ROLE_USER.RESELLER]
  },
]

const routeBlank = [
  {
    name: "Chính sách",
    layout: "/general",
    path: "/policy",
    icon: <Icon as={MdPerson} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: Policy,
    role: [ROLE_USER.USER_DEFAULT, ROLE_USER.ADMIN, ROLE_USER.SUPER_ADMIN, ROLE_USER.RESELLER]
  },
]

const routePayments = [
    {
      name: "Gói cước",
      layout: "/admin",
      path: "/plan",
      icon: <Icon as={MdPerson} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
      component: PackagePlanInfo,
      role: [ROLE_USER.USER_DEFAULT],
      children: [
        {
          name: "Normal",
          path: "/plan/:id",
          component: PurchasePackage,
          role: [ROLE_USER.USER_DEFAULT, ROLE_USER.RESELLER]
        },
      ]
    },
]

const routesForNotAuthenticated = [
  {
    name: "Đăng Nhập",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: SignInCentered
  },
  {
    name: "Đăng ký",
    layout: "/auth",
    path: "/register",
    icon: <Icon as={MdLock} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: Register
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "/forgot-password",
    icon: <Icon as={MdLock} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: ForgotPassword
  },
  {
    name: "Underconstruction",
    layout: "/under-construction",
    path: "/forgot-password",
    icon: <Icon as={MdLock} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: ForgotPassword
  },
  {
    name: "Underconstruction",
    layout: "/under-construction",
    path: "/forgot-password",
    icon: <Icon as={MdLock} width='27px' height='27px' color='inherit' style={{ marginTop: '6px' }}/>,
    component: ForgotPassword
  }
];

const routes = routesForAuthenticated.concat(routesForNotAuthenticated);

export {
  routes,
  routesForNotAuthenticated,
  routesForAuthenticated,
  routePublic,
  routePayments,
  routeBlank
}
