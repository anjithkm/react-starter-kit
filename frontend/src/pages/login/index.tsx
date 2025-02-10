import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Layout from "@/layout/auth";
import * as Yup from 'yup';
import styled from 'styled-components';
import api from "@/services/api";
import device from "@/config/breaking-point";
import { useNavigate  } from "react-router-dom";



interface LoginFormValues {
  user_name: string;
  password: string;
}


const LoginFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: fit-content;
  text-align: center;
  @media ${device.mobileS} {
    background-color: #e07575;
  }

  @media ${device.mobileM} {
    background-color: lightgreen;
  }

  @media ${device.tablet} {
    background-color: #7fcae4;
  }

  @media ${device.laptop} {
    background-color: #e4e47a;
  }
`;

const FormControl = styled.div`
  margin-bottom: 15px;
  text-align: left;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 250px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const ErrorText = styled.div`
  color: #ff0000;
  font-size: 0.9em;
  margin: 10px 0px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const initialValues: LoginFormValues = {
  user_name: '',
  password: ''
};

const validationSchema = Yup.object({
  user_name: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Required')
});

const Login: React.FC = () => {

  const navigate = useNavigate();
  const [postLogin, { data: loginData, error: loginError, isLoading: loginLoading }] = api.useLoginMutation();

  useEffect(() => {

    if(loginData){

        if(loginData?.success){
            navigate('/home')
        }

    }

  }, [loginData]);

  const onSubmit = async (values: any) => {
    console.log('Form data', values);
    await postLogin(values);
  };

  return (
    <Layout>
    <LoginFormContainer>
      <h2>Login</h2>
      <ErrorText>{loginError ? 'Invalid credential. Try again!' : ''}</ErrorText>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormControl>
            <label htmlFor="user_name">User Name:</label>
            <Field type="text" id="user_name" name="user_name" />
            <ErrorMessage name="user_name" component={ErrorText} />
          </FormControl>

          <FormControl>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component={ErrorText} />
          </FormControl>

          <SubmitButton type="submit">{loginLoading ? 'Loading...' : 'Login'}</SubmitButton>
        </Form>
      </Formik>
    </LoginFormContainer>
    </Layout>

  );
};

export default Login;


