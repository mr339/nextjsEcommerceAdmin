import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <>
      <Layout>
        <h1>Orders</h1>
        <table className="basic">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Recipient</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order: any) => (
                <tr>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td
                    className={order.paid ? "text-green-600" : "text-red-600"}
                  >
                    {order.paid ? "YES" : "NO"}
                  </td>
                  <td>
                    {order.name} {order.email} <br />
                    {order.city} {order.country}
                  </td>
                  <td>
                    {order.line_items.map((l: any) => (
                      <>
                        {l.price_data?.product_data.name} * {l.quantity}
                        <br />
                      </>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Orders;
