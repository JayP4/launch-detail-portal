import { mount } from 'enzyme';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LaunchDetails from './LaunchDetails';
import LaunchList from './LaunchList';

describe('Render App', () => {
  it('render launchlist component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(LaunchList).length).toEqual(1);
  });

  it('render fetching message', () => {
    const wrapper = mount(<App />);
    const launchList = wrapper.find(LaunchList);
    expect(launchList.find('div').text()).toEqual('Fetching...');
  });
});

describe('Render Launches', () => {
  let container: any = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders list', async () => {
    const fakeData = {
      docs: [
        {
          name: 'Joni Baez',
          date_local: '2021-12-01T18:20:00-05:00',
          id: '123456789',
        },
      ],
    };
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(fakeData),
        }) as any
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <BrowserRouter>
          <LaunchList />
        </BrowserRouter>,
        container
      );
    });

    expect(container.querySelector('table').rows.length).toEqual(2);

    // remove the mock to ensure tests are completely isolated
    const temp = global.fetch as any;
    temp.mockRestore();
  });
});

describe('Render Launch Detail', () => {
  let container: any = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders details', async () => {
    const fakeData = {
      name: 'Joni Baez',
      date_local: '2021-12-01T18:20:00-05:00',
      details: 'Some details',
    };

    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(fakeData),
        }) as any
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/launch/123456']}>
          <Routes>
            <Route path='/launch/:launchid' element={<LaunchDetails />} />
          </Routes>
        </MemoryRouter>,
        container
      );
    });

    expect(container.querySelector('table').rows.length).toEqual(3);

    // remove the mock to ensure tests are completely isolated
    const temp = global.fetch as any;
    temp.mockRestore();
  });
});
