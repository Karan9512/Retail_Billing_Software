import './CategoryList.css';
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import toast from 'react-hot-toast';
import { deleteCategory } from '../../Service/CategoryService.js';

const CategoryList = () => {
    const { categories, setCategories } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByCategoryId = async (categoryId) => {
        try {
            const reponse = await deleteCategory(categoryId);
            if (reponse.status === 204) {
                const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
                setCategories(updatedCategories);
                //display toaster message
                toast.success('Category deleted successfully');
            } else {
                //display toaster message for error
                toast.error('Failed to delete category');
            }
        } catch (error) {
            console.error(error);
            //display toaster message for error
            toast.error('An error occurred while deleting the category');
        }
    }

    return (
        <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className='row pe-2'>
                <div className="input-group mb-3">
                <input type='text'
                    name='keyword'
                    id="keyword"
                    placeholder='Search by keyword'
                    className='form-control'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <span className='input-group-text bg-warning'>
                    <i className="bi bi-search"></i>
                    </span>
                    </div>
            </div>
            <div className="row g-3 pe-2">
                {filteredCategories.map((category, index ) => (
                    <div key={index} className="col-12">
                        <div className="card p-3" style={{ backgroundColor: category.bgColor }}>
                            <div className='d-flex align-items-center'>
                                <div style={{ marginRight: '15px' }}>
                                    <img src={category.imgUrl} alt={category.name} className='category-image' />
                                </div>
                                <div className='flex-grow-1'>
                                    <h5 className='mb-1 text-white'>{category.name}</h5>
                                    <p className='mb-0 text-white'>5 Items</p>
                                </div>
                                <div>
                                    <button className='btn btn-danger btn-sm'
                                    onClick={() => deleteByCategoryId(category.categoryId)}>
                                    <i className="bi bi-trash"></i>
                            </button>
                                </div>
                            </div>
                        </div>   
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;
