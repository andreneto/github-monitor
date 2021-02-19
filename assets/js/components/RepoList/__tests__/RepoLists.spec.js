/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RepoList from '../RepoList';

it('should render passed data', () => {
  const props = {
    repositories: [
      {
        id: 1,
        name: 'Github Desktop',
        description: 'Github for Desktop',
        owner: {
          name: 'Monalisa Octocat',
          username: 'Octocat',
          avatar: 'image_url',
          url: 'profile_url',
        },
      },
      {
        id: 2,
        name: 'Github Mobile',
        description: 'Github for Mobile',
        owner: {
          name: 'Monalisa Octocat',
          username: 'Octocat',
          avatar: 'image_url',
          url: 'profile_url',
        },
      },
    ],
  };

  render(<RepoList {...props} />, { wrapper: MemoryRouter });

  expect(screen.getByText(props.repositories[0].name)).toBeInTheDocument();
  expect(screen.getByText(props.repositories[1].name)).toBeInTheDocument();
});

it('should render default text when no repository passed', () => {
  const props = {
    repositories: [],
  };

  render(<RepoList {...props} />);

  expect(screen.getByText(/No repositories/i)).toBeInTheDocument();
});
