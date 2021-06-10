import React, {useEffect, useState, useRef} from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../UIElements/LoadingSpinner';
import OrderList from '../components/OrderList';


const PopulateDatabase = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedOrders, setLoadedOrders] = useState();
    let isLoaded = useRef(false);
    
    useEffect(() => {

        let orders = [];
        const fetchOrders = async () => {
            try {

                const responseData = await sendRequest("https://foodsapiens.ro/wp-json/wc/v3/orders?consumer_key=ck_3adcec890b5e616f0bede6b1b5226d0403eef3e1&consumer_secret=cs_dca5446d5eca811adfadac965943d8c0856f2fb0");

                
                if(isLoaded.current === false) {
                    setLoadedOrders(responseData);
                    isLoaded.current = true;
                }
                // console.log("orders fetched");
                // console.log("orders array length:", loadedOrders.length);
            } catch (err) {

            }
        }
 
        fetchOrders(); 

        const postOrders = async () => {
            try {

                console.log("post oders");
                loadedOrders.map(item => {

                    let order = {
                        id: "",
                        items: [],
                        name: "",
                        address1: "",
                        address2: "",
                        city: "",
                        date_created: "",
                        date_modified: ""
                    };
            
                    order.id = item.id;
                    


                    order.date_created = new Date(item.date_created);
                    order.date_modified = new Date(item.date_modified);
            
                    let items = [];
            
                    item.line_items.map(l_i => {
                        let line_item = {
                            name: "",
                            startDate : "",
                            endDate: "",
                            occurence: "",
                            product_id: "",
                            calorii: ""
                        }
                        line_item.name = l_i.name;
                        
                        line_item.product_id = l_i.meta_data[1].value.product_id;

                        if(typeof l_i.meta_data[0].value === "string")  {
                            line_item.calorii = l_i.meta_data[0].value.split(" ")[0];
                        }
                      

                        //line_item.calorii = l_i.meta_data[0].display_value.split(' ')[0];


                        let dt = new Date(l_i.meta_data[2].value);
            
                        
            
                        line_item.startDate = dt;
            
                        let occurence = 1;
            
                        if(l_i.name.split(' ')[0] === 'Abonament')
                            occurence = l_i.name.split(' ')[1];
                        
                        line_item.occurence = occurence;
            
                        

                        let weekends = Math.ceil(occurence/5)
                        //console.log("weekends"+ weekends);
            
                        //console.log("modulo 1",dt.getDay()%1);

                        if(dt.getDay()  > 1 && l_i.name.split(' ')[0] === 'Abonament') {
                            weekends = weekends + 1;
                        }
            
                        //console.log("weekends" + weekends);
            
                        occurence = parseInt(occurence) + parseInt((weekends-1)*2);
            
                        //console.log(occurence);
                        line_item.endDate = new Date((occurence - 1)*86400000 + +dt)
            
                        
            
                        items.push(line_item);      
                        return 1;
                    });
            
                    
                    order.items = items;
                    
                    order.name = item.billing.first_name + " " + item.billing.last_name;
                    order.address1 = item.shipping.address_1;
                    order.address2 = item.shipping.address_2;
                    order.city = item.shipping.city;
                    
                    
                    // console.log(order.startDate + " -- " + endDate);
                    
                    if(item.status !== 'po-eroare' && item.status !== 'po-refuzata' )
                        orders.push(order);
            
                    console.log(order)
            
                   
                    return orders;
                });
                
                console.log(orders.length);

                orders.forEach(async order => {
                    //console.log(order);
                    await sendRequest(
                        'http://localhost:5000/api/orders',
                        'POST',
                        JSON.stringify({
                            "wp_id": order.id,
                            "address1": order.address1,
                            "address2": order.address2,
                            "city": order.city,
                            "items": order.items,
                            "name": order.name,
                            "date_created": order.date_created,
                            "date_modified": order.date_modified
                        }),
                        {
                            'Content-Type': 'application/json'
                        }
                    );
                });
   
            } catch (err) {

            }
        }  
  
        postOrders(); 
    }, [sendRequest, loadedOrders]);  

    return (
        <React.Fragment>
             <br/>
                
                <br/>
            {
                isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )
            }
               
            {
                !isLoading && (
                    <div>
                    <h1 className="center">Meniurile pentru azi au fost aduse cu suces!</h1>
                    <a href="/orders" className="center"
                        style={{
                            backgroundColor: 'orangered',
                            marginTop: 20+'px',
                            color: 'white',
                            padding: '10px',
                            textDecoration: 'none'
                    }}> Meniurile pentru astazi &rarr; </a>
                    </div>
                )
            }
			
			
        </React.Fragment>
    );
}

export default PopulateDatabase;