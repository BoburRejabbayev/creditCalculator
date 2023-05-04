import React from 'react'

export default function TableList({ monthPayment, index }) {
    const { payment, interest, principal, date } = monthPayment

    
    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{date}</td>
                <td>{(interest)}</td>
                <td>{(principal)}</td>
                <td>{(payment)}</td>
            </tr>
          
        </>
    )
}
