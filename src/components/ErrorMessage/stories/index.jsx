import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import ErrorMessage from '../';

storiesOf('ErrorMessage', module).add('Default', () => (
    <ErrorMessage message="Horrible error!" />
));
