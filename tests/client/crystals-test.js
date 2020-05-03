import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter, BrowserRouter} from 'react-router-dom';
import {Crystals} from '../../src/client/Crystals';

import {asyncCheckCondition} from '../mytest-utils';

let counter = 0;

test("Test not logged in", async () => {

    const randomStr = "HARDNESS"
    const userId = null;
    const wrapper = mount(
        <MemoryRouter initialEntries={["/home"]}>
            <Crystals userId={userId} />
        </MemoryRouter>
    );

    const html = wrapper.html();
    expect(html.includes(randomStr)).toEqual(true);
});

