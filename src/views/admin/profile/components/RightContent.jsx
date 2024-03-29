/* eslint-disable */
// Custom components
import React from "react";

import TabProfile from "./TabProfile";
import TabPassword from "./TabPassword";
import TabPayment from "./TabPayment";

export default function RightContent(props) {
  const { activeTabId, resumeData, currentProfile, planDetail } = props;

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TabProfile 
            currentProfile={currentProfile}
            planDetail={planDetail}/>
        );
      case 1:
        return (
          <TabPassword 
            currentProfile={currentProfile}
            planDetail={planDetail}/>
        );
      case 2:
        return (
          <TabPayment planDetail={planDetail}/>
        );
      default:
        return (
          <TabProfile 
            currentProfile={currentProfile}
            planDetail={planDetail}/>
        );
    }
}

  return (
    <>
      {resumeData.map((job, index) => {
        return (
          <div
            key={index}
            style={
              activeTabId === index
                ? { display: "block" }
                : { display: "none" }
            }>
            { renderStepContent(index) }
          </div>
        )})
      }
    </>
  );
}
