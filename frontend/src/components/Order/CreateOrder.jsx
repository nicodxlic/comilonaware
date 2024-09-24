import React, {useState} from 'react'
import {axios} from '../../axiosConfig.js'
import { useNavigate } from 'react-router-dom'
import ListProducts from '../Product/ListProducts.jsx'
const endpoint = 'http://localhost:8000/api/order'


const CreateProduct = () => {
    const [table, setTable] = useState(0)
    const [price, setPrice] = useState(0)
    const [status, setStatus] = useState('Pendiente')
    const [selectedProducts, setSelectedProducts] = useState([])
    const navigate = useNavigate()

const addProductToOrder = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    setPrice(price + product.price);
    };

    const store = async (e) => {
        e.preventDefault()
        await axios.get('/sanctum/csrf-cookie');
        await axios.post(endpoint, {table: table, price: price, status: status, products: selectedProducts})
        alert('Pedido creado correctamente')
        navigate('/')
    }
    return (
    <div>
        <h3>Agregar nuevo pedido</h3>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Número de mesa</label>
                <input
                    value={table}
                    onChange={ (e)=> setTable(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>
            <br/>
            <div className='mb-3'>
                <label className='form-label'>Productos</label>
                <ListProducts addProductToOrder = {addProductToOrder} />
            </div>
            <br/>
            <div className='mb-3'>
                <label className='form-label'>Total: ${price}</label>
            </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
    </div>
    )
}

export default CreateProduct
