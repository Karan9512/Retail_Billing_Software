import axios from "axios";

export const fetchDashboardData = async () => {
    return await axios.get(" http://localhost:8080/api/v1.0/dashboard", {headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}});
}

export const fetchMonthlySalesData = async(year)=>{
    return await axios.get(`http://localhost:8080/api/v1.0/dashboard/monthly-sales?year=${year}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});

}
export const fetchWeeklySalesData = async (year) => {
    return await axios.get(`http://localhost:8080/api/v1.0/dashboard/weekly-sales?year=${year}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

