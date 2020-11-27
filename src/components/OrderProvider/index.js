import React, { useContext, createContext, useState, useCallback } from 'react'
import { ORDER_EVENTS } from './constants'

const OrderStateContext = createContext()
const OrderUpdaterContext = createContext()

const OrderProvider = ({ children }) => {
    const initialState = {
        error: null,
        loading: true,
        data: [],
        orders: {}
    }

    const [ state, setState ] = useState(initialState)

    let updatedOrders = {}
    const updateState = newState => {
        const { data } = newState

        setState(prevState => {
            const { orders } = prevState

            if (data) {
                data.forEach(orderEvent => {
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
                                ...orderEvent,
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

            return {
                ...prevState,
                ...newState,
                orders: {
                    ...prevState.orders,
                    ...updatedOrders
                }
            }
        })
    }

    return (
        <OrderStateContext.Provider value={state}>
            <OrderUpdaterContext.Provider value={updateState}>
                {children}
            </OrderUpdaterContext.Provider>
        </OrderStateContext.Provider>
    )
}

export const useOrderState = () => useContext(OrderStateContext)
export const useOrderUpdater = () => {
    const setOrderState = useContext(OrderUpdaterContext)
    const updateOrderState = useCallback(newState => setOrderState(newState))
    return updateOrderState
}

export default OrderProvider