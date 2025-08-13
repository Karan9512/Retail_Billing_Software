import axios from "axios";

export const latestOrders = async () => {
    return await axios.get("http://localhost:8080/api/v1.0/orders/latest", {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const createOrder = async (order) => {
    return await axios.post("http://localhost:8080/api/v1.0/orders", order, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const deleteOrder = async (id) => {
    return await axios.delete(`http://localhost:8080/api/v1.0/orders/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const getPaginatedOrders = async (page, size = 10, startDate = null, endDate = null) => {
    let url = `http://localhost:8080/api/v1.0/orders/paginated?page=${page}&size=${size}`;
    
    if (startDate && endDate) {
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    
    return await axios.get(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};

export const downloadOrders = async (startDate = null, endDate = null) => {
    let url = `http://localhost:8080/api/v1.0/orders/export`;
    
    if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    
    return await axios.get(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob'
    });
};
