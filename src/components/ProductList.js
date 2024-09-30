import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const products = useSelector((state) => state.products.products);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const headers = [
        { title: 'Select', className: 'px-4 py-2 border' },
        { title: 'Name', className: 'px-4 py-2 border' },
        { title: 'Category', className: 'px-4 py-2 border' },
        { title: 'Sell Price', className: 'px-4 py-2 border' },
        { title: 'Final Price', className: 'px-4 py-2 border' },
        { title: 'Actions', className: 'px-4 py-2 border' },
    ];

 
    const actions = [
        {
            label: 'Edit',
            className: 'bg-yellow-500 text-white py-1 px-2 rounded mr-2',
            onClick: (id) => navigate(`/edit-product/${id}`),
        },
        {
            label: 'Delete',
            className: 'bg-red-500 text-white py-1 px-2 rounded',
            onClick: (id) => dispatch(deleteProduct([id])),
        },
    ];

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete the selected products?')) {
            dispatch(deleteProduct(selectedProducts));
            setSelectedProducts([]); 
        }
    };

    const handleSelectProduct = (id) => {
        setSelectedProducts((prev) => 
            prev.includes(id) ? prev.filter((prodId) => prodId !== id) : [...prev, id]
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between mb-4">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    onClick={() => navigate('/add-product')}
                >
                    Add Product
                </button>
                <button
                    className={`${selectedProducts.length === 0 ? 'bg-gray-400' : 'bg-red-500'}
                        text-white py-2 px-4 rounded transition duration-200`}
                    onClick={handleDelete}
                    disabled={selectedProducts.length === 0}
                >
                    Delete Selected
                </button>
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className='text-center'>
                        {headers.map((header, index) => (
                            <th key={index} className={header.className}>
                                {header.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className='text-center'>
                            <td className="px-4 py-2 border text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                />
                            </td>
                            <td className="px-4 py-2 border">{product.name}</td>
                            <td className="px-4 py-2 border">{product.category}</td>
                            <td className="px-4 py-2 border">{product.sellPrice}</td>
                            <td className="px-4 py-2 border">{product.finalPrice}</td>
                            <td className="px-4 py-2 border text-center">
                                {actions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        className={action.className}
                                        onClick={() => action.onClick(product.id)}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
