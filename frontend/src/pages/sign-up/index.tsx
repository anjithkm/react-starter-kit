import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './signup.css';

import api from "@/services/api";

const SignUp : React.FC = () => {

  const [postSignUp] = api.useSignUpMutation();

  const initialValues = {
    email: '',
    user_name: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    user_name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required')
  });

  const onSubmit = async(values:any) => {
    console.log('Form data', values);
    try {
      const response = await postSignUp(values);
      console.log('SignUp successful', response);
    } catch (error) {
      console.error('SignUp failed', error);
    }
  };

//    onChange={(e:any)=>{setValues({...values,user_name:e.target.value})}}
//    onChange={(e:any)=>{setValues({...values,email:e.target.value})}}
//    onChange={(e:any)=>{setValues({...values,password:e.target.value})}}
 
return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >

        <Form>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email"  />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="user_name" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password"  />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          <button type="submit">Create</button>
        </Form>

      </Formik>
    </div>
  );
};

export default SignUp;
