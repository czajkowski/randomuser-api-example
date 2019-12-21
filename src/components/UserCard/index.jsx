import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const UserCard = ({
    id,
    firstName,
    lastName,
    username,
    thumbnail,
    email,

    onClick
}) => (
    <div className={styles.container}>
        <img src={thumbnail} className={styles.thumbnail} />

        <div className={styles.details}>
            <div className={classNames(styles.entry, styles.important)}>
                <div>First name</div>
                <div>{firstName}</div>
            </div>
            <div className={classNames(styles.entry, styles.important)}>
                <div>Last name</div>
                <div>{lastName}</div>
            </div>
            <div className={styles.entry}>
                <div>Username</div>
                <div>{username}</div>
            </div>
            <div className={styles.entry}>
                <div>Email</div>
                <a href="mailto:{email}">{email}</a>
            </div>
            <button className={styles.button} onClick={() => onClick(id)}>
                Details
            </button>
        </div>
    </div>
);

UserCard.propTypes = {
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    thumbnail: PropTypes.string,
    email: PropTypes.string,

    onClick: PropTypes.func
};

export default UserCard;
