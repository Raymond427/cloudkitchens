import React, { useState, createContext } from 'react'

const ORDER_EVENTS = {
    CREATED: 'CREATED',
    COOKED: 'COOKED',
    DRIVER_RECEIVED: 'DRIVER_RECEIVED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
}

export const OrderAdapterContext = createContext()

const OrderAdapter = ({ children }) => {
    const initialState = {
        error: null,
        loading: true,
        data: [],
        orders: {}
    }

    const [ state, setState ] = useState(initialState)

    let updatedOrders = {}
    const updateState = newState => {
        if (newState.data) {
            newState.data.forEach(orderEvent => {
                const orderId = orderEvent.id
                const order = orders[orderId]

                if (order) {
                    let cookedAt = {}
                    if (orderEvent.event_name === ORDER_EVENTS.COOKED) {
                        const secondCooked = orderEvent.sent_at_second
                        cookedAt = { cooked_at: secondCooked }
                    }

                    updatedOrders = {
                        ...updatedOrders,
                        [orderId]: {
                            ...order,
                            ...cookedAt
                        }
                    }
                } else {
                    updatedOrders = {
                        ...updatedOrders,
                        [orderId]: orderEvent
                    }
                }
            })
        }

        setState(prevState => ({
            ...prevState,
            ...newState,
            orders: {
                ...prevState.orders,
                ...updatedOrders
            }
        }))
    }

    const { loading, error, orders } = state

    if (loading) {
        return <div>loading...</div>
    } else if (error) {
        return <div>{error}</div>
    }
    return (
        <OrderAdapterContext.Provider value={{
            updateOrderState: updateState,
            orderState: { loading, error, orders }
        }}>
            {children}
        </OrderAdapterContext.Provider>
    )
}

export default OrderAdapter