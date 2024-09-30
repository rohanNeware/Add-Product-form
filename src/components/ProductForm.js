import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addProduct, editProduct } from '../redux/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const categories = ['Food', 'Clothing', 'Electronics', 'Furniture'];
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            category: '',
            description: '',
            expiryDate: '',
            costPrice: '',
            sellPrice: '',
            discount: '',
            discountedSellPrice: '',
            finalPrice: '',
        },
    });

    useEffect(() => {
        if (id) {
            const productToEdit = products.find((prod) => prod.id === parseInt(id));
            if (productToEdit) {
                Object.keys(productToEdit).map((key) => {
                    setValue(key, productToEdit[key]);
                });
            }
        }
    }, [id, products, setValue]);

 
    const calculatePrices = (sellPrice, discount) => {
        const parsedSellPrice = parseFloat(sellPrice) || 0;
        const parsedDiscount = parseFloat(discount) || 0;
        const discountedSellPrice = parsedSellPrice - (parsedSellPrice * parsedDiscount) / 100;
        setValue('discountedSellPrice', discountedSellPrice.toFixed(2));
        setValue('finalPrice', discountedSellPrice.toFixed(2));
    };

    const sellPrice = watch('sellPrice');
    const discount = watch('discount');

    useEffect(() => {
        calculatePrices(sellPrice, discount);
    }, [sellPrice, discount]);

   
    const onSubmit = (data) => {
        if (id) {
            dispatch(editProduct({ ...data, id: parseInt(id) }));
        } else {
            dispatch(addProduct({ ...data, id: Date.now() }));
        }
        navigate('/');
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <form className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    {...register('name', { required: true })}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category <span className="text-red-500">*</span>
                </label>
                <select
                    {...register('category', { required: true })}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">Select category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    {...register('description')}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="costPrice">
                    Cost Price <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    {...register('costPrice', { required: true })}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.costPrice && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sellPrice">
                    Sell Price <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    {...register('sellPrice', { required: true })}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.sellPrice && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
                    Discount (%)
                </label>
                <input
                    type="number"
                    {...register('discount')}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                    Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                    min={today}
                    type="date"
                    {...register('expiryDate', { required: true })}
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.expiryDate && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountedSellPrice">
                    Discounted Sell Price
                </label>
                <input
                    type="text"
                    {...register('discountedSellPrice')}
                    disabled
                    className="w-full px-3 py-2 border rounded shadow-sm bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="finalPrice">
                    Final Price
                </label>
                <input
                    type="text"
                    {...register('finalPrice')}
                    disabled
                    className="w-full px-3 py-2 border rounded shadow-sm bg-gray-100"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
};

export default ProductForm;
