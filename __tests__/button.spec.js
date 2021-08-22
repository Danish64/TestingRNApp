import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Button from '../src/views/Button';
import {expect, it} from '@jest/globals';

// renders correctly
it('renders correctly', () => {
  const {getByText, getByTestId} = render(<Button />);
  const decrement = getByText('-');
  const increment = getByText('+');
  const countText = getByTestId('txt-count');
});

it('will increase or decrease count on button press', () => {
  const {getByText, getByTestId} = render(<Button />);
  const increment = getByText('+');
  const decrement = getByText('-');
  const countText = getByTestId('txt-count');

  expect(countText.props.children).toEqual(['Total Count: ', 0]);
  fireEvent.press(increment);
  expect(countText.props.children).toEqual(['Total Count: ', 1]);
  fireEvent.press(decrement);
  expect(countText.props.children).toEqual(['Total Count: ', 0]);

});
