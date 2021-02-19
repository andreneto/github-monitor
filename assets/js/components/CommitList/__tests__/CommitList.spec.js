/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CommitList from '../CommitList';

it('should render passed data', () => {
  const props = {
    commits: [
      {
        sha: 'shajd127631278936172',
        message: 'This is a commit message',
        author_name: 'Monalisa Octocat',
        author_email: 'octocat@github.com',
        authored_at: new Date().toISOString(),
        author_profile: { avatar: 'image_url' },
      },
      {
        sha: 'shajd825462454234235',
        message: 'This is another commit message',
        author_name: 'Monalisa Octocat',
        author_email: 'octocat@github.com',
        authored_at: new Date().toISOString(),
        author_profile: { avatar: 'image_url' },
      },
    ],
    commitCount: 2,
    currentPageNumber: 1,
    paginationHandler: jest.fn(),
    onFilterReset: jest.fn(),
    onFilterChange: jest.fn(),
    filters: {
      authorEmail: 'octocat@github.com',
      repositoryId: 1,
    },
  };

  render(<CommitList {...props} />, { wrapper: MemoryRouter });

  expect(screen.getByText(props.commits[0].message)).toBeInTheDocument();
  expect(screen.getByText(props.commits[1].message)).toBeInTheDocument();
});

it('should render default text when no commit passed', () => {
  const props = {
    commits: [],
    filters: {
      authorEmail: '',
      repositoryId: 1,
    },
  };

  render(<CommitList {...props} />);

  expect(screen.getByText(/No commits/i)).toBeInTheDocument();
});
