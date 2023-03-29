

// You Are currently on section 8 and validating the cardnaumber


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
        console.log(targetValue);
        console.log(dataTheme);

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

paypal.hidden = true;
bitcoin.hidden = true;

payment.children[1].setAttribute("selected", true);

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

form.addEventListener("submit", (e) => {
    let nameValue = Username.value;
    let emailValue = email.value;
    const activitiesValue = isFieldsetValid(activities);
    

    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!nameRegex.test(nameValue)) {
        e.preventDefault();
    } 

    if (!emailRegex.test(emailValue)) {
        e.preventDefault();
    }

   if (activitiesValue === false) {
    e.preventDefault();
   }
    
});

// Check fieldset function

function isFieldsetValid(fieldset) {
    const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        return true; 
      }
    }
    return false; 
  }