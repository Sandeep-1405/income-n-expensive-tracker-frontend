import React, { useMemo } from 'react';

const Calculate = ({displayList}) => {
    //console.log("Calculate comp", displayList)
    let paid;
    let totalAmount;
    let due;

    if(displayList.length ===0){
      paid = 0
      totalAmount = 0
      due = 0
    }

     paid = useMemo(
        () => displayList.reduce((total, income) => total + parseInt(income.paid), 0),
        [displayList]
      );
       totalAmount = useMemo(
        () => displayList.reduce((total, income) => total + parseInt(income.amount), 0),
        [displayList]
      );
       due = useMemo(
        () => displayList.reduce((total, income) => total + parseInt(income.due), 0),
        [displayList]
      );
    return (
        <div className="row text-center mb-4">
        <div className="col-4">
          <div className="p-3 bg-light shadow rounded">
            <h5 className="text-success">Paid</h5>
            <p className="fs-5 fw-bold">{paid} Rs</p>
          </div>
        </div>
        <div className="col-4">
          <div className="p-3 bg-light shadow rounded">
            <h5 className="text-danger">Due</h5>
            <p className="fs-5 fw-bold">{due} Rs</p>
          </div>
        </div>
        <div className="col-4">
          <div className="p-3 bg-light shadow rounded">
            <h5 className="text-primary">Total</h5>
            <p className="fs-5 fw-bold">{totalAmount} Rs</p>
          </div>
        </div>
      </div>
    );
};

export default Calculate;