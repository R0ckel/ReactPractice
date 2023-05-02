import styles from "../../../css/app.module.css";
import {useState} from "react";
import styled from "styled-components";

import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Input, message, Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {setLoggedInValue} from "../../../contexts/reduxStore";

const NameSpan = styled.span`
  margin: 0 2vw;
  color: lightblue;
  pointer-events: none;
`

const UnclickableContent = styled.div`
  user-select: none;
`

const StatusButton = styled.button`
  background-color: inherit;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  border-radius: 1vh;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`

const StyledStatusButton = styled(StatusButton)`
  border: ${props => props.loggedIn ? '1px dotted crimson' : '3px double white'};
  margin-left: 10px;
`

const MarginedLabel = styled("label")`
  margin: 10px 0 2px;
`;

const MarginedButton = styled(Button)`
  margin-top: 20px;
`;

const Error = styled("div")`
  color: red;
`;

const LoginSchema = Yup.object().shape({
  username: Yup.string()
  .required('Please enter your username!'),
  password: Yup.string()
  .required('Please enter your password!')
});

const RegistrationSchema = Yup.object().shape({
  username: Yup.string()
  .required('Please enter your username!')
  .min(3, 'Username name must be at least 3 characters long')
  .max(40, 'Username name must be at most 40 characters long'),
  firstName: Yup.string()
  .required('Please enter your first name!')
  .min(3, 'First name must be at least 3 characters long')
  .max(40, 'First name must be at most 40 characters long'),
  lastName: Yup.string()
  .required('Please enter your last name!')
  .min(3, 'Last name must be at least 3 characters long')
  .max(40, 'Last name must be at most 40 characters long'),
  email: Yup.string()
  .required('Please enter your email!')
  .email('Invalid email address'),
  password: Yup.string()
  .required('Please enter your password!')
  .matches(/^(?=.*[A-Z])(?=.*[^a-zA-Z])/,
    'Password must contain at least one uppercase letter and one non-letter character'),
  confirmPassword: Yup.string()
  .required('Please confirm your password!')
  .oneOf([Yup.ref('password')], 'Passwords must match')
});

const LoginButton = () => {
  const {isLoggedIn, username} = useSelector(state => state.userStatus);
  const dispatch = useDispatch()
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogOut() {
    dispatch(setLoggedInValue({value: false, username: ''}))
  }

  const handleLogin = (values) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Login values:', values);
      // Perform validation here
      if (values.username && values.password
        && values.username.length > 1
        && values.password.length > 3) {
        // Set the username in the header
        // Log in the user
        dispatch(setLoggedInValue({value: true, username: values.username}));
        setIsLoginModalVisible(false);
      } else {
        // Show an error message
        message.error('Invalid login credentials').then(() => console.log("Failed to login"));
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegistration = (values) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Registration values:', values);
      // Perform registration here
      dispatch(setLoggedInValue({value: true, username: values.username}));
      setIsRegistrationModalVisible(false);
      setIsLoading(false);
    }, 1000);
  };

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const showRegistrationModal = () => {
    setIsRegistrationModalVisible(true);
  };

  const handleCancel = () => {
    setIsLoginModalVisible(false);
    setIsRegistrationModalVisible(false);
  };

  return (
    <UnclickableContent className={`${styles.headerButton} ${styles.aright}`}>
      {isLoggedIn ?
        <div>
          <NameSpan>{username}</NameSpan>
          <StyledStatusButton loggedIn onClick={handleLogOut}>
            Log out
          </StyledStatusButton>
        </div>
        :
        <>
          <StyledStatusButton onClick={showLoginModal}>
            Log in
          </StyledStatusButton>
          <StyledStatusButton onClick={showRegistrationModal}>
            Register
          </StyledStatusButton>

          <Modal title="Log in" open={isLoginModalVisible} onCancel={handleCancel} footer={null}>
            <div style={{display: 'flex', justifyContent: 'center', overflow: 'auto'}}>
              <Formik
                initialValues={{username: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({errors, touched}) => (
                  <Form style={{width: '100%'}}>
                    <MarginedLabel htmlFor="username">Username</MarginedLabel>
                    <Field name="username" as={Input} placeholder="Username" autoComplete="username"/>
                    {errors.username && touched.username ? (
                      <Error>{errors.username}</Error>
                    ) : null}

                    <MarginedLabel htmlFor="password">Password</MarginedLabel>
                    <Field name="password" as={Input.Password} placeholder="Password" autoComplete="current-password"/>
                    {errors.password && touched.password ? (
                      <Error>{errors.password}</Error>
                    ) : null}

                    <MarginedButton type="primary" htmlType="submit" loading={isLoading}>
                      Log in
                    </MarginedButton>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal>

          <Modal title="Register" open={isRegistrationModalVisible} onCancel={handleCancel} footer={null}>
            <div style={{display: 'flex', justifyContent: 'center', overflow: 'auto'}}>
              <Formik
                initialValues={{
                  username: '',
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={RegistrationSchema}
                onSubmit={handleRegistration}
              >
                {({errors, touched}) => (
                  <Form style={{width: '100%'}}>
                    <MarginedLabel htmlFor="username">Username</MarginedLabel>
                    <Field name="username" as={Input} placeholder="Nickname" autoComplete="username"/>
                    {errors.username && touched.username ? (
                      <Error>{errors.username}</Error>
                    ) : null}

                    <MarginedLabel htmlFor="firstName">First Name</MarginedLabel>
                    <Field name="firstName" as={Input} placeholder="First Name" autoComplete="given-name"/>
                    {errors.firstName && touched.firstName ? (
                      <Error>{errors.firstName}</Error>
                    ) : null}

                    <MarginedLabel htmlFor="lastName">Last Name</MarginedLabel>
                    <Field name="lastName" as={Input} placeholder="Last Name" autoComplete="family-name"/>
                    {errors.lastName && touched.lastName ? (
                      <Error>{errors.lastName}</Error>
                    ) : null}

                    <MarginedLabel htmlFor="email">Email</MarginedLabel>
                    <Field name="email" type="email" as={Input} placeholder="Email" autoComplete="email"/>
                    {errors.email && touched.email ? (
                      <Error>{errors.email}</Error>
                    ) : null}

                    <MarginedLabel htmlFor="password">Password</MarginedLabel>
                    <Field name="password" as={Input.Password} placeholder="Password" autoComplete="new-password"/>
                    {errors.password && touched.password ? (
                      <Error>{errors.password}</Error>
                    ) : null}

                    <MarginedLabel htmlFor="confirmPassword">Confirm Password</MarginedLabel>
                    <Field name="confirmPassword" as={Input.Password} placeholder="Confirm Password"
                           autoComplete="new-password"/>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Error>{errors.confirmPassword}</Error>
                    ) : null}

                    <MarginedButton type="primary" htmlType="submit" loading={isLoading}>
                      Register
                    </MarginedButton>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal>
        </>
      }
    </UnclickableContent>
  )
}

export default LoginButton;