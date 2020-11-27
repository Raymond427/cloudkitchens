import React from 'react'
import OrderBadge from './OrderBadge'
import './Order.css'

const Order = ({
    customer,
    destination,
    id,
    item,
    price,
    cooked_at,
    event_name,
    send_at_second
}) => (
    <div className="Order" /*onClick={() => setSelectedOrder(id)}*/>
        <div className="Order-header-wrapper">
            <h4 className="Order-header">{`${customer}'s ${item}`}</h4>
            <OrderBadge eventName={event_name} />
        </div>
        <p className="Order-destination">{destination}</p>
    </div>
)

export default Order