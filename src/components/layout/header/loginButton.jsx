import styles from "../../../css/app.module.css";
import {useContext} from "react";
import {UserStatusContext} from "../../../contexts/userStatus.context";
import styled from "styled-components";

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
  const {isLoggedIn, setLoggedInValue} = useContext(UserStatusContext);

  function statusHandler() {
    setLoggedInValue(!isLoggedIn)
  }


  return (
    <UnclickableContent className={`${styles.headerButton} ${styles.aright}`}>
      {isLoggedIn ?
        <div>
          <NameSpan>Rockel</NameSpan>
          <StyledStatusButton loggedIn onClick={statusHandler}>
            Log out
          </StyledStatusButton>
        </div>
        :
        <StyledStatusButton onClick={statusHandler}>
          Log in
        </StyledStatusButton>}
    </UnclickableContent>
  )
}

export default LoginButton