import React from 'react';
import "./tableComponent.css";
import ButtonComponent from '../buttonComponent/buttonComponent';
import {Link} from "react-router-dom";

const TableComponent = ({data,update,delet,urlDitail}) => {
    return (     
      <div className="tableComponent">
        <table className=" table-striped  table-hover  ">
          <thead  >
            <tr>
              {urlDitail&&<th ></th>}
              <th ></th>
              <th ></th>
              { Object.keys(data[0]).map((clave, i) => (
                <th key={clave}>{clave}</th> 
              ))}    
              {/* <th>Name</th> 
                <th>Colonia</th>
                <th>calle</th>
                <th>numExt</th>
                <th>numInte</th>
                <th>ciudad</th>
                <th>estado</th>
                <th>Postal code</th>  
                <th>Birthday</th>
                <th>E-mail</th> 
                <th>Phone</th>
                <th>Role</th>
                <th>Gender</th> */}
            </tr>
          </thead>
          <tbody>
            {data
              ?.map((registro, index) => {
                return (
                  <tr key={index}>
                    {urlDitail&& <td   title="Editar" >
                      <Link  to={urlDitail+registro.id}>
                        <ButtonComponent   label={'Details'}/>
                      </Link>
                    </td>}
                    <td title="Editar" >
                      <ButtonComponent handleClick={() => {update(registro)}} label={'Editar'}/>
                    </td>
                    <td>
                      <ButtonComponent handleClick={() => {delet(registro.id, registro.id)}} label={'Borrar'}/>
                    </td>
                    { Object.keys(data[0]).map((clave, i) => (
                      <td key={i}>{registro[clave]}</td> 
                    ))} 
                    {/* <td>{registro.name}</td>
                    <td>{registro.colonia}</td>
                    <td>{registro.calle}</td>
                    <td>{registro.numExt}</td>
                    <td>{registro.numInte}</td>
                    <td>{registro.ciudad}</td>
                    <td>{registro.estado}</td>
                    <td>{registro.cp}</td>  
                    <td>{registro.fnace}</td>
                    <td>{registro.email}</td>
                    <td>{registro.telefono}</td>
                    <td>{registro.role}</td>
                    <td>{registro.sexo}</td> */}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
    );
};
export default TableComponent;