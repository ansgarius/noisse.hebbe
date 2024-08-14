import React, {useState, useEffect, useContext} from 'react';
import "./crud.css"; 
import {helpHttp} from '../../../helpers/helpHttp'; 
import Alert from '../alert/alert';
import CarContext  from '../../../context/carContext';

import {useParams} from 'react-router-dom';
import MenuV2 from '../menuV2/menuV2';
import Spinner from '../spinner/spinner';
import Tittle from '../tittle/tittle';

 
import SelectComponent from '../selectComponent/selectComponent';
import ButtonComponent from '../buttonComponent/buttonComponent';
import FieldsetComponent from '../fieldsetComponent/fieldsetComponent';
import SearchComponent from '../searchComponent/searchComponent';
import PaginationComponent from '../paginationComponent/paginationComponent';
import TableComponent from '../tableComponent/tableComponent';
import InputComponent from '../inputComponent/inputComponent';

const initialForm = {
  name: "",
  role: "Cliente",
  telefono: "",
  sexo: "", 
  fnace: "",
  email: "",
  password: "",
   
  calle:'',
  numInte:'',
  numExt:'',
  cp:'',
  ciudad:'',
  estado:'',
  colonia:'',  
}

/* const initialForm={
  } */
const Crud = () => {

  const {module} = useParams();
  let api = helpHttp();
  let host = window.location.protocol + "//" + window.location.hostname;
  let urIndex = host + "/hebbe_backend/public/api/Users";
  let urlregistro = host + "/hebbe_backend/public/api/newUser";
  let urldelete = host + "/hebbe_backend/public/api/User/Delete";
  let urlUpdate = host + "/hebbe_backend/public/api/User";


  const {conditions, setConditions,setNumItem,carItems,setCarItems,logged,setLogged,setSubtotal,subtotal,userData,
    subtotalWhitOutConditions, setsubtotalWhitOutConditions}=useContext(CarContext);
    const headers= {
      Authorization: 'Bearer ' + localStorage.getItem('token')  
    }

  let [buscarValue,
    setBuscarValue] = useState('');
  let [Columns,
    setColumns] = useState([]);
  let [users,
    setUsers] = useState([]);
  let [editRow,
    setEditRow] = useState(false);

  let [total,
    setTotal] = useState(0);
  let [from,
    setFrom] = useState(0);
  let [to,
    setTo] = useState(0);
  let [prev_page_url,
    setPrev_page_url] = useState('');
  let [per_page,
    setPer_page] = useState('');
  let [next_page_url,
    setNext_page_url] = useState('');
  let [last_page_url,
    setLast_page_url] = useState('');
  let [last_page,
    setLast_page] = useState('');
  let [first_page,
    setFirst_page_url] = useState('');
  let [current_page,
    setCurrent_page] = useState('');
  let [data,
    setData] = useState('');

  const [cargando,
    setCargando] = useState(false);
  const [form,
    setForm] = useState(initialForm);
  /*    const [form, setForm] = useState([]); */
  const [error,
    setError] = useState(false);
  const [errorMessage,
    setErrorMessage] = useState("");
  const [success,
    setSuccess] = useState(false);

    




  const handleChange = e => {
    if (e.target.name == 'buscarValue') {
      setBuscarValue(e.target.value)
    } else 
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }
  
  const update = (registro) => { 
    setEditRow(true)
    setForm({})
    setForm({
      ...registro
    })
  }

  const errorHandle=(status, msg)=>{
    if (status == 401) {
      localStorage.clear();
      setLogged(false)
    } 
    setCargando(false) 
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
    // setSuccess(false)
    setErrorMessage(msg);
  }

  const delet = (id, cp) => { //realiza el borrado de registros
    setSuccess(false)
    setError(false);
    if (window.confirm("Estas segur@ de borrar el USUARIO " + cp + "?")) {
      setCargando(true)
      api.post(urldelete + '/' + cp, {body: form, headers})
        .then((res) => {
          if (!res.err) {        
            setSuccess(true) 
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
            index()
          } else {
            errorHandle(res.status,res.error_text)
          }
        });
    }
  }

  const buscar = () => {
    index(buscarValue)
  }


  const getCode=()=>{
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 16) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    } 
    setForm({
      ...form,
      password:result
  }); 
  }

  const handleSubmitUpdate = () => {
    setCargando(true)
    setSuccess(false)
    setError(false);
    api.post(urlUpdate + '/' + form.id, {body: form, headers})
      .then((res) => {
        if (!res.err) {        
          setSuccess(true) 
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
          index()
        }     
        else {
          errorHandle(res.status,res.error_text)
        }
      });
  }

  const siguiente = () => {
    setCargando(true)
    api.get(next_page_url, {headers })
      .then((res) => {
        setCargando(false)
        if (!res.err) {
          setUsers(res)
          setTotal(res.total)
          setFrom(res.from)
          setTo(res.to)
          setPrev_page_url(res.prev_page_url)
          setPer_page(res.per_page)
          setNext_page_url(res.next_page_url)
          setLast_page_url(res.last_page_url)
          setLast_page(res.last_page)
          setFirst_page_url(res.first_page_url)
          setData(res.data)
          setCurrent_page(res.current_page)
          window.scroll(0, 0);
        }     
        else {
          errorHandle(res.status,res.error_text)
        }
      });
  }

  const anterior = () => {
    setCargando(true)
    api.get(prev_page_url, {  headers })
      .then((res) => {
        setCargando(false)
        if (!res.err) {
          setUsers(res)
          setTotal(res.total)
          setFrom(res.from)
          setTo(res.to)
          setPrev_page_url(res.prev_page_url)
          setPer_page(res.per_page)
          setNext_page_url(res.next_page_url)
          setLast_page_url(res.last_page_url)
          setLast_page(res.last_page)
          setFirst_page_url(res.first_page_url)
          setData(res.data)
          setCurrent_page(res.current_page)
          window.scroll(0, 0);
         }     
         else {
           errorHandle(res.status,res.error_text)
         }
      });
  }

  const handleSubmit = e => {
    setCargando(true)
    e.preventDefault();
    setSuccess(false)
    setError(false); 
    api.post(urlregistro, {body: form, headers})
      .then((res) => {
        if (!res.err) {          
          setSuccess(true) 
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
          index()
        } 
        else {
          errorHandle(res.status,res.error_text)
        }
      });
  }

  const index = (x = "") => {
    setCargando(true)
    api.get(urIndex + '?pagination=&search=' + x,{ headers})
    .then((res) => {
        setCargando(false)
        if (!res.err) {
          setUsers(res)
          setTotal(res.total)
          setFrom(res.from)
          setTo(res.to)
          setPrev_page_url(res.prev_page_url)
          setPer_page(res.per_page)
          setNext_page_url(res.next_page_url)
          setLast_page_url(res.last_page_url)
          setLast_page(res.last_page)
          setFirst_page_url(res.first_page_url)
          setData(res.data)
          setCurrent_page(res.current_page)
          window.scroll(0, 0);
        } 
        else {
          errorHandle(res.status,res.error_text)
        }
      }); 
  }

  useEffect(() => { 
    index()
  }, [])
	

  return ( 
    <> 
    <MenuV2 isportal={0}  ></MenuV2>
    <Tittle/>
    <div className='hebbe_crud'>
      <div className='wrapper'>
        <div className='left'>
          <FieldsetComponent tittle={'Create/Edit Admin User'}>
                {success &&< Alert mensajeError = "Operacion exitoso" bg = "#D4EDDA" color = "green" bc = "#D4EDDA" />}
                {error &&< Alert mensajeError = { errorMessage} bg = "#F8D7DA" color = "red" />}
                {cargando &&< Spinner />}
                <InputComponent type={'text'} form={form} handleChange={handleChange} label={'Name'} name={'name'}/>
                <InputComponent type={'text'} form={form} handleChange={handleChange} label={'Calle'} name={'calle'}/>
                <InputComponent type={'text'} form={form} handleChange={handleChange} label={'Ciudad'} name={'ciudad'}/>
                <InputComponent type={'text'} form={form} handleChange={handleChange} label={'Estado'} name={'estado'}/>
                <InputComponent type={'text'} form={form} handleChange={handleChange} label={'Colonia'} name={'colonia'}/>
                <InputComponent type={'number'} form={form} handleChange={handleChange} label={'Num Ext'} name={'numExt'}/>
                <InputComponent type={'number'} form={form} handleChange={handleChange} label={'Num Int'} name={'numInte'}/>
                <InputComponent type={'number'} form={form} handleChange={handleChange} label={'Posta Code'} name={'cp'}/>
                <InputComponent type={'date'} form={form} handleChange={handleChange} label={'Birthday'} name={'fnace'}/>
                <InputComponent type={'mail'} form={form} handleChange={handleChange} label={'E-mail'} name={'email'}/>
                <InputComponent type={'number'} form={form} handleChange={handleChange} label={'Phone'} name={'telefono'}/>
                <InputComponent type={'text'} form={form} handleChange={handleChange} label={'Password'} name={'password'}>
                  <small onClick={getCode}>Generate Code</small>
                  </InputComponent>
                <SelectComponent  form={form} handleChange={handleChange} label={'Role'} name={'role'} 
                data={[{Admin:"Admin"},{Cliente:"Cliente"}]}/>
                <SelectComponent  form={form} handleChange={handleChange} label={'Gender'} name={'sexo'} 
                data={[{H:"Male"},{M:"Female"}]}/>
                
                <div className='buttonWrapper'>
                  {!editRow &&<ButtonComponent handleClick={handleSubmit} label={'Guardar'}/>}
                  {editRow && <ButtonComponent handleClick={handleSubmitUpdate} label={'Actualizar'}/>}
                  {editRow &&<ButtonComponent handleClick={() => {setEditRow(false)}} label={'Nuevo'}/>}
                </div>
          </FieldsetComponent>
        </div>
         <div className='right'>
          <SearchComponent handleChange={handleChange} handleClick={buscar} name={buscarValue}></SearchComponent>
          {!cargando &&total != 0 &&<TableComponent data={users.data} update={update} delet={delet}/>}
          <PaginationComponent total={total} from={from} to={to} current_page={current_page} last_page={last_page} 
            anterior={anterior} siguiente={siguiente}></PaginationComponent>
        </div>
      </div>
    </div>
  </>
    );
};
export default Crud;