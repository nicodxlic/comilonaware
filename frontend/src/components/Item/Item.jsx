import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

/**Hice una prueba para ver si traia los items de la BD
 * Posiblemente la funcionalidad de este componente cambie
 */
const endpoint = 'http://localhost:8000'
const Item = () => {

    const [items, setItems] = useState([])
    useEffect ( () => {
        getAllItems()
    }, [])

    const getAllItems = async () => {
       const response = await axios.get('${endpoint}/items')
       setItems(response)
    }
  return (
    <div>
    <table>
      <tbody>
        { items.map ((item) => (
          <tr key={item.id}>
            <td> {item.name} </td>
            <td> {item.price} </td>
            <td> {item.image} </td>
            <td> {item.stock} </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Item