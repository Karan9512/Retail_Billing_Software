import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1.0";

export const fetchDashboardData = async () => {
    return await axios.get(`${BASE_URL}/dashboard`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
}
export const fetchMonthlySalesData = async(year)=>{
    return await axios.get(`${BASE_URL}/dashboard/monthly-sales?year=${year}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});

}
export const fetchWeeklySalesData = async (year) => {
    return await axios.get(`${BASE_URL}/dashboard/weekly-sales?year=${year}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }


