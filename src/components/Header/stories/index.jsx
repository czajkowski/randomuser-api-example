import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Header from '../';

const onSearchChange = action('onSearchChange');
const onSettingsClick = action('onSettingsClick');

storiesOf('Header', module).add('Default', () => (
    <Header onSearchChange={onSearchChange} onSettingsClick={onSettingsClick} />
));
