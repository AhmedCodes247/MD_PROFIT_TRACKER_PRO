let buyTotal = 0;
let sellTotal = 0;

const titleInput = document.getElementById('titleInput');
const amountInput = document.getElementById('amountInput');
const descInput = document.getElementById('descInput');
const buyBtn = document.getElementById('buyBtn');
const sellBtn = document.getElementById('sellBtn');
const clearBtn = document.getElementById('clearBtn');
const transactionsList = document.getElementById('transactionsList');
const buyCard = document.getElementById('buyCard');
const totalBuyEl = document.getElementById('totalBuy');
const totalExpenseEl = document.getElementById('totalExpense');
const totalProfitEl = document.getElementById('totalProfit');

function addTransaction(type) {
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const desc = descInput.value.trim();

  if (!title || !amount || !desc) {
    alert('Please fill all fields!');
    return;
  }

  const emptyMsg = transactionsList.querySelector('.empty-msg');
  if (emptyMsg) {
    transactionsList.removeChild(emptyMsg);
  }

  if (type === 'buy') {
    buyTotal += amount;
  } else {
    sellTotal += amount;
  }

  const transactionDiv = document.createElement('div');
  transactionDiv.className = 'transaction-item ' + type + '-type';

  const titleEl = document.createElement('h4');
  titleEl.className = 'transaction-title';
  titleEl.textContent = title;

  const amountEl = document.createElement('div');
  amountEl.className = 'transaction-amount';
  amountEl.textContent = '$' + amount.toFixed(2);

  const descEl = document.createElement('div');
  descEl.className = 'transaction-desc';
  descEl.textContent = desc;

  const badgeEl = document.createElement('span');
  badgeEl.className = 'transaction-badge';
  badgeEl.textContent = type;

  transactionDiv.appendChild(titleEl);
  transactionDiv.appendChild(amountEl);
  transactionDiv.appendChild(descEl);
  transactionDiv.appendChild(badgeEl);

  transactionsList.insertBefore(transactionDiv, transactionsList.firstChild);

  updateCards(type);
  clearInputs();
}

function updateCards(lastType) {
  totalBuyEl.textContent = '$' + buyTotal.toFixed(2);

  if (lastType === 'buy' && buyTotal > 0) {
    buyCard.classList.add('active-buy');
    buyCard.classList.remove('active-sell');
  } else if (lastType === 'sell' && sellTotal > 0) {
    buyCard.classList.add('active-sell');
    buyCard.classList.remove('active-buy');
  }

  const expense = buyTotal - sellTotal;
  totalExpenseEl.textContent = '$' + expense.toFixed(2);

  const profit = sellTotal - buyTotal;
  totalProfitEl.textContent = '$' + profit.toFixed(2);
}

function clearInputs() {
  titleInput.value = '';
  amountInput.value = '';
  descInput.value = '';
}

function clearAll() {
  if (confirm('Clear all transactions?')) {
    buyTotal = 0;
    sellTotal = 0;

    totalBuyEl.textContent = '$0';
    totalExpenseEl.textContent = '$0';
    totalProfitEl.textContent = '$0';

    buyCard.classList.remove('active-buy', 'active-sell');

    transactionsList.innerHTML = '';
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'empty-msg';
    emptyMsg.textContent = 'No transactions yet. Start tracking!';
    transactionsList.appendChild(emptyMsg);

    clearInputs();
  }
}

buyBtn.addEventListener('click', function () {
  addTransaction('buy');
});

sellBtn.addEventListener('click', function () {
  addTransaction('sell');
});

clearBtn.addEventListener('click', clearAll);















