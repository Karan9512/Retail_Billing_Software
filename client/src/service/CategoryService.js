import axios from "axios";

export const addCategory = async (category) => {
    return await axios.post('http://localhost:8080/api/v1.0/categories', category);
}


export const deleteCategory = async (categoryId) => {
    return await axios.post(`http://localhost:8080/api/v1.0/categories/${categoryId}`);
}


export const fetchCategory = async () => {
    return await axios.post(`http://localhost:8080/api/v1.0/categories/`);
}