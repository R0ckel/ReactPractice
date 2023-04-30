import styles from "../../../css/app.module.css";
import {useContext, useState} from "react";
import {UserStatusContext} from "../../../contexts/userStatus.context";
import styled from "styled-components";
import {Button, Form, Input, message, Modal} from 'antd';

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
`

const LoginButton = () => {
  const {isLoggedIn, username, setLoggedInValue} = useContext(UserStatusContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function statusHandler() {
    setLoggedInValue(!isLoggedIn)
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
        setLoggedInValue(true, values.username);
        setIsModalVisible(false);
      } else {
        // Show an error message
        message.error('Invalid login credentials');
      }
      setIsLoading(false);
    }, 3000);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <UnclickableContent className={`${styles.headerButton} ${styles.aright}`}>
      {isLoggedIn ?
        <div>
          <NameSpan>{username}</NameSpan>
          <StyledStatusButton loggedIn onClick={statusHandler}>
            Log out
          </StyledStatusButton>
        </div>
        :
        <>
          <StyledStatusButton onClick={showModal}>
            Log in
          </StyledStatusButton>

          <Modal title="Log in" open={isModalVisible} onCancel={handleCancel} footer={null}>
            <Form onFinish={handleLogin} style={{width: '100%'}}>
              <Form.Item name="username" rules={[{required: true, message: 'Please enter your username!'}]}>
                <Input placeholder="Username" autoComplete="username"/>
              </Form.Item>
              <Form.Item name="password" rules={[{required: true, message: 'Please enter your password!'}]}>
                <Input.Password placeholder="Password" autoComplete="current-password"/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </>
      }
    </UnclickableContent>
  )
}

export default LoginButton