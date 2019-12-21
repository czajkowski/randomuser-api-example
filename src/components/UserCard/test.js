import React from 'react';
import { mount } from 'enzyme';

import UserCard from './';

import users from '../../mocks/users.json';

const testUser = users[0];

describe('UserCard', () => {
    let wrapper;
    let onClick;

    beforeEach(() => {
        onClick = jest.fn();

        wrapper = mount(
            <UserCard
                {...testUser}
                onClick={onClick}
            />
        );
    })

    it('should display basic user data', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should fire callback when button is clicked', () => {
        wrapper.find('button').simulate('click');

        expect(onClick).toHaveBeenCalled();
    })
});
