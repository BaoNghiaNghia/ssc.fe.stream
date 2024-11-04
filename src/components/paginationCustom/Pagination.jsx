/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../contexts/pagination';

const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    color,
    typeName = ""
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    let className = 'pagination-bar';

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
            <span style={{ paddingTop: '8px', marginRight: '3%' }}>Tổng cộng <strong>{totalCount}</strong> {typeName}</span>
            <ul className={classnames('pagination-container', { [className]: className })}>
                <li className={classnames(`pagination-item-${color}`, {disabled: currentPage === 1})} onClick={onPrevious}>
                    <div className="arrow left" />
                </li>
                { paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) return <li key={index} className={`pagination-item-${color} dots`}>&#8230;</li>;

                    return (
                        <li key={index} 
                            className={classnames(`pagination-item-${color}`, { selected: pageNumber === currentPage})}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li className={classnames(`pagination-item-${color}`, {disabled: currentPage === lastPage})} onClick={onNext}>
                    <div className="arrow right" />
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
