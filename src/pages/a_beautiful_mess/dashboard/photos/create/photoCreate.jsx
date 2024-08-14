import React, {useState,useContext, useEffect} from 'react';
import "./photoCreate.css";   
import DropZone from '../../../../../components/a_beautiful_mess/drop_zone/drop_zone';
import MenuV2 from '../../../../../components/a_beautiful_mess/menuV2/menuV2';
import Tittle from '../../../../../components/a_beautiful_mess/tittle/tittle';
 
import CarContext  from '../../../../../context/carContext';
import {helpHttp} from '../../../../../helpers/helpHttp'; 
import Spinner from '../../../../../components/a_beautiful_mess/spinner/spinner';
import Alert from '../../../../../components/a_beautiful_mess/alert/alert';
import InputComponent from '../../../../../components/a_beautiful_mess/inputComponent/inputComponent';
import ButtonComponent from '../../../../../components/a_beautiful_mess/buttonComponent/buttonComponent';
import DinamicInputComponent from '../../../../../components/a_beautiful_mess/dinamicInputComponent/dinamicInputComponent';
import FieldsetComponent from '../../../../../components/a_beautiful_mess/fieldsetComponent/fieldsetComponent';
import SearchComponent from '../../../../../components/a_beautiful_mess/searchComponent/searchComponent';
import PaginationComponent from '../../../../../components/a_beautiful_mess/paginationComponent/paginationComponent';
import TableComponent from '../../../../../components/a_beautiful_mess/tableComponent/tableComponent';
import DinamicSelectComponent from '../../../../../components/a_beautiful_mess/dinamicSelectComponent/dinamicSelectComponent';

const initialForm = {
	date: "",   
  }


