import React, { useState } from 'react'

type Props = {
    isModalVisible: boolean,
    setIsModalVisible: (isModalVisible: boolean) => void
}

function MortgageModal(props: Props) {

    const {isModalVisible, setIsModalVisible} = props

    const styles = {
        width: 80 + "%",
        minHeight: 300,
        backgroundColor: "gray",
        margin: "0 auto",
        display: isModalVisible ? "block" : "none"
    }

  return (
    <div style={styles}>
        <span onClick={() => setIsModalVisible(false)}>Close</span>
        <h3>Izračun kredita</h3>
        <ul>
            <li>Osnovica: {}</li>
        </ul>
    </div>
  )
}

export default MortgageModal