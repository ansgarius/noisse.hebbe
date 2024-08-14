import React, {useState,useContext, useEffect} from 'react';
import "./sections.css";   
import DropZone from '../../../../components/a_beautiful_mess/drop_zone/drop_zone';
import MenuV2 from '../../../../components/a_beautiful_mess/menuV2/menuV2';
import Tittle from '../../../../components/a_beautiful_mess/tittle/tittle';
 
import CarContext  from '../../../../context/carContext';
import {helpHttp} from '../../../../helpers/helpHttp'; 
import Spinner from '../../../../components/a_beautiful_mess/spinner/spinner';
import Alert from '../../../../components/a_beautiful_mess/alert/alert';
import InputComponent from '../../../../components/a_beautiful_mess/inputComponent/inputComponent';
import ButtonComponent from '../../../../components/a_beautiful_mess/buttonComponent/buttonComponent';
import DinamicInputComponent from '../../../../components/a_beautiful_mess/dinamicInputComponent/dinamicInputComponent';
import FieldsetComponent from '../../../../components/a_beautiful_mess/fieldsetComponent/fieldsetComponent';
import SearchComponent from '../../../../components/a_beautiful_mess/searchComponent/searchComponent';
import PaginationComponent from '../../../../components/a_beautiful_mess/paginationComponent/paginationComponent';
import TableComponent from '../../../../components/a_beautiful_mess/tableComponent/tableComponent';
import DinamicSelectComponent from '../../../../components/a_beautiful_mess/dinamicSelectComponent/dinamicSelectComponent';

const initialForm = {
	title: "",   
	subtitle: "",   
	text: "",
  }


const Sections = () => {
	const ClienteEntity = {
		id_client: '',
	};
   
  let api = helpHttp();
  let host = window.location.protocol + "//" + window.location.hostname;
  let urlUser = host + "/hebbe_backend/public/api/Users";
  let urlIndex = host + "/hebbe_backend/public/api/Sections";
  let urlregistro = host + "/hebbe_backend/public/api/Section";
  let urldelete = host + "/hebbe_backend/public/api/Section/Delete";
  let urlUpdate = host + "/hebbe_backend/public/api/Section";
  const [fotos, setFotos] = useState([]);

  const headers= {
    Authorization: 'Bearer ' + localStorage.getItem('token')  
  }
  const {logged,setLogged,userData}=useContext(CarContext);

  let [buscarValue,
    setBuscarValue] = useState('');
 
    
    let [users,setUsers] = useState([]);
    let [Clientes,setClientes] = useState([{...ClienteEntity,id:0}]);
  let [dataApi,
    setDataApi] = useState([]);
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
    setCargando(true)
    api.get(urlregistro +'/'+ registro.id ,{ headers})
    .then((res) => {
        setCargando(false)
        if (!res.err) {
          setForm({"title":res.title,"subtitle":res.subtitle,"text":res.text,"id":res.id})
        } 
        else {
          errorHandle(res.status,res.error_text)
        }
      }); 
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
    }, 10000);
    // setSuccess(false)
    setErrorMessage(msg);
  }

  const delet = (id, cp) => { //realiza el borrado de registros
    setSuccess(false)
    setError(false);
    if (window.confirm("Estas segur@ de borrar el Section " + cp + "?")) {
      setCargando(true)
      api.post(urldelete + '/' + cp, {body: form, headers})
        .then((res) => {
          console.log(res);
          if (!res.err) {
            setSuccess(true) 
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
           setClientes([{...ClienteEntity,id:0}])
            setFotos([])
            setForm(initialForm)
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

/*   useEffect(()=>{
	  console.log(fotos);
  },[fotos]); */

  const handleSubmitUpdate = () => {
    setCargando(true)
    setSuccess(false)
    setError(false); 

 
 
  /*   for (const key of formData.keys()) {
      console.log(key);
    }

    for (const key of formData.values()) {
      console.log(key);
    } */

    api.post(urlUpdate + '/' + form.id, {body:form , headers})
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
          setDataApi(res)
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
          setDataApi(res)
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
   
 
  /*   for (const key of formData.keys()) {
      console.log(key);
    }

    for (const key of formData.values()) {
      console.log(key);
    } */
    api.post(urlregistro, {body: form, headers})
      .then((res) => {
        console.log(res);
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

  
  const getUsers = (x = "") => {
    setCargando(true)
    api.get(urlUser + '?pagination=false&search=' + x,{ headers})
    .then((res) => {
        setCargando(false)
        if (!res.err) { 
          setUsers(            res.map((x) => {return {[x.id]:x.name}})      )
          window.scroll(0, 0);
        } 
        else {
          errorHandle(res.status,res.error_text)
        }
      }); 
  }

  const index = (x = "") => {
    setCargando(true)
    api.get(urlIndex + '?pagination=&search=' + x,{ headers})
    .then((res) => {
        setCargando(false)
        if (!res.err) {
          setDataApi(res)
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
    getUsers()
  }, [])
	
    return ( 
    	<> 
			<MenuV2 isportal={0}  ></MenuV2>
			<Tittle/>
			<div className='hebbe_sections'>
				<div className='wrapper'>
					<div className='left'> 
 
       
						<FieldsetComponent tittle={'Sections'}>
							{success &&< Alert mensajeError = "Operacion exitoso" bg = "#D4EDDA" color = "green" bc = "#D4EDDA" />}
							{error &&< Alert mensajeError = { errorMessage} bg = "#F8D7DA" color = "red" />}
							{cargando &&< Spinner />}
							<InputComponent type={'text'} form={form} handleChange={handleChange} label={'Title'} name={'title'}/>
							<InputComponent type={'text'} form={form} handleChange={handleChange} label={'Subtitle'} name={'subtitle'}/>
							<InputComponent type={'text'} form={form} handleChange={handleChange} label={'Text'} name={'text'}/>

 

  						<div className='buttonWrapper'>
								{!editRow &&<ButtonComponent handleClick={handleSubmit} label={'Guardar'}/>}
								{editRow && <ButtonComponent handleClick={handleSubmitUpdate} label={'Actualizar'}/>}
								{editRow &&<ButtonComponent handleClick={() => {setEditRow(false)}} label={'Nuevo'}/>}
	  					</div>
						</FieldsetComponent> 







					</div>
   				<div className='right'>
						<SearchComponent handleChange={handleChange} handleClick={buscar} name={buscarValue}></SearchComponent>
          	{!cargando &&total != 0 &&<TableComponent data={dataApi.data} update={update} delet={delet}  />}
      			<PaginationComponent total={total} from={from} to={to} current_page={current_page} last_page={last_page} 
				      anterior={anterior} siguiente={siguiente}></PaginationComponent>
          </div>
        </div>
      </div>
		</>
    );
};
export default Sections;