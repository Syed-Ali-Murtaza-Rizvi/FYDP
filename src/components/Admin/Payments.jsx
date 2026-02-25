import React from "react";
import orgAdminData from "../../data/OrgAdminData";

const Payments = () => {
  const payments = orgAdminData.payments;

  return (
    <div className="table-container">
         <div className="table-header">
      <h3>Pending Payments</h3></div>

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Roll Number</th>
             <th>Organization</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Days Overdue</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.student}</td>
              <td>{payment.roll}</td>
               <td>{payment.organization}</td>
              <td>{payment.type}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.dueDate}</td>
              <td>{payment.status}
              </td>
              <td>{payment.semester}</td>
              {/* ACTION BUTTONS */}
              <td>
                <button>Update</button>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
