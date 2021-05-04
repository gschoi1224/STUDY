import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;

    &:disabled {
        background: ${palette.gray[3]};
        color: ${palette.gray[5]};
        cursor: not-allowed;
    }
`;
const PageNumber = styled.div``;

const buildLink = ({ username, tag, page }) => {
    const query = qs.stringify({ tag, page });
    return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, username, tag }) => {
    return (
        <PaginationBlock>
            <Button
                disabled={page === 1}
                to={
                    page === 1
                        ? undefined
                        : buildLink({ username, tag, page: page - 1 })
                }
            >
                이전
            </Button>
            <PageNumber>{page}</PageNumber>
            <Button
                disalbed={page === lastPage}
                to={
                    page === lastPage
                        ? undefined
                        : buildLink({ username, tag, page: page + 1 })
                }
            >
                다음
            </Button>
        </PaginationBlock>
    );
};

export default Pagination;
