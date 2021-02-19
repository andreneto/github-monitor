/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CommitCard from '../CommitCard';

it('should render passed data', () => {
  const props = {
    sha: 'shajd127631278936172',
    message: 'This is a commit message',
    authorName: 'Monalisa Octocat',
    authorEmail: 'octocat@github.com',
    authoredAt: new Date().toISOString(),
    authorAvatar: 'image_url',
    onFilterChange: jest.fn(),
  };

  const { container } = render(<CommitCard {...props} />);

  // Verify there's only one title
  expect(container.getElementsByClassName('card-title').length).toBe(1);

  // Verify title is rendered
  expect(
    container.getElementsByClassName('card-title').item(0).textContent
  ).toBe(props.message);
});

it('should call filter callback when author email clicked', () => {
  const props = {
    sha: 'shajd127631278936172',
    message: 'This is a commit message',
    authorName: 'Monalisa Octocat',
    authorEmail: 'octocat@github.com',
    authoredAt: new Date().toISOString(),
    authorAvatar: 'image_url',
    onFilterChange: jest.fn(),
  };

  render(<CommitCard {...props} />);

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(props.authorEmail), leftClick);

  expect(props.onFilterChange).toBeCalledWith({
    authorEmail: props.authorEmail,
  });
});