const PhotoCreate = () => {
	const ClienteEntity = {
		id_client: '',
	};
  let [sectionsCat,setSectionsCat] = useState([]);

  const SectionEntity={
    portada:'',
    fotos:'',
    section_id:'',
    textcolor:'',
    bgcolor:'',
  };
 
  const SectionOptions={
    portada:{type:'file',title:'Portada',multipleFile:false},
    fotos:{type:'file',title:'Photos',multipleFile:true},
    section_id:{type:'select',data:sectionsCat,label:'Section',entity:{
      section_id: '',
    } },
    textcolor:{type:'color'},
    bgcolor:{type:'color'},
  };
   
  let api = helpHttp();
  let host = window.location.protocol + "//" + window.location.hostname;
  let urlUser = host + "/hebbe_backend/public/api/Users";
  let urlSections = host + "/hebbe_backend/public/api/Sections";
  let urlIndex = host + "/hebbe_backend/public/api/Projects";
  let urlregistro = host + "/hebbe_backend/public/api/Project";
  let urldelete = host + "/hebbe_backend/public/api/Project/Delete";
  let urlUpdate = host + "/hebbe_backend/public/api/Project";
  const [fotos, setFotos] = useState([]);

  const headers= {
    Authorization: 'Bearer ' + localStorage.getItem('token')  
  }
  const {logged,setLogged,userData}=useContext(CarContext);

  let [buscarValue,
    setBuscarValue] = useState('');
 
    
    let [users,setUsers] = useState([]);
    let [Clientes,setClientes] = useState([{...ClienteEntity,id:0}]);
    let [Sections,setSections] = useState([{...SectionEntity,id:0}]);
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
    setForm(initialForm)
    setClientes([{...ClienteEntity,id:0}])
  
    setSections([{...SectionEntity,id:0}])
    setCargando(true)
    api.get(urlregistro +'/'+ registro.id ,{ headers})
    .then((res) => {
        setCargando(false)
        if (!res.err) {
          setForm({"date":res.date,"id":res.id})
          setClientes(res.clientes.map((e)=>{return {"id_client":e.id,"id":e.id}}))
          console.log(res);
         
          setSections(res.sections.map((e)=>{
            return {fotos:e.pivot.photos.map((f)=>f.name)
              
              
              
              ,portada:[e.pivot.portada],"section_id":e.pivot.section_id,"textcolor":e.pivot.textcolor,"bgcolor":e.pivot.bgcolor,"id":e.id}
          }))
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
    if (window.confirm("Estas segur@ de borrar el Projecto " + cp + "?")) {
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


    let formData = new FormData()
    formData.append("date",form.date)
    Clientes.forEach((item, index) => {
      formData.append('clientes[' + index + '][id_client]', item.id_client);
  });
  Sections.forEach((item, index) => {
    formData.append('Sections[' + index + '][section_id]', item.section_id);
    formData.append('Sections[' + index + '][bgcolor]', item.bgcolor);
    formData.append('Sections[' + index + '][textcolor]', item.textcolor);

    Array.from(item.portada).forEach((file, i) => {
      console.log(file, i);
    formData.append('Sections[' + index + '][portada]['+i+']', file);
    })


    Array.from(item.fotos).forEach((file, i) => {
    formData.append('Sections[' + index + '][fotos]['+i+']', file);
    })
/*     Array.from(item.portada).forEach((file, index2) => {
  }); */
   // formData.append('Sections[' + index + '][portada]', item.portada);



});
 
  /*   for (const key of formData.keys()) {
      console.log(key);
    }

    for (const key of formData.values()) {
      console.log(key);
    } */

    api.post(urlUpdate + '/' + form.id, {body:formData , headers},true)
      .then((res) => {
        if (!res.err) {
          console.log(res);
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
    let formData = new FormData()

/*     Array.from(fotos).forEach((file, index) => {
        formData.append('fotos[' + index + ']', file);
    }); */
    Clientes.forEach((item, index) => {
      formData.append('clientes[' + index + '][id_client]', item.id_client);
  });

  Sections.forEach((item, index) => {
    formData.append('Sections[' + index + '][section_id]', item.section_id);
    formData.append('Sections[' + index + '][bgcolor]', item.bgcolor);
    formData.append('Sections[' + index + '][textcolor]', item.textcolor);

    Array.from(item.portada).forEach((file, i) => {
      console.log(file, i);
    formData.append('Sections[' + index + '][portada]['+i+']', file);
    })


    Array.from(item.fotos).forEach((file, i) => {
    formData.append('Sections[' + index + '][fotos]['+i+']', file);
    })
/*     Array.from(item.portada).forEach((file, index2) => {
  }); */
   // formData.append('Sections[' + index + '][portada]', item.portada);



});
    formData.append("date",form.date)
 
  /*   for (const key of formData.keys()) {
      console.log(key);
    }

    for (const key of formData.values()) {
      console.log(key);
    } */
    api.post(urlregistro, {body: formData, headers},true)
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

  const getSections = (x = "") => {
    setCargando(true)
    api.get(urlSections + '?pagination=false&search=' + x,{ headers})
    .then((res) => {
        setCargando(false)
        if (!res.err) { 
          setSectionsCat(            res.map((x) => {return {[x.id]:x.title}})      )
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
    getSections()
  }, [])
	
    return ( 
    	<> 
			<MenuV2 isportal={0}  ></MenuV2>
			<Tittle/>
			<div className='hebbe_projects'>
				<div className='wrapper'>
					<div className='left'> 
            
          <FieldsetComponent tittle={'Create/Edit Admin User'}>
							{success &&< Alert mensajeError = "Operacion exitoso" bg = "#D4EDDA" color = "green" bc = "#D4EDDA" />}
							{error &&< Alert mensajeError = { errorMessage} bg = "#F8D7DA" color = "red" />}
							{cargando &&< Spinner />}
							<InputComponent type={'date'} form={form} handleChange={handleChange} label={'Date'} name={'date'}/>
  						<div className='buttonWrapper'>
								{!editRow &&<ButtonComponent handleClick={handleSubmit} label={'Guardar'}/>}
								{editRow && <ButtonComponent handleClick={handleSubmitUpdate} label={'Actualizar'}/>}
								{editRow &&<ButtonComponent handleClick={() => {setEditRow(false)}} label={'Nuevo'}/>}
	  					</div>
						</FieldsetComponent> 
            
            
            <DinamicSelectComponent data={users} label={"Clientes"}  entity={ClienteEntity} items={Clientes} setItems={setClientes}/>
            <DinamicInputComponent entity={SectionEntity} items={Sections} setItems={setSections} title={'Sections'} options={SectionOptions}/>
						
      {/*       <FieldsetComponent tittle={'Photos'}>
							<DropZone title={'Photos'} setFotos={setFotos} fotos={fotos} multipleFile={1}></DropZone>
						</FieldsetComponent> */}
            
            
            
            
            
            
            

					
          
          
          
          </div>
   				<div className='right'>
						<SearchComponent handleChange={handleChange} handleClick={buscar} name={buscarValue}></SearchComponent>
          	{!cargando &&total != 0 &&<TableComponent data={dataApi.data} update={update} delet={delet} urlDitail={'/Dashboard/'}/>}
      			<PaginationComponent total={total} from={from} to={to} current_page={current_page} last_page={last_page} 
				      anterior={anterior} siguiente={siguiente}></PaginationComponent>
          </div>
        </div>
      </div>
		</>
    );
};
export default PhotoCreate;