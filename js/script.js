// Variables
const Username = document.getElementById("name");
const email = document.getElementById("email");
const cardNum = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const CVV = document.getElementById("cvv");
const form = document.getElementsByTagName("form")[0];
const jobRole = document.getElementById("title");
const otherRole = document.getElementById("other-job-role");
const design = document.getElementById("design");
const color = document.getElementById("color");
const colorOption = color.children;
const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
let total = 0;
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const activityCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]');
const activityBorder = document.getElementById("activities-box");


// inital setup
Username.focus();

// Hides other slot by default
otherRole.style.display = "none";

// Shows other slot when other is sellected
jobRole.onchange = function() {
    if (jobRole.value === "other") {
        otherRole.style.display = "";
    } else {
        otherRole.style.display = "none";
    }
}

color.disabled = true;

design.addEventListener("change", (e) => {
    color.disabled = false;
    for(let i = 0; i < colorOption.length; i++) {
        let targetValue = e.target.value;
        let dataTheme = colorOption[i].getAttribute("data-theme")

        if (targetValue == dataTheme) {
            colorOption[i].hidden = false;
            colorOption[i].selected = true;
        } else {
            colorOption[i].hidden = true;
            colorOption[i].selected = false;
        }
    }
});

activities.addEventListener("change", (e) => {
    let cost = parseInt(e.target.getAttribute("data-cost"));
    if (e.target.checked) {
        total += cost;
    } else {
        total -= cost;
    }
    activitiesCost.innerHTML = "Total: $" + total; 
});

// Hides paypal and bitcoin payment methods by default

paypal.hidden = true;
bitcoin.hidden = true;

payment.children[1].setAttribute("selected", true);

// Shows correct payment method based on change in the selection

payment.addEventListener("change", (e) => {
    if (payment.value === paypal.id) {
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;
    }

    if (payment.value === bitcoin.id) {
        paypal.hidden = true;
        bitcoin.hidden = false;
        creditCard.hidden = true;
    }

    if (payment.value === creditCard.id) {
        paypal.hidden = true;
        bitcoin.hidden = true;
        creditCard.hidden = false;
    }
});

// Checks to see if values entered are valid

form.addEventListener("submit", (e) => {
    let nameValue = Username.value;
    let emailValue = email.value;
    let cardValue = cardNum.value;
    let zipValue = zipCode.value;
    let cvvValue = CVV.value;
    const activitiesValue = isFieldsetValid(activities);
    

    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardRegex = /^\d{13,16}$/;
    const zipRegex = /^\d{5}$/;
    const cvvRegex = /^\d{3}$/;

    if(!nameRegex.test(nameValue)) {
        e.preventDefault();
        Username.parentElement.classList.add("not-valid");
        Username.parentElement.classList.remove("valid");
        Username.parentElement.lastElementChild.style.display = "block";
    } else {
        Username.parentElement.classList.remove("not-valid");
        Username.parentElement.classList.add("valid");
        Username.parentElement.lastElementChild.style.display = "none";
    }

    if (!emailRegex.test(emailValue)) {
        e.preventDefault();
        email.parentElement.classList.add("not-valid");
        email.parentElement.classList.remove("valid");
        email.parentElement.lastElementChild.style.display = "block";
    } else {
        email.parentElement.classList.remove("not-valid");
        email.parentElement.classList.add("valid");
        email.parentElement.lastElementChild.style.display = "none";
    }
    
    if (!cardRegex.test(cardValue) && payment.value == "credit-card") {
        e.preventDefault();
        cardNum.parentElement.classList.add("not-valid");
        cardNum.parentElement.classList.remove("valid");
        cardNum.parentElement.lastElementChild.style.display = "block";
    } else {
        cardNum.parentElement.classList.remove("not-valid");
        cardNum.parentElement.classList.add("valid");
        cardNum.parentElement.lastElementChild.style.display = "none";
    }

    if (!zipRegex.test(zipValue) && payment.value == "credit-card") {
        e.preventDefault();
        zipCode.parentElement.classList.add("not-valid");
        zipCode.parentElement.classList.remove("valid");
        zipCode.parentElement.lastElementChild.style.display = "block";
    } else {
        zipCode.parentElement.classList.remove("not-valid");
        zipCode.parentElement.classList.add("valid");
        zipCode.parentElement.lastElementChild.style.display = "none";
    }

    if (!cvvRegex.test(cvvValue) && payment.value == "credit-card") {
        e.preventDefault();
        CVV.parentElement.classList.add("not-valid");
        CVV.parentElement.classList.remove("valid");
        CVV.parentElement.lastElementChild.style.display = "block";
    } else {
        CVV.parentElement.classList.remove("not-valid");
        CVV.parentElement.classList.add("valid");
        CVV.parentElement.lastElementChild.style.display = "none";
    }

   if (activitiesValue === false) {
    e.preventDefault();
    activities.classList.add("not-valid");
    activities.classList.remove("valid");
    activities.lastElementChild.style.display = "block";
   } else {
    activities.classList.remove("not-valid");
    activities.classList.add("valid");
    activities.lastElementChild.style.display = "none";
   }   
});

// Check fieldset function

function isFieldsetValid(fieldset) {
    const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        console.log("passed");
        return true; 
      }
    }
    console.log("failed");
    return false; 
  }

for (let i = 0; i < activityCheckboxes.length;  i++) {
    activityCheckboxes[i].addEventListener("focus", (e) => {
        e.target.parentElement.classList.add('focus');
    });

    activityCheckboxes[i].addEventListener("blur", (e) => {
        e.target.parentElement.classList.remove('focus');
    });
}