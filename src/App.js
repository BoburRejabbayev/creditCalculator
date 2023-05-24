import { Alert } from '@mui/material';
import React, { useState } from 'react';
// import './app.css'
import './app.scss'
import './app.css'
import Table from './Table';

function App() {


  const [creditTypes, setCreditType] = React.useState(['Annuitet', 'Differensial'])
  const [activeType, setActiveType] = React.useState(['Annuitet'])
  const [openType, setOpenType] = React.useState(false)
  const typeIndex = creditTypes.findIndex((el) => el === activeType)
  const [table, setTable] = React.useState(false)
  const [summValue, setSummValue] = React.useState()
  const [timeValue, setTimeValue] = React.useState()
  const [percentValue, setPercentValue] = React.useState()

  const [allPayments, setAllPayments] = useState()


  function getNextMonth(months) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString();
  }

  const onClicked = () => {
    setTable(true);
    console.log(allPayments);
    setAllPayments(activeType === 'Differensial' ? calculateDifferentialCredit(summValue, percentValue, timeValue) : calculateLoanAnnuitet(summValue, percentValue, timeValue))
  }

  function calculateLoanAnnuitet(amount, interestRate, months) {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = amount * monthlyRate / (1 - (1 / Math.pow(1 + monthlyRate, months)));
    let balance = amount;
    const payments = []
    for (let i = 0; i < months; i++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      balance -= principal;
      payments.push({
        date: getNextMonth(i),
        payment: monthlyPayment.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        balance: balance.toFixed(2)
      });
    }
    return payments;
  }
  function calculateDifferentialCredit(amount, interestRate, months) {
    const monthlyRate = interestRate / 100 / 12;
    const principal = amount / months;
    const payments = []

    for (let i = 0; i < months; i++) {
      const interest = (amount * monthlyRate);
      amount -= principal;
      payments.push({
        date: getNextMonth(i),
        payment: (principal + interest).toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        balance: amount.toFixed(2),
      });
    }
    return payments;
  }

  const onSelected = (i, el) => {
    setOpenType(!openType)
    setActiveType(el)

  }

  const onSetTypeCredit = (i, el) => {
    onSelected(i, el)
  }


  const onOpenTypes = () => {
    setOpenType(!openType)
  }

  return (
    <div className='app'>
      <div className='app__info'>
        <div className="input-group">
          <input
            value={summValue}
            onChange={(el) => setSummValue(el.target.value)}
            placeholder='Summani kefiriting'
            type="number"
            className="form-control input1"
            aria-label="Dollar amount (with dot and two decimal places)"
          />
          <span className="input-group-text">so'm</span>
        </div>
        <div className='input-group'>
          <input
            value={percentValue} type='number' onChange={(el) => setPercentValue(el.target.value)} placeholder='Credit Foizi 24%' className='input2 form-control' />
          <span className="input-group-text">%</span>
        </div>
        <div className="input-group">
          <input
            value={timeValue} type="number" className="input3 form-control" onChange={(el) => setTimeValue(el.target.value)} placeholder='Muddatni kefiriting (yilda)' aria-label="Recipient's username" aria-describedby="button-addon2" />
          <span className="input-group-text">months</span>
        </div>

        <div className='buttons'>
          <div className="sort">
            {openType &&
              <div className="sort__popup">
                <ul>
                  {creditTypes.map((el, i) => <li onClick={() =>
                    onSetTypeCredit(i, el)}
                    className={typeIndex === i ? 'active' : ''}
                    key={i} >{creditTypes[i]}</li>)}
                </ul>
              </div>
            }
            <div className="sort__label" onClick={() => onOpenTypes()} >
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
                />
              </svg>
              <span >{activeType}</span>
            </div>

          </div>
          <button onClick={() => onClicked()} className="btn btn-outline-success" type="button" id="button-addon2">Calculate</button>
        </div>


      </div>
      {table ?
        <div>
          <Table
            allPayments={allPayments}
            summValue={summValue}
          />
        </div>
        : ''
      }

    </div>
  );
}

export default App;
