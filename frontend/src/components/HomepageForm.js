import { React } from 'react'
import { Link } from 'react-router-dom'

function HomepageForm(props) {
  const { title, linkText, linkPath, onSubmit, onEmailChange,
    onPasswordChange, email, password } = props

  return (
    <section className='homepage' >
      <form className='homepage__form' onSubmit={onSubmit}>
        <h2 className='homepage__title'>{title}</h2>
        <label className='homepage__input-label'>
          < input className='homepage__input' type='email' name='email' id='email'
            placeholder='Email' onChange={onEmailChange} value={email} required />
        </label>
        <label className='homepage__input-label'>
          <input className='homepage__input' type='password' name='password' id='password'
            placeholder='Password' onChange={onPasswordChange} value={password} required />
        </label>
        <button type='submit' className='homepage__submit'>{title}</button>
      </form>
      <Link to={linkPath} className='homepage__link'>{linkText}</Link>
    </section>
  )
}

export default HomepageForm;
