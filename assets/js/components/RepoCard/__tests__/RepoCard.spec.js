/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import RepoCard from '../RepoCard';

it('should render passed data', () => {
  const props = {
    id: 1,
    name: 'Test Repo',
    description: 'Test repo description',
    owner: {
      name: 'Test User',
      username: 'testuser',
      avatar: '',
      url: '',
    },
  };

  const history = createMemoryHistory();
  history.push = jest.fn();

  const { container } = render(<RepoCard {...props} />, {
    wrapper: MemoryRouter,
  });

  // Verify there's only one title
  expect(container.getElementsByClassName('card-title').length).toBe(1);

  // Verify title is rendered
  expect(
    container.getElementsByClassName('card-title').item(0).textContent
  ).toBe(props.name);
});

it('should navigate to passed ID when clicked', () => {
  const props = {
    id: 1,
    name: 'Test Repo',
    description: 'Test repo description',
    owner: {
      name: 'Test User',
      username: 'testuser',
      avatar: '',
      url: '',
    },
  };

  const history = createMemoryHistory();
  history.push = jest.fn();

  render(
    <Router history={history}>
      <RepoCard {...props} />
    </Router>
  );

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(props.name), leftClick);

  expect(history.push).toBeCalledWith(`/${props.id}`);
});
