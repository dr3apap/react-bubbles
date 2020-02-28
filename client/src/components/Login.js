import React from "react";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
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
  handleSubmit(values, formikBag) {
    const endP = "/api/login";

    axiosWithAuth()
      .post(endP, values)
      .then(res => window.localStorage.setItem("token", res.data.payload));
    formikBag.props.history
      .push("/protected")
      .catch(err => console.log(err.response.data));
  },
})(Login);
