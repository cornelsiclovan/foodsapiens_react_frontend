import React from 'react';
import OrderItem from './OderItem';

const OrderList = (props) => {
   
    //console.log(props.items.items);
    
    return (
        <div>
            {
                props.items.items.map(item => {
                        return  <OrderItem item={item}/>;
                        }
                    )
            }
        </div>
    );
}


export default OrderList;