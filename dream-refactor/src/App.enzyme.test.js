import React from 'react'
import { mount } from 'enzyme';
import App from './App';
const fetchMock = require('fetch-mock-jest');
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

describe("The App", () => {
    afterAll(() => {
        fetchMock.restore();
    });

    it("should toggle the users view", async () => {
        const wrapper = mount(<App />);

        const mockJson = jest.fn().mockReturnValue({
            users: [
                { firstName: "Hallie", lastName: "Smith", joinDate: "12/31/2020"},
                { firstName: "Reese", lastName: "Carter", joinDate: "06/01/2021"},
                { firstName: "Piper", lastName: "Middleton", joinDate: "06/01/2021"},
            ]
        });
        fetchMock.mock('http://localhost:3003/users', mockJson);

        await act(() => wrapper.find('#UsersButton').props().onClick());
        wrapper.update();

        expect(wrapper.find(".Flex-row")).toHaveLength(3);
    });
});
