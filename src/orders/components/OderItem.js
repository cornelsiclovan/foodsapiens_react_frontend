import React, {useEffect, useState} from 'react';
import { useHttpClient } from '../../hooks/http-hook';

const OrderItem = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [product, setProduct] = useState();



    useEffect(() => {
        console.log("test");
        const fetchProducts = async () => {
            try{
                const response = sendRequest("https://foodsapiens.ro/wp-json/wc/v3/products?include=" + props.item.product_id + "&consumer_key=ck_3adcec890b5e616f0bede6b1b5226d0403eef3e1&consumer_secret=cs_dca5446d5eca811adfadac965943d8c0856f2fb0");
            
                console.log(response);
                response.then(result => setProduct(result));


                
            } catch(err) {}
        }

        fetchProducts();
    }, [sendRequest])

    let a;
    if(product) {
        a = product[0].short_description.split("</p>\n<p>");
        console.log(a)
    }


    const dayOfYear = date =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    let dOfYear = dayOfYear(new Date());
    console.log("day of year", dOfYear);
    let weekOfYear = parseInt(dOfYear)/7 +1;
    console.log("week of year", weekOfYear);

    weekOfYear = 3;

    let currentMenu = 1;

    console.log(a.length);
    if(a.length < 12) {
        if(weekOfYear%2 === 0){
            currentMenu = 2;
        }
    }


    if(a.length === 12 ){
        currentMenu  = weekOfYear % 4;
    }

    console.log(currentMenu);

    return (
        <React.Fragment>
            {product && product[0].short_description}
           <br />
           <br />
        </React.Fragment>
    )
}



export default OrderItem;