document.getElementById('loan-form').addEventListener('submit', function(e){
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1600);

  e.preventDefault();
});


function calculateResults(){
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const deadline = document.getElementById('deadline');
  const monthlyPay = document.getElementById('monthly-payment');
  const totalPay = document.getElementById('total-payment');
  const totalInter = document.getElementById('total-interest');

  // Vrednosti iz inputa kao number
    // Izracunati glavnicu
  const principal = parseFloat(amount.value);
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  const calcPay = parseFloat(deadline.value) * 12;

  // Formula za mesecno placanje
  const x = Math.pow(1 + calcInterest, calcPay);
  const monthly = (principal * x * calcInterest) / (x-1);

  if(isFinite(monthly)){
    monthlyPay.value = monthly.toFixed(2);
    totalPay.value = (monthly * calcPay).toFixed(2);
    totalInter.value = ((monthly * calcPay)-principal).toFixed(2);
    
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else{
    showError();
    document.getElementById('loading').style.display = 'none';
  }
}

function showError(){
  const card = document.querySelector('.card');
  const heading = document.querySelector('#heading');

  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert';
  alertDiv.appendChild(document.createTextNode('Molimo Vas proverite podatke'));
  card.insertBefore(alertDiv, heading);  

  document.getElementById('loan-form').addEventListener('click', removeAlert);
}

function removeAlert(){
  document.querySelector('.alert').remove();
}