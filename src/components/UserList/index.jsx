import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InfiniteScroll from 'react-infinite-scroller';
import UserCard from '../UserCard';

import styles from './styles.scss';

const Loader = () => (
    <div className={classNames(styles.message, styles.pulsing)}>
        Loading ...
    </div>
);

const NoMoreData = () => (
    <div className={styles.message}>End of users catalog</div>
);

const UserList = ({ hasMore, onLoadMore, items }) => (
    <div className={styles.container}>
        <InfiniteScroll
            hasMore={hasMore}
            loader={<Loader key="loader-message" />}
            loadMore={onLoadMore}
        >
            {items.map(item => (
                <UserCard {...item} key={item.id} />
            ))}
        </InfiniteScroll>
        {!hasMore && <NoMoreData />}
    </div>
);

UserList.defaultProps = {
    hasMore: true,
    items: []
};

UserList.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            username: PropTypes.string,
            thumbnail: PropTypes.string,
            email: PropTypes.string,

            onClick: PropTypes.func
        })
    ).isRequired
};

export default UserList;
