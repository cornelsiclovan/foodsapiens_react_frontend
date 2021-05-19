import React from 'react';

const OrderList = (props) => {
    

    
    let orders = [];

    props.items.map(item => {

        let order = {
            id: "",
            items: [],
            name: "",
            address1: "",
            address2: "",
            city: ""
        };

        order.id = item.id;
        
        

        let items = [];

        item.line_items.map(l_i => {
            let line_item = {
                name: "",
                startDate : "",
                endDate: "",
                occurence: ""
            }
            line_item.name = l_i.name;
            
            let dt = new Date(l_i.meta_data[2].value);

            

            line_item.startDate = dt;

            let occurence = 1;

            if(l_i.name.split(' ')[0] === 'Abonament')
                occurence = l_i.name.split(' ')[1];
            
            line_item.occurence = occurence;

            let weekends = Math.ceil(occurence/5)
            console.log("weekends"+ weekends);

            if(dt.getDay()%1 > 0) {
                weekends ++;
            }


            occurence = parseInt(occurence) + parseInt((weekends-1)*2);

            console.log(occurence);
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
        
        orders.push(order);


       
        return orders;
    });

    console.log(orders);

  


    return (
        <React.Fragment>
            <div>Order list</div>
        </React.Fragment>
    );
}

export default OrderList;