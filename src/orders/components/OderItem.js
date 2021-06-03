import React, {useEffect, useState} from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import Button from '../../UIElements/Button';

const OrderItem = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [product, setProduct] = useState();

    //console.log(new Date());
    //console.log(props.item.occurrenceArray);
    //console.log(props.item.startDate);
    //console.log(props.item.endDate);
    //console.log(props.item.wp_id);


    let diff =  Math.floor(( Date.parse(props.item.endDate) - Date.parse(props.item.startDate) ) / 86400000); 
    //console.log(diff + 1);

    let dateInOccurenceArray = new Date(1 * 86400000 + +new Date());
    
    //console.log(props.item.product_id);

    diff =  Math.floor(( Date.parse(dateInOccurenceArray) - Date.parse(props.item.startDate) ) / 86400000); 
    
    
    //console.log(diff + 1);

   let singleItem = false;
   let singleItemName = '';

   let singleDayMenu = false;

    //console.log(props.item);

   if(props.item.product_id === undefined) {
      singleItem = true;
      singleItemName = props.item.name;
   }

    useEffect(() => {
       
        const fetchProducts = async () => {
            try{
                const response = sendRequest("https://foodsapiens.ro/wp-json/wc/v3/products?include=" + props.item.product_id + "&consumer_key=ck_3adcec890b5e616f0bede6b1b5226d0403eef3e1&consumer_secret=cs_dca5446d5eca811adfadac965943d8c0856f2fb0");
            
                //console.log(response);
                response.then(result => setProduct(result));


                
            } catch(err) {}
        }

        fetchProducts();
    }, [sendRequest])

    let a = [];

    //console.log(singleItem);

    if(product && !singleItem) {
        a = product[0].short_description.split("</p>\n<p>");
        if(a.length === 4) {
            singleDayMenu = true;
        }
    } 

    //console.log(singleDayMenu);

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


    //console.log("day of year", dOfYear);
    
    // To verify if weekOfyear is correct ??????????
 
    // After finding the week of the year we identify if menu
    // is Saptamana 1 or Saptamana 2.
    // Now we need to find out wich day of week we need the menu for

    let weekOfYear = Math.floor(parseInt(dOfYear)/7);
   
    let currentMenu = 1;

    //console.log(a.length);
    if(a.length < 12) {
        if(weekOfYear%2 === 0){
            currentMenu = 2;
        }
    }

    let menuDay = new Date(skipDays * 86400000 + +new Date());
    //console.log(menuDay.getDay());




    if(a.length >= 12 ){
        currentMenu  = weekOfYear % 4;
    }

    //console.log(currentMenu);

    let menuItemPosition = menuDay.getDay();

    if (currentMenu === 2) {
        menuItemPosition += 6
    }

    // sanitize string 
    let indexDelete = 0;
    let micDejun = "";
    let pranz = "";
    let cina = "";

    if(singleDayMenu && currentMenu === 1) {
        menuItemPosition = 1;
    }

    if(singleDayMenu && currentMenu === 2) {
        menuItemPosition = 3;
    }

    if( !singleDayMenu && !singleItem && a !== undefined && a.length > 0 && menuItemPosition !== undefined && a[menuItemPosition] !== undefined) {
        indexDelete = a[menuItemPosition].split('</strong>')[2].indexOf('<');
        micDejun =  a[menuItemPosition].split('</strong>')[2].slice(0, indexDelete);
       
        indexDelete = a[menuItemPosition].split('</strong>')[3].indexOf('<');
        pranz =  a[menuItemPosition].split('</strong>')[3].slice(0, indexDelete);

        indexDelete = a[menuItemPosition].split('</strong>')[4].indexOf('<');
        cina = a[menuItemPosition].split('</strong>')[4].slice(0, indexDelete);
    }

    if(singleDayMenu) {
        indexDelete = a[menuItemPosition].split('</strong>')[1].indexOf('<');
        micDejun =  a[menuItemPosition].split('</strong>')[1].slice(0, indexDelete);
        
        indexDelete = a[menuItemPosition].split('</strong>')[2].indexOf('<');
        pranz =  a[menuItemPosition].split('</strong>')[2].slice(0, indexDelete);

        indexDelete = a[menuItemPosition].split('</strong>')[3].indexOf('<');
        cina = a[menuItemPosition].split('</strong>')[3].slice(0, indexDelete);
    }

    //console.log("diff", diff);
    //console.log("occurrenceArray", props.item.occurrenceArray);

    const onClickHandler = (event) => {
       event.preventDefault();

        console.log(event.target.dataset.item_id);
    }

    console.log(props.item._id);
    console.log(props.item._id);

    return (
        <React.Fragment>
            <br />
           {!singleItem && a && menuItemPosition && <div style={{color: 'white'}}><b>Mic dejun: </b> {micDejun}</div>}
           {!singleItem && a && menuItemPosition && <div style={{color: 'white'}}><b>Pranz: </b> { pranz}</div>}
           {!singleItem && a && menuItemPosition && <div style={{color: 'white'}}><b>Cina: </b> { cina}</div>}
           {singleItem && <div style={{color: 'white'}}><b>Meniu singular: </b> {singleItemName}</div>}
           {!singleItem &&<div style={{color: 'white'}}>Numar calorii: <b> {props.item.calorii}</b></div>}
            { props.item.occurrenceArray[diff] === 0 && <div style={{color: 'white'}}>Status: {<span style={{color:'red'}}><b>Negatit</b></span>}</div>}
            { props.item.occurrenceArray[diff] === 1 &&<div style={{color: 'white'}}>Status: {<span style={{color:'green'}}><b>Gatit</b></span>}</div>}
           
           <br />
           <a style={{
                    backgroundColor: 'yellowgreen', 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: 10+'px',
                    borderRadius: 5 + 'px' 
                    }} href="#" data-item_id={props.item._id} onClick={onClickHandler}>GATA &#10004;</a>
           <br />
           <br />
           <hr style={{color:'white'}}/>
        </React.Fragment>
    )
}



export default OrderItem;