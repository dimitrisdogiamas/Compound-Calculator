// define the function that we can use to calculate the final value of the compounded interset 
let init_amount = 20000
let monthly_contribution = 400 
let number_Of_Years = 30 
let interset_rate= 10

// define a function that would calculate the difference (ie the effectthat compounding has had )
function compoundInterest(init_amount, monthly_contribution, number_Of_Years, interset_rate) {
  let total = init_amount
  let annual_contribution = monthly_contribution * 12
  for (let i = 0; i < number_Of_Years; i++){
    total = total + annual_contribution;
    total= total*((interset_rate+100 )/100)
  }

  return total.toFixed(2);
}

function calculateRegular(init_amount, monthly_contribution, number_Of_Years) {
  return (init_amount + monthly_contribution * 12 * number_Of_Years).toFixed(2);
}

function printOutput(init_amount,monthly_contribution,number_Of_Years, interset_rate) {
  let final_value = compoundInterest(init_amount,monthly_contribution,number_Of_Years, interset_rate)
  let value_without_compounding= calculateRegular(init_amount,monthly_contribution,number_Of_Years)
  let summary = `init_amount: ${init_amount}\nMonthly_contribution:${monthly_contribution}\nNumber_of_years:${number_Of_Years}\\nINTEREST_RATE:${interset_rate}\n\nFina;_compounded_value:$${final_value}\nREGULAR_AMOUNT: $${value_without_compounding}\nDifference:$${final_value - value_without_compounding}`
  console.log(summary)
}

// step-3 to create a run function that then promts the user for all necessary inputs required to calculate the final amounts 
function run() {
  let init_amount= prompt("what is tou initial inverstment")// this
}

// step -4 inside of the function , make a nice pretty print statement using string literals that gives the financial breakdown 

function printOutput(init_amount, monthly_contribution, number_Of_Years, interset_rate) {
  let final_value = compoundInterest(init_amount, monthly_contribution, number_Of_Years, interset_rate)
  let value_without_compounding = calculateRegular(init_amount, monthly_contribution, number_Of_Years)
  let summary = `init_amount: ${init_amount}\nMonthly_contribution:${monthly_contribution}\nNumber_of_years:${number_Of_Years}\\nINTEREST_RATE:${interset_rate}\n\nFina;_compounded_value:$${final_value}\nREGULAR_AMOUNT: $${value_without_compounding}\nDifference:$${final_value - value_without_compounding}`
  console.log(summary)
}
run()