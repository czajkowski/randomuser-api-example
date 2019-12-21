import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const UserModal = ({
    id,
    firstName,
    lastName,
    username,
    thumbnail,
    email,
    phone,
    cell,
    address: { street, city, postcode, state } = {},

    onClose
}) => (
    <div className={styles.overlay}>
        <div className={styles.container}>
            <div className={styles.body}>
                <img src={thumbnail} className={styles.thumbnail} />

                <div className={styles.details}>
                    {Object.entries({
                        'First name': firstName,
                        'Last name': lastName,
                        Username: username,
                        Email: <a href="mailto:{email}">{email}</a>,
                        Phone: phone,
                        Cell: cell,
                        Street: street,
                        City: city,
                        'Post code': postcode,
                        State: state
                    }).map(([name, value]) => (
                        <div className={styles.entry} key={name}>
                            <div>{name}</div> {value}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.footer}>
                <button className={styles.button} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    </div>
);

UserModal.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    thumbnail: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    cell: PropTypes.string,
    address: PropTypes.shape({
        street: PropTypes.string,
        city: PropTypes.string,
        postcode: PropTypes.string,
        state: PropTypes.string
    }),

    onClick: PropTypes.func
};

export default UserModal;
