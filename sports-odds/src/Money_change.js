import React, { useState } from "react";
import styles from "@/styles/money_change.module.css";
import { useAppContext } from "./GlobalContext";
import axios from "axios";

function Money_Change({ setMoney }) {
  const { user, setUser, setAllTransactions, allTransactions } =
    useAppContext();
  const [balance, setBalance] = useState(user.fake_money);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = today.getFullYear();

  const date = `${month}/${day}/${year}`;

  const handleDeposit = () => {
    if (depositAmount > 0) {
      let update_url = "https://sports-odds.herokuapp.com/update_money";
      // let update_url = "http://127.0.0.1:5000/update_money";
      let fake_money = user.fake_money + parseFloat(depositAmount);
      axios
        .post(update_url, {
          fake_money,
        })
        .then((res) => {
          if (res.status === 200) setUser(res.data);

          let new_transaction =
            "https://sports-odds.herokuapp.com/addTransaction";
          // let new_transaction = "http://127.0.0.1:5000/addTransaction";
          axios
            .post(new_transaction, {
              date: date,
              transaction_type: "Deposit",
              transaction_amount: depositAmount,
              money_in_account: fake_money,
            })
            .then((res) => {
              if (res.status === 200) {
                setAllTransactions(res.data);
                alert(`$${depositAmount} has been added to your account!`);
                setDepositAmount("");
                setMoney(false);
              }
            });
        });
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && balance >= withdrawAmount) {
      let update_url = "https://sports-odds.herokuapp.com/update_money";
      // let update_url = "http://127.0.0.1:5000/update_money";
      let fake_money = user.fake_money - parseFloat(withdrawAmount);
      axios
        .post(update_url, {
          fake_money,
        })
        .then((res) => {
          if (res.status === 200) setUser(res.data);
          let new_transaction =
            "https://sports-odds.herokuapp.com/addTransaction";
          // let new_transaction = "http://127.0.0.1:5000/addTransaction";
          axios
            .post(new_transaction, {
              date: date,
              transaction_type: "Withdrawal",
              transaction_amount: withdrawAmount,
              money_in_account: fake_money,
            })
            .then((res) => {
              if (res.status === 200) {
                setAllTransactions(res.data);
                alert(
                  `$${withdrawAmount} has been withdrawn from your account!`
                );
                setWithdrawAmount("");
                setMoney(false);
              }
            });
        });
    }
  };

  return (
    <div className={styles.betting_account}>
      <h1>Betting Account</h1>
      <div style={{ margin: 5, paddingLeft: 5, paddingRight: 5 }}>
        <label htmlFor="deposit">Deposit:</label>
        <input
          type="number"
          id="deposit"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div style={{ margin: 5, paddingLeft: 5, paddingRight: 5 }}>
        <label htmlFor="withdraw">Withdraw:</label>
        <input
          type="number"
          id="withdraw"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
}

export default Money_Change;
