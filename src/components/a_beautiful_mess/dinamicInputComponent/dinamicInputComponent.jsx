import React,{useRef} from 'react';
import "./dinamicInputComponent.css";
import ButtonComponent from '../buttonComponent/buttonComponent';
import InputComponent from '../inputComponent/inputComponent';
import FieldsetComponent from '../fieldsetComponent/fieldsetComponent';
import DropZone from '../drop_zone/drop_zone';
import SelectComponent from '../selectComponent/selectComponent';

const DinamicInputComponent = ({items, setItems, entity, title, options,children}) => 
  {        
    const counter = useRef(1);
    const addItem = () => {
      entity.id = ++counter.current;
      setItems((e)=>{
        return [...e,{...entity}];
      });
    };
    const removeItem = (e, id) => {
      setItems(items.filter((p) => p.id != id));
    };
    const handleChange = (e, id) => {
      const { name, value } = e.target;
      setItems(
        items.map((p) => (p.id == id ? { ...p, [name]:value } : p))
      );
    };
    const handleChangeFile = (data,clave, id) => {
      console.log(data,clave, id,items);


      setItems((d)=>
        d.map((p) => (p.id == id ? { ...p, [clave]:data } : p))
      ); 
     /*  setItems(
        items.map((p) => p)
      );  */
   /*    setItems(
        items.map((p) => (p.id == id ? { ...p, [clave]:data } : p))
      ); */


/*       setItems(
        items.map((p) => {    
        return   p.id == id ? { ...p, [clave]:data } : {...p}
    })
      ); */





    };
    return (     
      <div className='dinamicInputComponent'> 
        <FieldsetComponent tittle={title}>
          {items.map((item, index) => (
            <div className='dinamicInputComponentWrapper' key={item.id}>
                { Object.keys(item).map((clave, i) => (
                  <div  key={clave}>
                    {clave!='id'&&options[clave].type!='file'&&options[clave].type!='select'&&<InputComponent type={options?options[clave].type:'text'}
                      label={clave}  name={clave} handleChange={(e) => handleChange(e, item.id)}  form={item} />}
                    {clave!='id'&&options[clave].type=='file' &&<DropZone title={options[clave].title} setFotos={
                      (data)=>{handleChangeFile(data,clave,item.id)}} fotos={item[clave]} multipleFile={options[clave].multipleFile}></DropZone>}
                    {clave!='id'&&options[clave].type=='select' &&
                      <SelectComponent  form={item} handleChange={(e) => handleChange(e, item.id)}
                        label={options[clave].label}  name={clave}  data={options[clave].data}/>
                    }
                  </div>
                ))}
                <ButtonComponent handleClick={(e) => removeItem(e, item.id)} label={'Remove'}/>
            </div>
          ))}
          <ButtonComponent handleClick={addItem} label={'Add'}/> 
        </FieldsetComponent>
    </div>
    );
};
export default DinamicInputComponent;