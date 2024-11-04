/* eslint-disable */

import React, { useState } from "react";
// Custom components
import Card from "../../../../components/card/Card";

// Assets
import Pagination from '../../../../components/paginationCustom/Pagination';
import TableSubRow from "../thread-component/TableSubRow";

export default function VideoStreamTable(props) {
    const {
        tableData,
        paginationData,
        filterGroup,
        setMenuSelected,
        playRightAwayVideo,
        editCurrVideoStream,
        detailCurrVideoStream,
        killCurrVideoStream,
        delCurrVideoStream,
        handleFetchResource } = props;

    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = () => async (page) => {
        setCurrentPage(page);
        await handleFetchResource({ 'page': page });
    }

    return (
        <Card
            direction='column'
            w='100%'
            px='0px'>
            {filterGroup}
            <Card
                direction='column'
                w='100%'
                px='0px'
                overflowX={{ base: "scroll"}}>        
                <TableSubRow
                    tableData={tableData || []}
                    setMenuSelected={setMenuSelected}
                    playRightAwayVideo={playRightAwayVideo}
                    editCurrVideoStream={editCurrVideoStream}
                    detailCurrVideoStream={detailCurrVideoStream}
                    killCurrVideoStream={killCurrVideoStream}
                    delCurrVideoStream={delCurrVideoStream}
                />
                </Card>
            {
                paginationData && (
                    <Pagination
                        color="blue"
                        typeName="video stream"
                        currentPage={currentPage}
                        totalCount={paginationData.total}
                        pageSize={paginationData.per_page}
                        onPageChange={handleChangePage()}
                    />
                )
            }
        </Card>
    );
}
