/* eslint-disable */
// Chakra imports
import React, { useEffect, useState } from "react";
import {
  Box
} from "@chakra-ui/react";

import StaticStream from "../list-user-livestream/components/StaticStream";
import { fetchDashboardAdminStatisticsStreaming, fetchDashboardStatisticsStreaming } from "../../../api/Stream";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { MESSSAGE_STATUS_CODE, ROLE_USER } from "../../../variables";
import { getCurrRoleUser } from "../../../utils/handleValidate";
import { useAuth } from "../../../contexts/authenContext";

export default function UserReports() {
  const { t } = useTranslation();

  const { profile } = useAuth();

  const [statisticsData, setStatisticsData] = useState([]);

  const handleFetchDashboardStatisticsStreaming = async () => {
    try {
      if (getCurrRoleUser(profile) === ROLE_USER.ADMIN) {
        const response = await fetchDashboardAdminStatisticsStreaming();
        if (response.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            setStatisticsData(response.data.data);
        }
      } else {
        const response = await fetchDashboardStatisticsStreaming();
        if (response.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            setStatisticsData(response.data.data);
        }
      }
    } catch (err) {
      if (err.response) {
          toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }

  useEffect(() => {
    handleFetchDashboardStatisticsStreaming();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {
        statisticsData.length > 0 ? (
          <StaticStream 
            listStatistics={statisticsData}
          />
        ): null
      }
    </Box>
  );
}
