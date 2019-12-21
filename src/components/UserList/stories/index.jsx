import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import UserList from '../';

import users from '../../../mocks/users.json';

const onLoadMore = action('onLoadMore');

storiesOf('UserList', module).add('Default', () => (
    <UserList items={users} onLoadMore={onLoadMore} />
));
