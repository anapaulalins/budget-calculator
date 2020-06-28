const balanceValue = document.querySelector('.balance-value')
const incomeValue = document.querySelector('.income-value ')
const outcomeValue = document.querySelector('.outcome-value')

const btnIncome = document.querySelector('.income-btn')
const btnOutcome = document.querySelector('.outcome-btn')
const btnAll = document.querySelector('.all-btn')

const incomeDetails = document.querySelector('.income-datails')
const expensesDetails = document.querySelector('.expenses-details')
const allDetails = document.querySelector('.all-details')

const incomeForm = document.querySelector('.income-form')
const inputIncomeTitle = document.querySelector('.input-income-title')
const inputIncomeValue = document.querySelector('.input-income-value')
const incomeList = document.querySelector('.income-list')

const expenseForm = document.querySelector('.expense-form')
const inputExpenseTitle = document.querySelector('.input-expense-title')
const inputExpenseValue = document.querySelector('.input-expense-value')
const expenseList = document.querySelector('.expense-list')

const allList = document.querySelector('.all-list')

const errIncome = document.querySelector('.err-income')
const errExpense = document.querySelector('.err-expense')

const local_storage_all = 'key.all'

let arrAll = JSON.parse(localStorage.getItem(local_storage_all)) || []
let selectedId = ''
let selectedElement = ''

const dayName = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]
const monName = ["janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro"]

incomeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (inputIncomeValue.value === '' || inputIncomeValue.value === null) {
        removeHide(errIncome)
    } else if (inputIncomeTitle.value === '' || inputIncomeTitle.value == null) {
        removeHide(errIncome)
    } else {
        arrAll.push(createObj('income', inputIncomeTitle.value, inputIncomeValue.value))
        createElementAll()
        clearInput([inputIncomeTitle, inputIncomeValue])
        save()
        cal()
        hide([errIncome])
    }
})

expenseForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (inputExpenseValue.value === '' || inputExpenseValue.value === null) {
        removeHide(errExpense)
    } else if (inputExpenseTitle.value === '' || inputExpenseTitle.value == null) {
        removeHide(errExpense)
    } else {
        arrAll.push(createObj('expense', inputExpenseTitle.value, inputExpenseValue.value))
        createElementAll()
        clearInput([inputExpenseTitle, inputExpenseValue])
        save()
        cal()
        hide([errExpense])
    }

})

function createElementAll() {
    clear(incomeList)
    clear(expenseList)
    clear(allList)
    arrAll.forEach(element => {
        if (element.type === 'income') {
            const li = document.createElement('li')
            li.dataset.listId = element.id
            li.innerHTML = createBody(element)

            incomeList.appendChild(li)

        } else if (element.type === 'expense') {
            const li = document.createElement('li')
            li.dataset.listId = element.id
            li.innerHTML = createBody(element)

            expenseList.appendChild(li)
        }
        const li = document.createElement('li')
        li.dataset.listId = element.id
        li.innerHTML = createBody(element)
        if (element.type === 'income') {
            li.style.color = '#008000'
        } else {
            li.style.color = '#FF0000'
        }
        allList.appendChild(li)
    })
}

function createBody(element) {
    return `
    <div class=" list-content">
    <div class=" title">
        <p>${element.name}</p>
    </div>
    <div class=" value">
        <p>$${element.value}</p>
    </div>
    <div class=" trash">
        <i class="fas fa-trash"></i>
    </div>
    </div>
    <div class=" time">
    <p>${element.day} ${element.month} ${element.year} - ${element.time}</p>
    </div>`
}

trash(incomeList)
trash(expenseList)
trash(allList)

function trash(list) {
    list.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'i') {
            selectedId = event.target.parentElement.parentElement.parentElement.dataset.listId
            selectedElement = event.target.parentElement.parentElement.parentElement
            let findList = arrAll.find(element => element.id === selectedId)
            let index = arrAll.indexOf(findList)
            console.log(index, findList)
            arrAll.splice(index, 1)
            console.log(arrAll)
            save()
            cal()
            selectedElement.style.display = 'none'
        }
    })
}

function cal() {
    let valorIncome = 0
    let valorExpense = 0

    arrAll.forEach(element => {
        if (element.type === 'income') {
            valorIncome = valorIncome += Number(element.value)
        } else if (element.type === 'expense') {
            valorExpense = valorExpense += Number(element.value)
        }
    })

    incomeValue.innerHTML = `$${parseFloat(valorIncome).toFixed(2)} `
    outcomeValue.innerHTML = `$${parseFloat(valorExpense).toFixed(2)}`

    let valueBalance = valorIncome - valorExpense
    console.log(valorIncome, valorExpense)
    if (valorExpense > valorIncome) {
        console.log(valorExpense, valorIncome)
        balanceValue.innerHTML = `$ ${parseFloat(valueBalance).toFixed(2)}`
        balanceValue.style.color = '#FF0000'
    } else {
        balanceValue.innerHTML = `$${parseFloat(valueBalance).toFixed(2)}`
        balanceValue.style.color = '#008000'
    }
    console.log(valorIncome, valorExpense)
}

function createObj(type, name, value) {
    const now = new Date
    return {
        id: Date.now().toString(),
        type: type,
        name: name,
        value: value,
        day: now.getDate(),
        month: monName[now.getMonth()],
        year: now.getFullYear(),
        time: now.toLocaleTimeString()
    }
}


btnIncome.addEventListener('click', () => {
    active(btnIncome)
    removeActive([btnOutcome, btnAll])
    removeHide(incomeDetails)
    hide([expensesDetails, allDetails])

})
btnOutcome.addEventListener('click', () => {
    active(btnOutcome)
    removeActive([btnIncome, btnAll])
    removeHide(expensesDetails)
    hide([incomeDetails, allDetails])
})
btnAll.addEventListener('click', () => {
    active(btnAll)
    removeActive([btnIncome, btnOutcome])
    removeHide(allDetails)
    hide([incomeDetails, expensesDetails])
})

function clear(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function save() {
    localStorage.setItem(local_storage_all, JSON.stringify(arrAll))
}

function active(element) {
    element.classList.add('active')
}
function removeActive(elements) {
    elements.forEach(element => {
        element.classList.remove('active')
    });
}

function hide(elements) {
    elements.forEach(element => {
        element.classList.add('hide')
    })
}
function removeHide(element) {
    element.classList.remove('hide')
}

function clearInput(elements) {
    elements.forEach(element => {
        element.value = null
    })
}


const n = new Date

setTimeout(() => {
    localStorage.removeItem(local_storage_all)
    console.log('ok', n)
    incomeList.style.display = 'none'
    incomeValue.innerHTML = `$${0}`
    outcomeValue.innerHTML = `$${0}`
    balanceValue.innerHTML = `$${0}`
}, (3600000 * 24));

cal()
createElementAll()

