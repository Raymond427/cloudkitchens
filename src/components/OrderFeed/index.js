import React, { useState } from 'react'
import { useOrderState } from '../OrderProvider'
import Order from './Order'
import './OrderFeed.css'
import OrderFilter from './OrderFilter'

const OrderFeed = () => {
    const { orders, loading, error } = useOrderState()
    const defaultFilter = () => true
    const [ filter, setFilter ] = useState({
        type: 'none',
        function: defaultFilter
    })

    if (loading) {
        return (<div>loading...</div>)
    } else if (error) {
        return (<div>Oops</div>)
    } else {
        return (
            <div className="OrderFeed">
                <OrderFilter filter={filter} setFilter={setFilter} />
                <div>
                    {Object.values(orders).filter(filter.function).map(order => <Order key={order.id} {...order} />)}
                </div>
            </div>
        )
    }
}

export default OrderFeed