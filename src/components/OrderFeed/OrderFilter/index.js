import React, { useState } from 'react'
import Modal from '../../Modal'
import { ORDER_EVENTS } from '../../OrderProvider/constants'
import './OrderFilter.css'

const OrderFilter = ({ filter, setFilter }) => {
    const [ showModal, setShowModal ] = useState(false)
    const filterFunctions = {
        CREATED: order => order.event_name === ORDER_EVENTS.CREATED,
        COOKED: order => order.event_name === ORDER_EVENTS.COOKED,
        DRIVER_RECEIVED: order => order.event_name === ORDER_EVENTS.DRIVER_RECEIVED,
        DELIVERED: order => order.event_name === ORDER_EVENTS.DELIVERED,
        CANCELLED: order => order.event_name === ORDER_EVENTS.CANCELLED,
        CLEAR: () => true
    }
    const filterTypes = {
        COOKING_NOW: 'cooking-now',
        JUST_COOKED: 'just-cooked',
        NONE: 'none'
    }

    return (
        <div className="OrderFilter">
            <h3>Filters</h3>
            <div className="OrderFilter-buttons">
                <button
                    onClick={() => setFilter({
                        type: filterTypes.COOKING_NOW,
                        function: filterFunctions.CREATED
                    })}
                    disabled={filter.type === filterTypes.COOKING_NOW}
                >
                    Cooking Now
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    disabled={filter.type === filterTypes.JUST_COOKED}
                >
                    Just Cooked
                </button>
                <button
                    onClick={() => setFilter({
                        type: filterTypes.NONE,
                        function: () => true
                    })}
                >
                    Clear Filters
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    YERR!
                </Modal>
            )}
        </div>
    )
}

export default OrderFilter