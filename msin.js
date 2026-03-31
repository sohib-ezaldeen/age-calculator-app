let form = document.querySelector("form");
let dayInput = document.querySelector("#day");
let monthInput = document.querySelector("#month");
let yearInput = document.querySelector("#year");
let dayError = document.querySelector("#day-error");
let monthError = document.querySelector("#month-error");
let yearError = document.querySelector("#year-error");
let dayResult = document.querySelector(".day-result");
let monthResult = document.querySelector(".month-result");
let yearResult = document.querySelector(".year-result");

let todayDate = new Date();
// in click submit button
form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleSubmit();
});

//  A function that, when the button is pressed, calls the validation, calculation, and display functions
function handleSubmit() {
  let day = Number(dayInput.value);
  let month = Number(monthInput.value);
  let year = Number(yearInput.value);

  if (validateInputs(day, month, year)) {
    let result = calculateAge(day, month, year);
    showResult(result.calcDay, result.calcMonth, result.calcYear);
  } else {
    return;
  }
}
// function of validation Inputs
function validateInputs(day, month, year) {
  // Case Change Management
  let isvalid = true;
  let birthDate = new Date(year, month - 1, day);

  //  Basic validation
  if (!month || month < 1 || month > 12) {
    monthError.classList.add("show");
    monthInput.classList.add("border-error");
    isvalid = false;
  }
  //  If the month is correct, check that the days are correct
  if (month) {
    if (!day || day > 31 || day < 1 || day !== birthDate.getDate()) {
      dayError.classList.add("show");
      dayInput.classList.add("border-error");
      isvalid = false;
    }
  }
  if (!year || year > todayDate.getFullYear() || year < 1900) {
    yearError.classList.add("show");
    yearInput.classList.add("border-error");
    isvalid = false;
  }
  // if (
  //   day !== birthDate.getDate() ||
  //   month - 1 !== birthDate.getMonth() ||
  //   year !== birthDate.getFullYear()
  // ) {
  //   dayError.classList.add("show");
  //   dayInput.classList.add("border-error");
  //   isvalid = false;
  // }
  return isvalid;
}

// function  of CalculateAge
function calculateAge(day, month, year) {
  let calcYear = todayDate.getFullYear() - year;
  let calcMonth = todayDate.getMonth() - (month - 1);
  let calcDay = todayDate.getDate() - day;
  if (calcDay < 0) {
    let DaysOfPreviousMonth = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      0,
    ).getDate();
    calcDay += DaysOfPreviousMonth;
    calcMonth--;
  }
  if (calcMonth < 0) {
    calcMonth += 12;
    calcYear--;
  }

  return { calcDay, calcMonth, calcYear };
}

// function show Result
function showResult(day, month, year) {
  dayResult.textContent = day;
  monthResult.textContent = month;
  yearResult.textContent = year;
}
// function clear Error
function clearError(ele, input) {
  ele.classList.remove("show");
  input.classList.remove("border-error");
}

// remove meassge Error at input change
[dayInput, monthInput, yearInput].forEach((ele) => {
  const error = document.querySelector(`#${ele.id}-error`);

  ele.addEventListener("input", () => {
    clearError(error, ele);
  });
});
