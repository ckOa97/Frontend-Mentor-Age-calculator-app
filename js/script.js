let formData;
let day;
let month;
let year;
let birthDate;
let currentDate;
let formSubmitDisabled = false;

document.forms['birth-date'].addEventListener('submit', e => {

  e.preventDefault();
  if(formSubmitDisabled)
    return;

  let formIsValid = true;
  formData = new FormData(document.querySelector('main form'));
  day = parseInt(formData.get('day'));
  month = parseInt(formData.get('month'));
  year = parseInt(formData.get('year'));

  birthDate = new Date(year, month - 1, day);
  currentDate = new Date();

  if(!dayValidation())
    formIsValid = false;

  if(!monthValidation())
    formIsValid = false;

  if(!yearValidation())
    formIsValid = false;

  if(formIsValid)
    if(!dateValidation())
      formIsValid = false;

  if(formIsValid)
    if(!checkIfDateIsInThePast())
      formIsValid = false;

  if(formIsValid) {
    removeFormErrorGap();
  } else {
    addFormErrorGap();
  }

  if(formIsValid)
    submitForm();

});

function dayValidation() {

  let errorMessage;

  if(formData.get('day') === '') {
    errorMessage = 'This field is required';
    displayErrorMessageAndStyle(document.querySelector('#day'), 
                                document.querySelector('label[for="day"]'), 
                                document.querySelector('#day + span'),
                                errorMessage);
    return false;
  }

  if(day > 31 || day < 1) {
    errorMessage = 'Must be a valid day';
    displayErrorMessageAndStyle(document.querySelector('#day'), 
                                document.querySelector('label[for="day"]'), 
                                document.querySelector('#day + span'),
                                errorMessage);
    return false;
  }

  removeErrorMessageAndStyle(document.querySelector('#day'), 
                                document.querySelector('label[for="day"]'), 
                                document.querySelector('#day + span'),
                                errorMessage);

  return true;

}

function monthValidation() {

  let errorMessage;

  if(formData.get('month') === '') {
    errorMessage = 'This field is required';
    displayErrorMessageAndStyle(document.querySelector('#month'), 
                                document.querySelector('label[for="month"]'), 
                                document.querySelector('#month + span'),
                                errorMessage);
    return false;
  }

  if(month > 12 || month < 1) {
    errorMessage = 'Must be a valid month';
    displayErrorMessageAndStyle(document.querySelector('#month'), 
                                document.querySelector('label[for="month"]'), 
                                document.querySelector('#month + span'),
                                errorMessage);
    return false;
  }

  removeErrorMessageAndStyle(document.querySelector('#month'), 
                                document.querySelector('label[for="month"]'), 
                                document.querySelector('#month + span'),
                                errorMessage);

  return true;

}

function yearValidation() {

  let errorMessage;

  if(formData.get('year') === '') {
    errorMessage = 'This field is required';
    displayErrorMessageAndStyle(document.querySelector('#year'), 
                                document.querySelector('label[for="year"]'),
                                document.querySelector('#year + span'),
                                errorMessage);
    return false;
  }

  if(year < 1900) {
    errorMessage = "Can't be lower than 1900";
    displayErrorMessageAndStyle(document.querySelector('#year'), 
                                document.querySelector('label[for="year"]'), 
                                document.querySelector('#year + span'),
                                errorMessage);
    return false;
  }

  removeErrorMessageAndStyle(document.querySelector('#year'), 
                                document.querySelector('label[for="year"]'), 
                                document.querySelector('#year + span'),
                                errorMessage);

  return true;

}

function dateValidation() {

  let errorMessage;

  if((day !== birthDate.getDate()) || 
  (month !== (birthDate.getMonth() + 1)) || 
  (year !== birthDate.getFullYear())) {
    errorMessage = 'Must be a valid date';
    displayErrorMessageAndStyle(document.querySelector('#day'), 
                                document.querySelector('label[for="day"]'), 
                                document.querySelector('#day + span'),
                                errorMessage);

  if(!document.querySelector('#month').classList.contains('num-input-error')){
      document.querySelector('#month').classList.remove('num-input');
      document.querySelector('#month').classList.add('num-input-error');
    }
  if(!document.querySelector('label[for="month"]').classList.contains('error-text-color')) {
      document.querySelector('label[for="month"]').classList.add('error-text-color');
    }
  if(!document.querySelector('#year').classList.contains('num-input-error')){
      document.querySelector('#year').classList.remove('num-input');
      document.querySelector('#year').classList.add('num-input-error');
    }
  if(!document.querySelector('label[for="year"]').classList.contains('error-text-color')) {
      document.querySelector('label[for="year"]').classList.add('error-text-color');
    }
    return false;
  }

  return true;

}

