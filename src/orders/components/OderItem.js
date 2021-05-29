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

    let a = [];
    
    if(product) {
        a = product[0].short_description.split("</p>\n<p>");
        console.log(a);
    }


    const dayOfYear = date =>
        Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    // find out if the day after tomorrow is weekend
    // 0 - SUNDAY //// WEEKEND
    // 1 - MONDAY
    // 2 - TUESDAY
    // 3 - WENESDAY
    // 4 - THURSDAY
    // 5 - FRIDAY
    // 6 - SATURDAY /// WEEKEND

    // The menu for monday is prepared on Saturday

    // (new Date()).getDay() returns the above result


    let skipDays = new Date().getDay() === 6 ? 2 : 1;

    let dOfYear = dayOfYear(new Date());

    dOfYear += skipDays;


    console.log("day of year", dOfYear);
    
    // To verify if weekOfyear is correct ??????????
 
    // After finding the week of the year we identify if menu
    // is Saptamana 1 or Saptamana 2.
    // Now we need to find out wich day of week we need the menu for

    let weekOfYear = Math.floor(parseInt(dOfYear)/7);
   
    let currentMenu = 1;

    console.log(a.length);
    if(a.length < 12) {
        if(weekOfYear%2 === 0){
            currentMenu = 2;
        }
    }

    let menuDay = new Date(skipDays * 86400000 + +new Date());
    console.log(menuDay.getDay());




    if(a.length >= 12 ){
        currentMenu  = weekOfYear % 4;
    }

    console.log(currentMenu);

    let menuItemPosition = menuDay.getDay();

    if (currentMenu === 2) {
        menuItemPosition += 6
    }

    // sanitize string 
    let indexDelete = 0;
    let micDejun = "";
    let pranz = "";
    let cina = "";

    console.log(a !== undefined);
    console.log(menuItemPosition !== undefined);
    console.log(a);
    console.log(menuItemPosition);

    if( a !== undefined && a.length > 0 && menuItemPosition !== undefined) {
        indexDelete = a[menuItemPosition].split('</strong>')[2].indexOf('<');
        micDejun =  a[menuItemPosition].split('</strong>')[2].slice(0, indexDelete);
        //micDejun = micDejun.slice(indexDelete, -1);
        indexDelete = a[menuItemPosition].split('</strong>')[3].indexOf('<');
        pranz =  a[menuItemPosition].split('</strong>')[3].slice(0, indexDelete);

        indexDelete = a[menuItemPosition].split('</strong>')[4].indexOf('<');
        cina = a[menuItemPosition].split('</strong>')[4].slice(0, indexDelete);
    }




    return (
        <React.Fragment>
            {/* {product && product[0].short_description} */}
            <div style={{color: 'white'}}>Mic dejun: {a && menuItemPosition && micDejun}</div>
            <div style={{color: 'white'}}>Pranz: {a && menuItemPosition && pranz}</div>
            <div style={{color: 'white'}}>Cina: {a && menuItemPosition && cina}</div>
           <br />
           <br />
        </React.Fragment>
    )
}



export default OrderItem;