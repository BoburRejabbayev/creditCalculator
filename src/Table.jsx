import React from 'react'
import TableList from './TableList'

export default function Table({ allPayments, summValue }) {

    let totalInterest = allPayments.reduce((acc, curr) => acc + (Number(curr.interest)), 0);
    // let totalPrincipal = allPayments.reduce((acc, curr) => acc + (Number(curr.principal)), 0);
    let totalPrincipal = summValue
    let totalPayments = Number(totalInterest + totalPrincipal).toFixed(2);

    return (
        <div>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date to payment</th>
                        {/* <th scope="col">Month</th> */}
                        <th scope="col">percent</th>
                        <th scope="col">principial</th>
                        <th scope="col">paymnet</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allPayments.map((el, index) =>
                            <TableList
                                monthPayment={el}
                                key={index}
                                index={index}
                            />
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Overal:</th>
                        <th scope="col">foiz summa:{Number(totalInterest).toFixed(2)}</th>
                        <th scope="col">Asosiy Summa: {totalPrincipal} </th>
                        <th scope="col">Umumiy summa: {totalPayments} </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}



