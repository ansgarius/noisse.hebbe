import React,{useRef,useState} from 'react';
import "./dinamicSelectComponent.css";
import ButtonComponent from '../buttonComponent/buttonComponent';
import InputComponent from '../inputComponent/inputComponent';
import FieldsetComponent from '../fieldsetComponent/fieldsetComponent';
import SelectComponent from '../selectComponent/selectComponent';

const DinamicSelectComponent = ({ entity,items, setItems, label,data, children}) => 
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

    return (     
      <div className='dinamicSelectComponent'> 
      <FieldsetComponent tittle={label}>
        {items.map((item, index) => (
          <div className='dinamicSelectComponentWrapper' key={item.id}>
            { Object.keys(item).map((clave, i) => (
              <div  key={clave}>
                {clave!='id'&&<SelectComponent  form={item} handleChange={(e) => handleChange(e, item.id)}
                  label={label} name={clave} data={data}/>}
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

export default DinamicSelectComponent;