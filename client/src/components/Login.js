import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <Form>
        <div>
          <label className='login'>UserName </label>
          <Field
            type='text'
            name='username'
            placeholder='User-Name'
            autoComplete='off'
          />
        </div>
        <div>
          <label className='login'>Password</label>
          <Field
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='off'
          />
        </div>
        <button type='submit'>Sumbit&rarr;</button>
      </Form>
    </>
  );
};

export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: "",
    };
  },
  handleSubmit(values) {
    axiosWithAuth()
      .post("/api/login", values)
      .then(res => localStorage.setItem("token", res.data.payload))
      .catch(err => console.log(err.response.data));
  },
})(Login);
