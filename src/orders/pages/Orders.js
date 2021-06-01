import React, {useState, useEffect} from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../UIElements/LoadingSpinner';
import OrderList from '../components/OrderList';

const Orders = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedOrders, setLoadedOrders] = useState();

    useEffect(() => {
          
        const fetchItems = async () => {
            console.log('fetching items')
            try {  
                // Preiau astazi meniul pentru maine. 
                // Cazul in care astazi e sambata preiau meniul pentru
                // poimaine. Data se preia in variabila today
                
                let skipDays = new Date().getDay() === 6 ? 2 : 1;

                let today = new Date(skipDays * 86400000 + +new Date()).toISOString().slice(0, 10);
                
                //console.log(skipDays);
                today = today + "T00:00:000Z";

                // console.log(today);

                const response = await sendRequest('http://localhost:5000/api/items?today='+today);
               setLoadedOrders(response);
        
            
            } catch(err) {}
        }

        fetchItems();
    }, [sendRequest])

    return (
        <React.Fragment>
             {
                !isLoading && loadedOrders && <OrderList items={loadedOrders} />
            }
        </React.Fragment>
    );
}



export default Orders;