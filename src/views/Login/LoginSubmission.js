import React from 'react';
import {Text, View} from 'react-native';
import Login from './LoginScreen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const ENDPOINT_URL =
  'https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login';

const formSubmissionReducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      return {status: 'pending', responseData: null, errorMessage: null};
    }
    case 'RESOLVE': {
      return {
        status: 'resolved',
        responseData: action.responseData,
        errorMessage: null,
      };
    }
    case 'REJECT': {
      return {
        status: 'rejected',
        responseData: null,
        errorMessage: action.error.message,
      };
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`);
  }
};

const useFormSubmission = ({endpoint, data}) => {
  const [state, dispatch] = React.useReducer(formSubmissionReducer, {
    status: 'idle',
    responseData: null,
    errorMessage: null,
  });

  const fetchBody = data ? JSON.stringify(data) : null;

  React.useEffect(() => {
    if (fetchBody) {
      (async () => {
        dispatch({type: 'START'});
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: fetchBody,
            headers: {
              'content-type': 'application/json',
            },
          });
          const responseData = await response.json();
          dispatch({type: 'RESOLVE', responseData});
        } catch (error) {
          dispatch({type: 'REJECT', error});
        }
      })();
    }
  }, [fetchBody, endpoint]);

  return state;
};

const Spinner = () => {
  return (
    <View accessibilityLabel="loading...">
      <Text>loading...</Text>
    </View>
  );
};

export default () => {
  const navigation = useNavigation();
  const [formData, setFormData] = React.useState(null);
  const {status, responseData, errorMessage} = useFormSubmission({
    endpoint: ENDPOINT_URL,
    data: formData,
  });

  const token = responseData?.token;

  React.useEffect(() => {
    if (token) {
      (async () => await AsyncStorage.setItem('token', token))();
      navigation.navigate('Home');
    }
  }, [token]);

  if (status === 'resolved') {
    // TODO: navigate away on submission success
    return null;
  }

  return (
    <>
      <Login onSubmit={data => setFormData(data)} />
      {status === 'pending' ? <Spinner /> : null}
      <Text>{errorMessage}</Text>
    </>
  );
};