function checkIfDateIsInThePast() {

  let errorMessage;

  if(birthDate.getTime() > currentDate.getTime()) {
    errorMessage = 'Must be in the past';

    if(year > currentDate.getFullYear()) {
        displayErrorMessageAndStyle(document.querySelector('#year'), 
                                    document.querySelector('label[for="year"]'), 
                                    document.querySelector('#year + span'),
                                    errorMessage);
    } else if(month > (currentDate.getMonth() + 1)) {
        displayErrorMessageAndStyle(document.querySelector('#month'), 
                                    document.querySelector('label[for="month"]'), 
                                    document.querySelector('#month + span'),
                                    errorMessage);

        removeErrorMessageAndStyle(document.querySelector('#year'), 
                                    document.querySelector('label[for="year"]'), 
                                    document.querySelector('#year + span'),
                                    errorMessage);
    } else if(day > currentDate.getDate()) {
        displayErrorMessageAndStyle(document.querySelector('#day'), 
                                    document.querySelector('label[for="day"]'), 
                                    document.querySelector('#day + span'),
                                    errorMessage);

        removeErrorMessageAndStyle(document.querySelector('#year'), 
                                    document.querySelector('label[for="year"]'), 
                                    document.querySelector('#year + span'),
                                    errorMessage);
    }
    return false;
  }

  return true;

}

function displayErrorMessageAndStyle(input, label, span, errorMessage) {

  if(!input.classList.contains('num-input-error')){
      input.classList.remove('num-input');
      input.classList.add('num-input-error');
    }
  if(!label.classList.contains('error-text-color'))
    label.classList.add('error-text-color');

  span.innerHTML = errorMessage;

  if(span.classList.contains('display-none'))
    span.classList.remove('display-none');

}

function removeErrorMessageAndStyle(input, label, span, errorMessage) {

  if(input.classList.contains('num-input-error')){
      input.classList.remove('num-input-error');
      input.classList.add('num-input');
    }
  if(label.classList.contains('error-text-color'))
    label.classList.remove('error-text-color');

  if(!span.classList.contains('display-none'))
    span.classList.add('display-none');

  span.innerHTML = '';

}

function addFormErrorGap() {
  if(!document.forms['birth-date'].classList.contains('form-gap-error')) {
    document.forms['birth-date'].classList.remove('form-gap');
    document.forms['birth-date'].classList.add('form-gap-error');
  }
}

function removeFormErrorGap() {
  if(document.forms['birth-date'].classList.contains('form-gap-error')) {
    document.forms['birth-date'].classList.remove('form-gap-error');
    document.forms['birth-date'].classList.add('form-gap');
  }
}

function submitForm() {

  const years = calculateYears();
  const months = calculateMonths();
  const days = calculateDays();

  displayResults(years, months, days);

}

function calculateYears() {

  let years = currentDate.getFullYear() - birthDate.getFullYear();

  if(currentDate.getMonth() < birthDate.getMonth()) {
    return years - 1;
  } else if((currentDate.getMonth() === birthDate.getMonth()) && (years > 0)) {
    if(currentDate.getDate() <= birthDate.getDate())
      return years - 1;

      return years;

  }

  return years;

}

function calculateMonths() {

  let months = (currentDate.getMonth() + 1) - (birthDate.getMonth() + 1);

  if(currentDate.getMonth() > birthDate.getMonth()) {

      if(currentDate.getDate() <= birthDate.getDate())
        return months - 1;

      return months;

  } else if(currentDate.getMonth() === birthDate.getMonth()) {

    if(currentDate.getDate() > birthDate.getDate())
      return 0;

    if((currentDate.getDate() === birthDate.getDate()) && (currentDate.getFullYear() === birthDate.getFullYear()))
      return 0;

    return 11;

  } else if(currentDate.getMonth() < birthDate.getMonth()) {

    if(currentDate.getDate() <= birthDate.getDate())
      return (12 + months) - 1

    return 12 + months;

  }

}

function calculateDays() {

  let days = currentDate.getDate() - birthDate.getDate();
  const previousMonthNumOfDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  if(currentDate.getDate() > birthDate.getDate())
    return days - 1;

  if(currentDate.getDate() <= birthDate.getDate()) {

    if((currentDate.getDate() === birthDate.getDate()) && 
    (currentDate.getMonth() === birthDate.getMonth()) &&
    (currentDate.getFullYear() === birthDate.getFullYear()))
      return 0;

    //console.log(new Date(currentDate.getFullYear(), currentDate.getMonth(), 0));
    return ((previousMonthNumOfDays - birthDate.getDate() - 1) + currentDate.getDate());

  }

  return '--';
}

let counter = 0;

function displayResults(years, months, days) {
  let animationFinished = true;
  if(!formSubmitDisabled) {
    disableForm();
  }


  if(counter <= years) {
    animationFinished = false;
    document.querySelector('.years').innerHTML = counter;
  }

  if(counter <= months) {
    animationFinished = false;
    document.querySelector('.months').innerHTML = counter;
  }

  if(counter <= days) {
    animationFinished = false;
    document.querySelector('.days').innerHTML = counter;
  }

  counter++;
  
  if(!animationFinished) {
    setTimeout(() => {
      displayResults(years, months, days);  
    }, 32);
  } else {
    counter = 0;
    enableForm();
  }
}

function disableForm() {
  formSubmitDisabled = true;
  document.forms['birth-date'].querySelectorAll('input').forEach(el => el.disabled = true);
  document.forms['birth-date'].querySelector('button').disabled = true;
}

function enableForm() {
  formSubmitDisabled = false;
  document.forms['birth-date'].querySelectorAll('input').forEach(el => el.disabled = false);
  document.forms['birth-date'].querySelector('button').disabled = false;
}