import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UserCard from '../';

import users from '../../../mocks/users.json';

const onClick = action('onClick');

storiesOf('UserCard', module).add('Default', () => (
    <UserCard {...users[0]} onClick={onClick} />
));
