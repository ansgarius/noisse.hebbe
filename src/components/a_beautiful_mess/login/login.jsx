import React, {useState, /* useContext, */ useRef} from 'react';
import "./login.css";
//import {helpHttp} from '../../../helpers/helpHttp';
import Spinner from '../spinner/spinner';
import Alert from '../alert/alert';
/* import CarContext from '../../../context/carContext'; */
/* import Registro from '../registro/registro'; */
import ReCAPTCHA from "react-google-recaptcha";
import {useTranslation} from 'react-i18next';
import { useLogin } from '../../../hooks/useLogin';

const initialForm = {
  email: "",
  password: "",
  resetPass: true
}
const Login = (props) => {

  const toLogin=useLogin()

  const captchaRef = useRef(null)
  const {t, i18n} = useTranslation();

  const [form,
    setForm] = useState(initialForm);

  const [passwordReset,
    setPasswordReset] = useState(false);
  const [code,
    setCode] = useState(null);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmitGhest = e => {
    e.preventDefault();
 
    toLogin.loginGhest(  props.ghest,props.setAddItemConfirm,props.setModalData)
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    const token = captchaRef
      .current
      .getValue();
    captchaRef
      .current
      .reset();
    toLogin.login(  {
      ...form,
      tokeReecaptcha: token
    },props.setAddItemConfirm,props.setModalData)
 
  }

  const resetPassword = e => {
    e.preventDefault();

    toLogin.resetPassword( {
      ...form,
      language: i18n.language
    }) 
  }

  return ( 
  
  <div className='hebbe_login'>
    {!passwordReset && <ReCAPTCHA
      ref={captchaRef}
      sitekey="6LcMdrsZAAAAAFqH2DIlR06sUkCXCxqnatxjXq8i"
      style={{
      transform: "scale(0.77)",
      transformOrigin: "0 0",
   //   marginBottom: "16px",
      padding: "0dvw 3.333333333333333dvw 0dvw 3.333333333333333dvw",
      margin:'0'
    }}/>
}

    <div className='contentLogin'>



    {props.ghest&&<div className='wrapper-ghest' onClick={handleSubmitGhest}>
          <p>Continue as a guest</p>
        </div>}
      
      
      
      {passwordReset &&<div > <p className='tittle'>Reset Password</p> </div>}
      {!passwordReset &&<div > <p className='tittle'>Login</p> < p className = 'text' > Already have your code
        ? Login
        : </p> </div>}

      {toLogin.success &&< Alert mensajeError = "Registro exitoso" bg = "#D4EDDA" color = "green" />}
      {toLogin.error &&< Alert mensajeError = {
        toLogin.errorMessage
      }
      bg = "#F8D7DA" color = "red" bc = '#fcc2c3' />}
      {toLogin.cargando && <Spinner/>}

      <div className="group">
        <div style={{
          position: "relative"
        }}>
          <input type="text" name="email" onChange={handleChange} value={form.email}/>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>Email</label>
        </div>
      </div>
      {!passwordReset && <div>

        <div className="group">
          <div style={{
            position: "relative"
          }}>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Code</label>
          </div>
        </div>

        <div className='wrapper' onClick={handleSubmit}>
          <p>Sign In</p>
        </div>




      </div>}

      {passwordReset && <div className='wrapper' onClick={resetPassword}>
        <p>Reset Password</p>
      </div>
}

    </div>

    <div className='footer'>
      <p className='tittle'>New Customer?</p>
      <p className='text'>Sing up for an account to take advantage of order tracking
        and history as well as pre-filled forms during checkout on subsequent order</p>
    </div>
  </div> 
    );
};
export default Login;