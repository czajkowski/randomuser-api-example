import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import { changeNationality } from '../../store';

import Nationalities from '../../enums/nationalities.json';

import styles from './styles.scss';

const SettingsPage = ({ history, onNationalityChange, nationality }) => (
    <>
        <div className={styles.container}>
            <h3 className={styles.header}>Settings</h3>
            <div className={styles.entry}>
                <div>Nationality</div>
                <div>
                    <select
                        onChange={e => {
                            const value = get(e, 'target.value');
                            onNationalityChange(value);
                        }}
                        value={nationality}
                    >
                        {Object.entries(Nationalities).map(([code, name]) => (
                            <option value={code} key={code}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <button className={styles.back} onClick={() => history.push('/')}>
            Back
        </button>
    </>
);

SettingsPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    onNationalityChange: PropTypes.func.isRequired,
    nationality: PropTypes.string
};

const mapStateToProps = state => {
    const { users: { nationality } = {} } = state;

    return {
        nationality
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNationalityChange: val => dispatch(changeNationality(val))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SettingsPage));
