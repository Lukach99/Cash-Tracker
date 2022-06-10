import { useCallback, useContext, useEffect, useMemo } from "react";
import {ExpenseType, MonthList} from "../../../constants/generic.enums";
import { ExpensesContext } from "../../../contex/expenses.contex";
import ExpensesHttp from "../../../http/expenses.http";
import { TExpense } from "../../../models/expense.model";
import "./index.scss"
const ExpensesOverview = () => { 
    const { test, setTest } = useContext(ExpensesContext);

    

    const expensesHttp = useMemo(() => new ExpensesHttp(), []);

    const fetchExpenses = useCallback(
      async () => {
        const data = await expensesHttp.getExpenses()
        setTest(data)
      },
      [expensesHttp,test],
    )
    console.log(test)
    useEffect(() => {
        if(test.length === 0){
            fetchExpenses()
            console.log(test)
        }
        /* fetchExpenses() */ 
      console.log("fetched") 
    }, [fetchExpenses,test]) 
    
    /* if(!test){
        fetchExpenses()
        console.log("fetched")
    } */

    const totalAmount = () => {
        let amount = 0

        test.map((item: TExpense) => { amount += +item.price  })
        return amount
    }

    const totalAmountOfSomething= (query: string) => {
        let amount = 0

        test.filter((item: TExpense) =>  item.type === `${query}` ).map((item: TExpense) => { amount += +item.price  })
        return amount
    }

    /* const date = new Date(test[0].date).getMonth() */

    const totalAmountInMonth = (month: number, expenseType: string) => {

        const listMonth = test.filter((expense: TExpense) => new Date(expense.date).getMonth() === month)
        const listByType = listMonth.filter((expense: TExpense) => expense.type === expenseType)
        const amount = listByType.reduce((acc: number,cur: { price: string; }) => { return acc + +cur.price },0)

        return amount
    
    }

    /* console.log(date) */
    console.log(totalAmountInMonth(5, "Food"))

    return (
<       section className="total">
            <section className="total-all">
                <h2>Total Amount</h2>
                <section className="total-amounts">
                    <article className="total-amounts__amount">
                        <h2>Total</h2>
                        <p>{totalAmount()} Kn</p>
                    </article>
                    <section className="total-amounts__rest">
                        {Object.keys(ExpenseType).map((key,i) => 
                            <article className="amount" key={i}>
                            <h4>{key}</h4>
                            <p>{totalAmountOfSomething(key)} Kn</p> 
                            </article> )
                        }
                    </section>
                </section>
            </section>

            <section className="total-months">
                <h2>Total By Months</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {Object.values(MonthList).map((key,i) => <th key={i}>{key}</th>)}
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(ExpenseType).map((type,i) =>
                                <tr key={i}>
                                <td>{type}</td>
                                {Object.keys(MonthList).map((key,i) => 
                                    <td key={i}>{totalAmountInMonth(+key, type)} Kn </td> )} 
                                    </tr>   
                            )
                        }
                    </tbody>
                    

                    
                </table>
            </section>
            
            
        </section>


    )
        
        
        
       

    
 }

 export default ExpensesOverview