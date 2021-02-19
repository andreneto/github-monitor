/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { Pagination } from 'react-bootstrap';

import Paginator from '../Paginator';

it('should render passed data', () => {
  const props = {
    currentPageNumber: 1,
    pageCount: 10,
    onPageChange: jest.fn(),
  };

  const wrapper = mount(<Paginator {...props} />);

  // Verify page items are being rendered
  expect(wrapper.find(Pagination.Item).length).toBe(props.pageCount + 2);
});

it('should update page number when clicked', () => {
  const props = {
    currentPageNumber: 1,
    pageCount: 10,
    onPageChange: jest.fn(),
  };

  const wrapper = mount(<Paginator {...props} />);

  expect(wrapper.find(Pagination.Next).length).toBe(1);

  const nextPageBtn = wrapper.find(Pagination.Next).at(0);
  nextPageBtn.props().onClick();
  expect(props.onPageChange).toBeCalledWith(2);
});
