import React, { useEffect, useState } from 'react';
import { axios } from '../../axiosConfig.js';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:8000/api';

const ListOrders = ({ role }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async () => {
        const response = await axios.get(`${endpoint}/orders`);
        setOrders(response.data.reverse()); // Últimos pedidos primero
        const productsResponse = await axios.get(`${endpoint}/products`);
        setProducts(productsResponse.data);
    };

    const handleStatusChange = async (e, id) => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });
        const status = e.target.value;
        await axios.get('/sanctum/csrf-cookie');
        await axios.put(`${endpoint}/order/status/` + id, { status });
        Swal.close();
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Estado actualizado correctamente',
        });
        getAllOrders();
    };

    const deleteOrder = async (orderId) => {
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });
        await axios.get('/sanctum/csrf-cookie');
        await axios.put(`${endpoint}/order/status/` + orderId, { status: 'deleted' });
        Swal.close();
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Pedido eliminado correctamente',
        });
        getAllOrders();
    };

    const getOrderProducts = async (id) => {
        if (products.length === 0) {
            // Esperar a que los productos se carguen
            await getAllOrders();
        }

        const response = await axios.get(`${endpoint}/orders_products/` + id);
    
        const productosHTML = response.data
            .map(orderProduct => {
                const product = products.find(p => p.id === orderProduct.product_id);
                if (product) {
                    return `${product.name} ${orderProduct.quantity === 1? '' : (`x${orderProduct.quantity}`)} `;
                }
                return null;
            })
            .filter(Boolean) // Elimina valores nulos
            .join('<br/>');
    
        Swal.fire({
            title: 'Productos en el pedido',
            html: productosHTML,
            icon: 'info',
            confirmButtonText: 'Cerrar',
        });
    };
    
    

    const filteredOrders = orders.filter(order =>
      filterStatus === 'all' || order.status === filterStatus
  );
  
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage)); // Al menos 1 página
  const paginatedOrders = filteredOrders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );
  
  // Ajustar la página actual si excede el total de páginas
  useEffect(() => {
      if (currentPage > totalPages) {
          setCurrentPage(1);
      }
  }, [totalPages, currentPage]);
  

    return (
        <div>
            
            <table className="table table-striped w-full">
                <thead className="bg-primary text-white text-center">
                    <tr>
                        <th className="text-center">N° de pedido</th>
                        <th className="text-center">Número de mesa</th>
                        <th className="text-center">Total</th>
                        <th className="text-center">Estado</th>
                        <th className="text-center">Productos</th>
                        {role.role.role === 'admin' && <th className="text-center">Acciones</th>}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {paginatedOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.table}</td>
                            <td>{'$' + order.price}</td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(e, order.id)}
                                    className="text-center"
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="in process">En proceso</option>
                                    <option value="ready">Listo para entregar</option>
                                    <option value="delivered">Entregado</option>
                                    <option value="canceled">Cancelado</option>
                                    {role.role.role === 'admin' && (
                                        <option value="deleted">Eliminado</option>
                                    )}
                                </select>
                            </td>
                            <td>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={() => getOrderProducts(order.id)}
                                >
                                    Ver productos
                                </button>
                            </td>
                            {role.role.role === 'admin' && (
                                <td>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Eliminar pedido
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 ml-24">
                {/* Paginado */}
                <div className="text-gray-700">
                    Página {currentPage} de {totalPages}
                    <button
                        className="ml-4 px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <button
                        className="ml-2 px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>

                {/* Select para filtrar */}
                <div className="flex items-center mr-24">
                    <label htmlFor="statusFilter" className="mr-2 font-semibold">Filtrar por estado:</label>
                    <select
                        id="statusFilter"
                        className="p-2 border rounded"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Todos</option>
                        <option value="pending">Pendiente</option>
                        <option value="in process">En proceso</option>
                        <option value="ready">Listo</option>
                        <option value="delivered">Entregado</option>
                        <option value="canceled">Cancelado</option>
                        <option value="deleted">Eliminado</option>
                    </select>
                </div>
            </div>

            <Link to="/create-order" className="btn btn-success mt-4 text-white">
                Agregar nuevo pedido
            </Link>
        </div>
    );
};

export default ListOrders;
