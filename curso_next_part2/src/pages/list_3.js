// https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Fragment, useEffect, useState } from 'react';

export default function List({datosUsuarios}) {

  const [numUsuario, setNumero] = useState(0)
  const [nombreUsuario, setNombre] = useState('')
  const [listaUsuarios,setListaUsuarios] = useState(datosUsuarios)

  const crearLista = (lista) => {
    const lista_formato = lista.map((element, index) => 
        <div key={index}>
            <a href='' onClick={seleccionUsuario(element.id)}>
              Ver la ficha de {element.id} - {element.name}
            </a>
        </div>
    )
    return lista_formato
  }

  // currying : ver ejercicio 5_1. 5_2 , 5_3   https://github.com/matias-ibserveis/curso_react
  
  const seleccionUsuario = id_buscado => evento => {
    setNumero(id_buscado)
    console.log("numUsuario en seleccion",numUsuario)
    const nueva_lista = listaUsuarios.filter(element => element.id === numUsuario)
    console.log(nueva_lista)
    setListaUsuarios(nueva_lista)  
  }

  const cambioNombre = event => {
    const valor = event.target.value
    console.log("valor",valor)
    setNombre(valor)
  }

  const buscaUsuario = event => {
    console.log(nombreUsuario)
    const nueva_lista = listaUsuarios.filter(element => element.name.includes(nombreUsuario))  //tolowercase
    // https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value
    console.log(nueva_lista)
    setListaUsuarios(nueva_lista)
  }
    
  const Ver = () => {
    // falta mapear toda la lista para ver TODOS los que coinciden
    const resultado = listaUsuarios ? 
            <div>
              <h3>Nombre: {listaUsuarios[numUsuario].name}</h3>
              <p>email: {listaUsuarios[numUsuario].email}</p>
            </div>   
    : <div><p>error</p></div>      

    return resultado 
  }

  
return (
  <div>
    { crearLista(listaUsuarios) }
    { listaUsuarios ? Ver() : false}
    <input
                type='text'
                id='nombre'
                name='campo_nombre'
                value= {nombreUsuario}
                onChange={cambioNombre}
                onDoubleClick={buscaUsuario}
              />
  <p>Escribe nombre y doble click para seleccionar</p> 
  </div>
)
}

List.getInitialProps = async () => {
  //const response = await fetch
  ('https://jsonplaceholder.typicode.com/users');
  const response = await fetch('http://localhost:4001/usuarios')
  const listadoDatos = await response.json();
  return {datosUsuarios: listadoDatos}
}