import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UserModal from '../';

import users from '../../../mocks/users.json';

const onClose = action('onClose');

storiesOf('UserModal', module).add('Default', () => (
    <UserModal {...users[0]} onClose={onClose} />
));
