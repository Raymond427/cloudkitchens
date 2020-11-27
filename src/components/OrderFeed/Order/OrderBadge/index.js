import React from 'react'
import { FORMATTED_EVENT_NAMES } from '../constants'
import { BADGE_BACKGROUND_COLORS } from '../constants/colors'
import './OrderBadge.css'

const OrderBadge = ({ eventName }) => (
    <div className="OrderBadge" style={{ backgroundColor: BADGE_BACKGROUND_COLORS[eventName] }}>
        {FORMATTED_EVENT_NAMES[eventName]}
    </div>
)

export default OrderBadge