import {useState, useEffect, useContext} from 'react';
import {helpHttp} from '../helpers/helpHttp';
import CarContext from '../context/carContext';

export const useLogin = () => {

  const api = helpHttp();
  const host = window.location.protocol + "//" + window.location.hostname;
  const url = host + "/hebbe_backend/public/api/auth/login";
  const urlGhest = host + "/hebbe_backend/public/api/auth/Guest/login";
  const urlgetitem = host + "/hebbe_backend/public/api/getItems";
  const urlgetUser = host + "/hebbe_backend/public/api/auth/me";
  const urlResetPassword = host + '/hebbe_backend/public/api/User/Validation'
  const urlMailValidation = host + '/hebbe_backend/public/api/User/Validation'
  const urlregistro = host + "/hebbe_backend/public/api/User";
  const [code,
    setCode] = useState(null);
  const [cargando,
    setCargando] = useState(false);
  const [error,
    setError] = useState(false);
  const [errorMessage,
    setErrorMessage] = useState("");
    const [success,
        setSuccess] = useState(false);
  const {
    setConditions,
    setNumItem,
    setCarItems,
    logged,
    setLogged,
    setSubtotal,
    userData,
    setUserData, subtotalWhitOutConditions, setsubtotalWhitOutConditions 
  } = useContext(CarContext);

  const isvalidcode=(_code)=>{
    if (code===_code) {
      return true;
    }
 
    setError(true)
    setTimeout(() => {
      setError(false);

    }, 5000); 
    setErrorMessage('Codigo no coinside');
    return false;
  }

  const Registration=(form ,setAddItemConfirm,setModalData)=>{
    setCargando(true)
    api.post(urlregistro, {
      body: {
        ...form
      }
    })
      .then((res) => {
        if (!res.err) {
          setError(false);
        /*   const token = captchaRef
          .current
          .getValue();
          captchaRef
          .current
          .reset(); */
          login(  {
            ...form,
           
          },setAddItemConfirm,setModalData)

/*               props.setModalData((el) => {
            el.show = false
            return {
              ...el
            }
          }) */
          // localStorage.setItem( 'token', res.access_token); localStorage.setItem(
          // 'name', res.user.name);        navigate('/');
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);

          }, 5000);
          setCargando(false)
          setErrorMessage(res.error_text);
        }
        console.log("------------------", res);
      });
  }

  const mailValidation = (form) => {
    setCargando(true)
  api.post(urlMailValidation, {
    body: {
      ...form
    }
  })
    .then((res) => {
      setCargando(false)
      if (!res.err) { 
        setError(false);
        setCode(res); 
        // localStorage.setItem( 'token', res.access_token); localStorage.setItem(
        // 'name', res.user.name);        navigate('/');
      } else {
        setCargando(false) 
        setError(true)
        setTimeout(() => {
          setError(false);
        }, 5000);
       // setSuccess(false)
        setErrorMessage(res.error_text); 
      }
      console.log("------------------", res);
    });
  }
  
  const resetPassword = (form) => {
    setCargando(true)

    api.post(urlResetPassword, {
        body: {
          ...form 
        }
      })
        .then((res) => {
          setCargando(false)
          if (!res.err) {
            setError(false);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
          } else {
            setError(true);
            setErrorMessage(res.error_text);
            console.log("------------------", res);
            setTimeout(() => {
              setError(false);
            }, 5000);
            setSuccess(false);
          }
        });

  }
  
  const login = (form, setAddItemConfirm,setModalData) => {
    //document.querySelector('meta[name="google"]').setAttribute("content", '');
    //console.log(document.querySelector('meta[name="google"]').content);
    setCargando(true)
    api
      .post(url, {
      body: {
        ...form
      }
    })
      .then((res) => {
        if (!res.err) {
          setError(false);

          console.log(res, 'kkkkkkkkkkkkkkkkkkkkkkkkkk');
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('id', res.user.id);
         
              
          setUserData({mail: res.user.email, name: res.user.name, role: res.user.role,phone:res.user.callCode+res.user.telefono,
            zip:res.user.cp,address:res.user.calle+" "+res.user.numExt+" "+res.user.numInte,colonia:res.user.colonia,reference:res.user.reference,
            nationality:res.user.nationality,estado:res.user.estado,
            ciudad:res.user.ciudad})
          setCargando(false)
          setLogged(true)
          setModalData((el) => {
            el.show = false
            return {
              ...el
            }
          })

 
                
          // localStorage.setItem( 'token', res.access_token); localStorage.setItem(
          // 'name', res.user.name);        navigate('/');
        } else {
          setCargando(false)
          setError(true);
          setTimeout(() => {
            setError(false);

          }, 5000);
          // setSuccess(false);
          setErrorMessage(res.error_text);
        }
        console.log("------------------", res);
      });
  }


  const loginGhest = (devideId, setAddItemConfirm,setModalData) => { 
    //document.querySelector('meta[name="google"]').setAttribute("content", '');
    //console.log(document.querySelector('meta[name="google"]').content);
    setCargando(true)
    api
      .post(urlGhest, {
      body: {
        'deviceid':devideId
      }
    })
      .then((res) => {
        if (!res.err) {
          setError(false);
 
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('id', res.user.id);
          api
            .post(urlgetitem, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
            .then((res) => {
              if (!res.err) {
                setNumItem(res.numItems);
                setCarItems(res.items);
                setSubtotal(res.subtotal); 
          setsubtotalWhitOutConditions(res.subtotalWhitOutConditions);
                setConditions(res.conditions);
                api
                  .post(urlgetUser, {
                  headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                  }
                })
                  .then((res) => {
                    if (!res.err) {
                      setUserData({mail: res.email, name: res.name, role: res.role,phone:res.callCode+res.telefono,
                        zip:res.cp,address:res.calle+" "+res.numExt+" "+res.numInte,colonia:res.colonia,reference:res.reference,
                        nationality:res.nationality,estado:res.estado,
                        ciudad:res.ciudad})
                      setCargando(false)
                      setLogged(true)
                      setAddItemConfirm(true) 
                      setModalData((el) => {
                        el.show = false
                        return {
                          ...el
                        }
                      })

                    } else {
                      if (res.status == 401) {
                        localStorage.clear();
                        setLogged(false)
                      }
                      setCargando(false)
                      setError(true)
                      setTimeout(() => {
                        setError(false);

                      }, 5000);
                      // setSuccess(false)
                      setErrorMessage(res.error_text);
                    }
                  });
              } else {
                if (res.status == 401) {
                  localStorage.clear();
                  setLogged(false)
                }
                setCargando(false)
                setError(true)
                setTimeout(() => {
                  setError(false);

                }, 5000);
                // setSuccess(false)
                setErrorMessage(res.error_text);
              }
            });
          // localStorage.setItem( 'token', res.access_token); localStorage.setItem(
          // 'name', res.user.name);        navigate('/');
        } else {
          setCargando(false)
          setError(true);
          setTimeout(() => {
            setError(false);

          }, 5000);
          // setSuccess(false);
          setErrorMessage(res.error_text);
        }
        console.log("------------------", res);
      });
  }




  return {cargando, error, errorMessage,success, login,loginGhest,resetPassword,mailValidation,code,setCode,isvalidcode,Registration}
}