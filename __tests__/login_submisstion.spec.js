import 'react-native';
import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import LoginSubmission from '../src/views/Login/LoginSubmission';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// Mocking async storage setItem
jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn(),
  };
});
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));
jest.mock('@react-native-community/masked-view', () => ({}));

beforeEach(() => {
  useNavigation.mockReset();
  
});

it('renders correctly', async () => {
  const mockNavigate = jest.fn();
  useNavigation.mockImplementation(() => ({navigate: mockNavigate}));
  const fakeResponse = Promise.resolve({token: 'fake-token'});

  const username = 'chucknorris';
  const password = 'i need no password';
  const {getByText, getByPlaceholderText} = render(<LoginSubmission />);

  const userNameField = getByPlaceholderText('Username');
  const passwordField = getByPlaceholderText('Password');





});
