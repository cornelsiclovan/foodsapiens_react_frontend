import React from 'react';
import OrderItem from './OderItem';

const OrderList = (props) => {
   
    console.log(props.items.items);
    
    return (
        
        <div style={{padding: 15+'px'}}>
             <br />
             <br />
             <a href="/" className="center"
                style={{
                    backgroundColor: 'orangered',
                    marginTop: 20+'px',
                    color: 'white',
                    padding: '10px',
                    textDecoration: 'none'
            }}> &larr; Adu toate ordinele pentru astazi ({props.items.items.length})</a>
        
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