const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const calendar = document.querySelectorAll('.calendar p');
let getWeekDays = document.querySelector('.weekDays');
let CurrentDate = document.querySelector('.mainDay');


function needWeekDays(){
  var days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  let currentDate = new Date();
  let dayOfWeek = days[currentDate.getDay()];
  return dayOfWeek;
}

getWeekDays.innerHTML = needWeekDays();

function getCurrDate (){
  let months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  let currDate = new Date();
  let day = currDate.getDate();
  let monthIndex = currDate.getMonth();
  let year = currDate.getFullYear();
  let monthName = months[monthIndex];

  return day + " " + monthName + " " + year;
}

CurrentDate.innerHTML = getCurrDate();


const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]

// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// }

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length

progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value
    })

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle('completed')
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length

      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
      progressLabel.innerText = allQuotes[completedGoalsCount]

      localStorage.setItem('allGoals', JSON.stringify(allGoals))
    } else {
      progressBar.classList.add('show-error')
    }
  })
})

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }

  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error')
  })

  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
});
