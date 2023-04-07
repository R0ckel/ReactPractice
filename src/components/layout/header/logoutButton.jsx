const LogoutButton = (props) => {
  return (
    <div className="headerButton aright">
      <button className="btn white" onClick={() => props.setLoginStatus(false)}>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton