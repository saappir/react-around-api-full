import { React, useState } from 'react';
import { withRouter } from 'react-router-dom';
import HomepageForm from "./HomepageForm";

function Register(props) {

  const { onRegister } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  // React.useEffect(() => {
  //   setEmail('');
  //   setPassword('');
  // }, [])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ email, password })
  }

  return (
    <HomepageForm
      title='Sign up'
      linkText='Already a member? Log in here!'
      linkPath={'signin'}
      onSubmit={handleSubmit}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      email={email}
      password={password}
    />
  )
}

export default withRouter(Register);
