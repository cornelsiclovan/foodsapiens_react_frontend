import React from 'react';
import OrderItem from './OderItem';

const OrderList = (props) => {
   
    console.log(props.items.items);
    
    return (
        <div style={{padding: 15+'px'}}>
            {
                props.items.items && props.items.items.map(item => {
                        return  <OrderItem item={item}/>;
                        }
                    )
            }
        </div>
    );
}


export default OrderList;