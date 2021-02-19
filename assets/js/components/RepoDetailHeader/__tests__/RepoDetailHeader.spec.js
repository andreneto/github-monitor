/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RepoDetailHeader from '../RepoDetailHeader';

it('should render passed data', () => {
  const props = {
    repository: {
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
  };

  render(<RepoDetailHeader {...props} />);

  expect(screen.getByText(props.repository.name)).toBeInTheDocument();
  expect(screen.getByText(props.repository.description)).toBeInTheDocument();
  expect(screen.getByText(props.repository.owner.name)).toBeInTheDocument();
});
