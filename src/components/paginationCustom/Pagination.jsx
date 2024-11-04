/* eslint-disable */
import React, { useState } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../contexts/pagination';
import { Select } from '@chakra-ui/react';

const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize, 
    color,
    typeName = ""
}) => {
    const [itemsPerPage, setItemsPerPage] = useState(pageSize);
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize: itemsPerPage
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null; 
    }

    const onNext = () => {
        if (currentPage < paginationRange[paginationRange.length - 1]) {
            onPageChange(currentPage + 1, itemsPerPage);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1, itemsPerPage);
        }
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    const handleItemsPerPageChange = (event) => {
        const { value } = event?.target;
        setItemsPerPage(Number(value));
        onPageChange(currentPage, value);
        onPageChange(1, itemsPerPage);
    };

    return (
        <div className="pagination-wrapper" style={{  display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
            <div className="pagination-info">
                <span>Tổng cộng <strong>{totalCount}</strong> {typeName}</span>
            </div>
            <ul className={classnames('pagination-container', `pagination-bar-${color}`)}>
                <button
                    className={classnames(`pagination-item-${color}`, { disabled: currentPage === 1 })}
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                >
                    <div className="arrow left" />
                </button>
                {paginationRange.map((pageNumber, index) => (
                    pageNumber === DOTS ? (
                        <li key={index} className={`pagination-item-${color} dots`}>&#8230;</li>
                    ) : (
                        <button
                            key={index}
                            className={classnames(`pagination-item-${color}`, { selected: pageNumber === currentPage })}
                            onClick={() => onPageChange(pageNumber)}
                            aria-current={pageNumber === currentPage ? "page" : undefined}
                        >
                            {pageNumber}
                        </button>
                    )
                ))}
                <button
                    className={classnames(`pagination-item-${color}`, { disabled: currentPage === lastPage })}
                    onClick={onNext}
                    disabled={currentPage === lastPage}
                    aria-label="Next Page"
                >
                    <div className="arrow right" />
                </button>
            </ul>

            <Select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="items-per-page-select"
                aria-label="Items per page"
                size="sm"
                disabled
                style={{ marginTop: '5px' }}
                w="fit-content"
            >
                <option value={10}>10 {typeName}/trang</option>
                <option value={15}>15 {typeName}/trang</option>
                <option value={20}>20 {typeName}/trang</option>
                <option value={25}>25 {typeName}/trang</option>
                <option value={100}>100 {typeName}/trang</option>
            </Select>
        </div>
    );
};

export default Pagination;
