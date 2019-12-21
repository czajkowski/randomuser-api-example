import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ErrorMessage = ({ message }) => (
    <div className={styles.container}>{message}</div>
);

ErrorMessage.propTypes = {
    message: PropTypes.string
};

export default ErrorMessage;
