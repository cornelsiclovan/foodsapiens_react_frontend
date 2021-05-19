import React, {useEffect, useState} from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../UIElements/LoadingSpinner';
import OrderList from '../components/OrderList';

const Orders = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedOrders, setLoadedOrders] = useState();

    let order;
    let orders = [];

    useEffect(() => {
        const fetchOrders = async () => {
            try {

                const responseData = await sendRequest("https://foodsapiens.ro/wp-json/wc/v3/orders?consumer_key=ck_3adcec890b5e616f0bede6b1b5226d0403eef3e1&consumer_secret=cs_dca5446d5eca811adfadac965943d8c0856f2fb0");

                setLoadedOrders(responseData);
            } catch (err) {

            }
        }

        fetchOrders(); 
    }, [sendRequest]);

    return (
        <React.Fragment>
            {
                isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )
            }

            {
                !isLoading && loadedOrders && <OrderList items={loadedOrders} />
            }
        </React.Fragment>
    );
}

export default Orders;