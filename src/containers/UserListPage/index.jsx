import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    fetchUsers,
    changeSearch,
    showUserDetails,
    hideUserDetails
} from '../../store';

import UserList from '../../components/UserList';
import Header from '../../components/Header';
import UserModal from '../../components/UserModal';
import ErrorMessage from '../../components/ErrorMessage';

import styles from './styles.scss';

const UserListPage = ({
    history,
    onSearchChange,
    userDetails,
    onCloseDetails,
    onOpenDetails,
    items,
    hasMore,
    error,
    ...rest
}) => {
    return (
        <div className={styles.container}>
            <Header
                onSettingsClick={() => history.push('/settings')}
                onSearchChange={onSearchChange}
            />

            {error && <ErrorMessage message={error} />}

            <UserList
                items={items.map(i =>
                    Object.assign({}, i, {
                        onClick: onOpenDetails
                    })
                )}
                hasMore={!error && hasMore}
                {...rest}
            />

            {userDetails && (
                <UserModal {...userDetails} onClose={onCloseDetails} />
            )}
        </div>
    );
};

UserListPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    onSearchChange: PropTypes.func.isRequired,
    onOpenDetails: PropTypes.func.isRequired,
    onCloseDetails: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({})),
    error: PropTypes.string,
    hasMore: PropTypes.bool
};

const mapStateToProps = state => {
    const {
        users: { filteredUsers, userDetails, page, totalPages, error } = {}
    } = state;

    return {
        error,
        userDetails,
        items: filteredUsers,
        hasMore: page < totalPages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadMore: page => dispatch(fetchUsers(page)),
        onSearchChange: val => dispatch(changeSearch(val)),
        onOpenDetails: userId => dispatch(showUserDetails(userId)),
        onCloseDetails: _ => dispatch(hideUserDetails())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserListPage));
