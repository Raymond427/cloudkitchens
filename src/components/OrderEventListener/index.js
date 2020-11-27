import React, { useState, useEffect } from 'react'
import { ORDER_DATA_SERVER_ADDRESS, SOCKET_EVENTS } from './constants'
import { io } from 'socket.io-client'
import { useOrderUpdater } from '../OrderProvider'

const newOrderState = action => {
    const { type, payload } = action
    const genericError = {
        error: 'There was a problem contacting the server',
        loading: false
    }

    switch (type) {
        case SOCKET_EVENTS.connect:
            return {
                loading: false,
                error: null
            }
        case SOCKET_EVENTS.order_event:
            return {
                data: payload,
                error: null,
                loading: false
            }
        case SOCKET_EVENTS.connect_error:
            return genericError
        case SOCKET_EVENTS.connect_timeout:
            return genericError
        case SOCKET_EVENTS.error:
            return genericError
        case SOCKET_EVENTS.reconnect_error:
            return genericError
        case SOCKET_EVENTS.reconnect_failed:
            return genericError
        case SOCKET_EVENTS.disconnect:
            return {
                loading: false,
                error: null
            }
        default:
          return {}
    }
}

const OrderEventListener = ({ children }) => {
    const [ socket, setSocket ] = useState(null)

    const updateOrderState = useOrderUpdater()

    useEffect(() => {
        const socket = io(ORDER_DATA_SERVER_ADDRESS, { transports : [ 'websocket' ] })

        Object.values(SOCKET_EVENTS).forEach(eventName => {
            socket.on(eventName, data => {
                updateOrderState(
                    newOrderState({ type: eventName, payload: data })
                )}
            )
        })

        setSocket(socket)
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default OrderEventListener