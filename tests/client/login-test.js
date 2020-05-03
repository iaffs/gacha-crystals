import React from 'react';
import {mount} from 'enzyme';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import Login from '../../src/client/Login';
import Signup from '../../src/client/Signup';

import {asyncCheckCondition} from '../mytest-utils';

let count = 0;

test("Test Login ", async () => {

    count++;
    const id = 'foo_' + count;
    const password = 'sdf';
    const repeatPassword = 'sdf';

    let wrapper = mount(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    );

    const userId = wrapper.find("#userId").at(0);
    const pwd = wrapper.find("#password").at(0);
    const passwordConfirm = wrapper.find("#passwordConfirm").at(0);

    const signUpBtn = wrapper.find("#signUpBtn").at(0);

    userId.simulate('change', {target: {value: id}});
    pwd.simulate('change', {target: {value: password}});
    passwordConfirm.simulate('change', {target: {value: repeatPassword}});

    signUpBtn.simulate('click');
    wrapper.update();

    wrapper = mount(
        <MemoryRouter initialEntries={["/login"]}>
            <Login />
        </MemoryRouter>
    );

    login(wrapper, id, password);

    const result = await asyncCheckCondition(
        () => {wrapper.update(); return wrapper.html().includes("")},
        1000, 200);

    expect(result).toEqual(true);


});


function login(wrapper, id, password) {
    const userIdInput = wrapper.find("#loginField").at(0);
    const passwordInput = wrapper.find("#passwordField").at(0);
    const registerBtn = wrapper.find("#loginBtn").at(0);
    userIdInput.simulate('change', {target: {value: id}});
    passwordInput.simulate('change', {target: {value: password}});
    registerBtn.simulate('click');
}