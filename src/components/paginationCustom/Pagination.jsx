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
    color
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    let className = 'pagination-bar';

    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
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
    );
};

export default Pagination;
