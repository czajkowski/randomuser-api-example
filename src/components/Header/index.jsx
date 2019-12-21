import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, debounce } from 'lodash';

import styles from './styles.scss';

const Header = ({ onSearchChange, onSettingsClick }) => {
    const deboucedOnSearchChange = debounce(onSearchChange, 500);

    return (
        <div className={styles.container}>
            <input
                onChange={e => {
                    const value = get(e, 'target.value');
                    deboucedOnSearchChange(value);
                }}
                className={styles.search}
                placeholder="Search..."
            />
            <button className={styles.settings} onClick={onSettingsClick}>
                Settings
            </button>
        </div>
    );
};

Header.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    onSettingsClick: PropTypes.func.isRequired
};

export default Header;
