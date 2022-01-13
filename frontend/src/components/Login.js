import { React, useState } from 'react'
import HomepageForm from "./HomepageForm";
import { withRouter } from 'react-router-dom';

function Login(props) {

  const { onLogin } = props

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({ email, password });
  }

  // React.useEffect(() => {
  //   setEmail('');
  //   setPassword('');
  // }, [])

  return (
    <HomepageForm
      title='Log in'
      linkText='Not a member yet? Sign up here!'
      linkPath='/signup'
      onSubmit={handleSubmit}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      email={email}
      password={password}
    />
  )
}

export default withRouter(Login);
