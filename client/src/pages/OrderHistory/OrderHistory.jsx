import React, { useEffect, useState } from "react";
import './OrderHistory.css';
import { downloadOrders, getPaginatedOrders } from "../../Service/OrderService.js";
import { saveAs } from 'file-saver';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateFilterApplied, setDateFilterApplied] = useState(false);

    useEffect(() => {
        fetchOrders(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, dateFilterApplied]);

    const fetchOrders = async (page) => {
        try {
            setLoading(true);
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
            const response = await getPaginatedOrders(page, 10, formattedStartDate, formattedEndDate);
            setOrders(response.data?.content || []);
            setTotalPages(response.data?.totalPages || 1);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
            const response = await downloadOrders(formattedStartDate, formattedEndDate);
            const blob = new Blob([response.data], { type: 'text/csv' });
            saveAs(blob, `orders_${new Date().toISOString().slice(0, 10)}.csv`);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const formatItems = (items) => {
        return items?.map((item) => `${item.name} x ${item.quantity}`).join(', ') || '';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const applyDateFilter = () => {
        setCurrentPage(0);
        setDateFilterApplied(prev => !prev);
    };

    const clearDateFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setCurrentPage(0);
        setDateFilterApplied(prev => !prev);
    };

    if (loading) {
        return <div className="text-center py-4">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return <div className="text-center py-4">No orders found</div>;
    }

    return (
        <div className="orders-history-container">

            {/* Date Filter Controls */}
            <div className="row mb-3">
                <div className="col-md-3">
                    <label className="text-light">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="form-control"
                        placeholderText="Select start date"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="col-md-3">
                    <label className="text-light">End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="form-control"
                        placeholderText="Select end date"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="col-md-6 d-flex align-items-end filter-buttons">
                    <button
                        className="btn btn-primary me-2"
                        onClick={applyDateFilter}
                        disabled={!startDate || !endDate}>
                        Apply Filter
                    </button>
                    <button
                        className="btn btn-secondary me-2"
                        onClick={clearDateFilter}
                        disabled={!startDate && !endDate}>
                        Clear Filter
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={handleDownload}>
                        Download CSV
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <div className="scrollable-table">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>Order Id</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>
                                    {order.customerName} <br />
                                    <small className="text-muted">{order.phoneNumber}</small>
                                </td>
                                <td>{formatItems(order.items)}</td>
                                <td>₹{order.grandTotal}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                        <span className={`badge ${order.paymentDetails?.status === "COMPLETED" ? "bg-success" : "bg-warning text-dark"}`}>
                                            {order.paymentDetails?.status || "PENDING"}
                                        </span>
                                </td>
                                <td>{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <nav className="pagination mt-3 d-flex justify-content-center" role="navigation" aria-label="Pagination">
                <button
                    className="btn btn-nav me-2"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`btn me-1 ${index === currentPage ? "btn-active" : "btn-inactive"}`}
                        aria-current={index === currentPage ? "page" : undefined}
                        onClick={() => setCurrentPage(index)}>
                        {index + 1}
                    </button>
                ))}

                <button
                    className="btn btn-nav ms-2"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}>
                    Next
                </button>
            </nav>
        </div>
    );
};

export default OrderHistory;
