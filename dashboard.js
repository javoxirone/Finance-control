// const generateId = () => `id${Math.round(Math.random() * 1e8).toString(16)}`;


const totalBlance = document.querySelector('.total__balance'),
      totalMoneyIncome = document.querySelector('.total__money-income'),
      totalMoneyExpenses = document.querySelector('.total__money-expenses'),
      historyList = document.querySelector('.history-list'),
      form = document.querySelector('#form'),
      operationName = document.querySelector('.operation__name'),
      operationAmount = document.querySelector('.operation__amount'),
      operationAdd = document.querySelector('.operation__add'),
      operationCategory = document.querySelector('.operation__category');
      optionWay = document.querySelector('.option__way'),
      plus_btn = document.querySelector('.plus'),
      minus_btn = document.querySelector('.minus');
operationAdd.addEventListener('click', () => {
  location.reload();
});
let dbOperation = JSON.parse(localStorage.getItem('calc')) || [];

let plus = () => {
  operationCategory.innerHTML = `
        <option value="Зарплата">Зарплата</option>
        <option value="Подарок">Подарок</option>
        <option value="Другое">Другое...</option>`;
};
let minus = () => {
  operationCategory.innerHTML = `
        <option value="Здоровье">Здоровье</option>
        <option value="Досуг">Досуг</option>
        <option value="Продукты">Продукты</option>
        <option value="Подарки">Подарки</option>
        <option value="Другое">Другое...</option>`;
  operationAmount.value = "-" + operationAmount;

};
let plus_amount = plus_btn.addEventListener("click", plus);
let minus_amount = minus_btn.addEventListener("click", minus);



const renderOperation = (operation) =>{
  const className = operation.amount < 0 ? 'table-danger' : 'table-success';
  const listItem = document.createElement('tr');
  listItem.classList.add('history__item');
  listItem.classList.add(className);
  listItem.innerHTML = `
    <th scope="row" class="date">${operation.id}</th>
    <td>${operation.description}</td>
    <td class="operation__category">${operation.category}</td>
    <td class="history__money">${operation.amount}</td>
    <td class="delete"><button class="btn btn-danger history__delete" data-id="${operation.id}">Delete<i class="fa fa-trash"></i></button></td>`;
  historyList.append(listItem);



};

const updateBalance = () => {
  const resultIncome = dbOperation
      .filter((item) => item.amount > 0)
      .reduce((result, item) => result + item.amount, 0);
  const resultExpenses = dbOperation
      .filter((item) => item.amount < 0)
      .reduce((result, item) => result + item.amount, 0);

      totalMoneyIncome.textContent = '+' + (resultIncome) + ' $';
      totalMoneyExpenses.textContent = (resultExpenses) + ' $';
      totalBlance.textContent = (resultIncome + resultExpenses) + ' $';
};

const addOperation = (event) => {
  event.preventDefault();
  const operationNameValue = operationName.value,
        operationAmountValue = operationAmount.value,
        operationCategoryValue = operationCategory.value;
  operationName.style.borderColor = '';
  operationAmount.style.borderColor = '';

  if(operationNameValue && operationAmountValue){

    const operation = {
      id: new Date().toString(),
      description: operationNameValue,
      category: operationCategoryValue,
      amount: +operationAmountValue,

    };
    // operation.amount = parseInt("-" + operationAmountValue);
    // plus_btn.addEventListener('click', () => {
    //   operation.amount = parseInt("+" + operationAmountValue);
    //   console.log(operation.amount);
    // });
    // operation.amount = parseInt("+" + operationAmountValue);
    // if(minus_btn.addEventListener){
    //   operation.amount = parseInt("-" + operationAmountValue);
    //   console.log(operation.amount);
    // }


    // if(plus_btn.addEventListener("click", plus)){
    //   operation.amount = parseInt("+" + operationAmountValue);
    // }
    // else
    //
    // if (!minus_btn.onclick){
    //   operation.amount = parseInt("+" + operationAmountValue);
    //   console.log(operation.amount);
    // }else{
    //   operation.amount = parseInt("-" + operationAmountValue);
    //   console.log(operation.amount);
    // }

    if(operationCategoryValue == 'Здоровье' || operationCategoryValue == 'Досуг' || operationCategoryValue == 'Продукты' || operationCategoryValue == 'Подарки'){
      operation.amount = parseInt('-' + operationAmountValue);
    }
    else if(operationCategoryValue == 'Зарплата' || operationCategoryValue == 'Подарок'){
      operation.amount = parseInt('+' + operationAmountValue);
    }




    dbOperation.push(operation);
    init();
    console.log(dbOperation);

  }else{
    if(!operationNameValue) operationName.style.borderColor = 'red';
    if(!operationAmountValue) operationAmount.style.borderColor = 'red';
  }

  operationName.value = '';
  operationAmount.value = '';


};

const deleteOperation = (event) => {
  const target = event.target;
  if(target.classList.contains('history__delete')){
    dbOperation = dbOperation.filter(operation => operation.id !== target.dataset.id);
    init();
  }
};

const init = () => {
  historyList.textContent = '';
  dbOperation.forEach(renderOperation);
  updateBalance();
  localStorage.setItem('calc', JSON.stringify(dbOperation))

};


form.addEventListener('submit', addOperation);

historyList.addEventListener('click', deleteOperation);

init();


let total = document.querySelector('.total__balance');
let total_income = document.querySelector('.total__money-income');
let total_expenses = document.querySelector('.total__money-expenses');
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Баланс', 'Доходы', 'Расходы'],
    datasets: [{
      label: '# of Votes',
      data: [parseInt(total.innerText), parseInt(total_income.innerText), parseInt(total_expenses.innerText)],
      backgroundColor: [
        'rgba(0, 0, 0, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(0, 0, 0, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


let config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: window.chartColors.red,
      borderColor: window.chartColors.red,
      data: [parseInt(total_expenses.innerText), 0, 0, 0, 0, 0, 0],
      fill: false,
    }, {
      label: 'My Second dataset',
      fill: false,
      backgroundColor: window.chartColors.blue,
      borderColor: window.chartColors.blue,
      data: [parseInt(total_income.innerText), 0, 0, 0, 0, 0, 0],
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Min and Max Settings'
    },
    scales: {
      yAxes: [{
        ticks: {
          // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
          suggestedMin: 10,

          // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
          suggestedMax: 50
        }
      }]
    }
  }
};

window.onload = function() {
  let ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
};

