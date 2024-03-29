/* eslint-disable */
// Chakra imports
import React, { useEffect, useState } from "react";
import { Box, Grid, Card, List, GridItem } from "@chakra-ui/react";

// Custom components
import LeftMenu from "./components/LeftMenu";
import RightContent from "./components/RightContent";
import { MESSSAGE_STATUS_CODE, MK_AGENCY_PROVIDER, resumeData } from "../../../variables/";
import { fetchProfileDetail } from "../../../api/Auth";
import { fetchListUserPackageApi } from "../../../api/UserPackage";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function Overview() {
  const [activeTabId, setActiveTabId] = useState(0);
  const [currentProfile, setCurrentProfile] = useState();

  const { t } = useTranslation();

  const [planDetail, setPlanDetail] = useState([]);

  const handleFetchProfile = async () => {
    try {
      const responseProfile = await fetchProfileDetail({}, {
        headers: {
          Agency: MK_AGENCY_PROVIDER
        }
      });
      if (responseProfile.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
        setCurrentProfile(responseProfile.data.data);
        return responseProfile.data.data;
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        toast.error(t(`error_code.${err.response.data.error_code}`));
      }
    }
  }

  const fetchUserPackage = async () => {
      try {
          const responseListUserPackage = await fetchListUserPackageApi();
          if (responseListUserPackage.status === MESSSAGE_STATUS_CODE.SUCCESS.code) {
            let allUserPackage = responseListUserPackage.data.data.items;
            let currentUser = await handleFetchProfile();
            let currUserPackage = []
            await allUserPackage.map((pack) => {
              if (pack.user_id == currentUser.id) {
                currUserPackage.push(pack);
              }
            })
            
            setPlanDetail(currUserPackage);
          }
      } catch (err) {
        console.log(err);
        if (err.response) {
          toast.error(t(`error_code.${err.response.data.error_code}`));
        }
      }
  }

  const handleChangeVerticalTabs = (id) => {
    setActiveTabId(id);
  }

  useEffect(() => {
    handleFetchProfile();
    fetchUserPackage();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateRows='repeat(1, 1fr)'
        gridTemplateColumns={{ base: "repeat(4, 1fr)", xl: "repeat(5, 1fr)", "2xl": "repeat(6, 1fr)" }}
        gap={5}
        >
        <GridItem colSpan={1}>
          <LeftMenu
            handleChangeVerticalTabs={handleChangeVerticalTabs}
            setActiveTabId={setActiveTabId}
            activeTabId={activeTabId}
            resumeData={resumeData}
          />
        
        </GridItem>
        <GridItem colSpan={3}>
          <RightContent
            currentProfile={currentProfile}
            planDetail={planDetail}
            resumeData={resumeData}
            activeTabId={activeTabId}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
