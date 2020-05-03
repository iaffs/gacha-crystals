import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter, BrowserRouter} from 'react-router-dom';
import {Home} from '../../src/client/Home';
import Signup from '../../src/client/Signup';

import {asyncCheckCondition} from '../mytest-utils';

let counter = 0;


test("Test home not logged in", async () => {
    const notLoggedIn = "You need to log-in";
    const userId = null;
    const wrapper = mount(
        <MemoryRouter initialEntries={["/"]}>
            <Home userId={userId} />
        </MemoryRouter>
    );

    const html = wrapper.html();
    expect(html.includes(notLoggedIn)).toEqual(false);
});


test("Test Home after login", async () => {

    counter++;
    const id = 'foo_' + counter;
    const password = '123';
    const repeatPassword = '123';

    const wrapper = mount(
        <BrowserRouter>
            <Signup />
            <Home />
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
    const result = wrapper.html().includes("Wallet")
    expect(result).toBe(false);
});


test("Test home click loot box", async () => {

    counter++;
    const id = 'foo_' + counter;
    const password = '123';
    const repeatPassword = '123';

    let wrapper = mount(
        <BrowserRouter>
            <Signup />
            <Home />
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
    wrapper.instance().handleLootBoxClick;
});

test("Test home buy loot box", async () => {

    counter++;
    const id = 'foo_' + counter;
    const password = '123';
    const repeatPassword = '123';

    let wrapper = mount(
        <BrowserRouter>
            <Signup />
            <Home />
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

    const redirected = await asyncCheckCondition(() => {
        wrapper.update();
        return wrapper.html().includes("Wallet")
    }, 4000, 200);
    expect(redirected).toBe(false);
    wrapper.instance().handleLootBoxClick;

});

