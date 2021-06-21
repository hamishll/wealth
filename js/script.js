// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Globals
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
let salary = 0;
let savings = 0;
let band = 0;
let cumulativeSampleSize = 0;
let substring = "";
let string = "";
let x = 0;
let pillarsToFill = 0;
const data_full = [4,8,14,20,27,40,55,62,80,94,112,117,114,113,124,123,103,97,119,91,92,75,75,69,72,69,74,59,65,56,58,43,52,38,36,43,38,41,39,30,29,30,27,27,31,33,24,21,23,20,14,19,17,15,11,8,11,17,11,9,9,7,5,8,6,6,7,5,6,5,6,3,2,9,7,5,3,3,4,4,3,4,6,5,3,2,2,1,2,4,5,4,5,1,1,3,2,2,2,4,2,0,2,3,4,2,1];
const histogram = [4,8,14,20,27,40,55,62,80,94,112,117,114,113,124,123,103,97,119,91,92,75,75,69,72,69,74,59,65,56,58,43,52,38,36,43,38,41,39,30,29,30,27,27,31,33,24,21,23,20,14,19,17,15,11,8,11,17,11,9,9,7,5,8,6,6,7,5,6,5,6,3,2,9,7,5,3,3,4,4,3,4,6,5,3,2,2,1,2,4,5,4];
const histogram_sum = histogram.reduce((a, b) => a + b, 0);
const data = [863,1725,2588,3451,4314,5176,6039,6902,7764,8627,9130,9633,10137,10640,11143,11646,12149,12653,13156,13659,14173,14688,15202,15717,16231,16638,17044,17451,17857,18264,18624,18983,19343,19702,20062,20421,20781,21140,21500,21859,22278,22697,23116,23535,23954,24372,24791,25210,25629,26048,26467,26886,27305,27724,28143,28561,28980,29399,29818,30237,30778,31319,31859,32400,32941,33482,34023,34563,35104,35645,36315,36985,37655,38325,38995,39744,40493,41243,41992,42741,44027,45313,46598,47884,49170,50456,51742,53027,54313,55599,57599,61421,65244,69066,72888,76711,80533,84355,88178,92000];
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// DEPRECATED: Add commas to values
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
function addCommas(x) {
    x = x.replace(",","");
    salary = Number(x);
    //console.log(salary);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Salary: Slider event listener
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
document.getElementById('salarySlider').addEventListener("input", function(event) {
    salary = this.value;
    document.getElementById('salary').value = salary;
    updateSalary(salary);
});
document.getElementById('savingsSlider').addEventListener("input", function(event) {
    savings = this.value;
    document.getElementById('savings').value = savings;
    //updateSalary(salary);
});
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Salary: Typed value event listener 
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
document.getElementById('salary').addEventListener("keyup", function(event) {
    updateSalary();
});
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Salary: Compute values
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
function updateSalary(salary) {
    cumulativeSampleSize = 0;
    document.getElementById('salary').style.animation = "none";
    document.getElementById('salarySlider').value = salary;

    // Work out what percentile the user is in
    if (salary >= 92000) {
        userPercentile = 99;
    }
    else if (salary < 863){
        userPercentile = 0;
    }
    else {
        for (j=0; j<100; j++) {
            if (salary < data[j]) {
                userPercentile = j;
                updatePillars();
                break
            }
            else {}
        }
    }    
    document.getElementById('user-percentile').textContent = "" + userPercentile + "%";
    
    // then work out how many pillars in the histogram to update
    x = 0;
    pillarsToFill = 0;
    for (i=0; i<histogram.length; i++) {
        x = x + histogram[i];
        if ((x / histogram_sum) < (userPercentile / 100)) {
            pillarsToFill = i;
        }
        else {};
    }
    // then updatePillars
    updatePillars();

    if (salary > 1) {
        revealBlock(document.getElementById('salary-comparison'));
    };
}
    
function updatePillars() {
    let  n = 0;
    pillars.forEach(item => {
        n++;
        if (n < pillarsToFill) {
            item.style.opacity = 1;
            item.style.background = "var(--primary)";
            item.style.transitionDelay = ""+(0.0*j)+"s";
        }
        else {
            item.style.transitionDelay = ""+(0.0*j)+"s";
            item.style.opacity = 1;
            item.style.background = "var(--text2)";
        }
    }); 
}



// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Savings: Typed value event listener 
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
document.getElementById('savings').addEventListener("keyup", function(event) {
    updateSavings(this);
    revealBlock(document.getElementById('savings-comparison'));
    document.getElementById('savings').style.animation = "none";
});
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Savings: Update values
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
function updateSavings(item) {
    savings = item.value;
};

// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Scroll event listener
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
let last_known_scroll_position = 0;
let ticking = false;
let savings_triggered = false;
let tips_triggered = false;

document.getElementById("main").addEventListener("scroll", function(e) { 
last_known_scroll_position = e.target.scrollTop;
if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
    ticking = true;
  }

});

// document.addEventListener('scroll', function(e) {
//   last_known_scroll_position = window.scrollY;

// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Scroll triggers
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
function doSomething(scrollPos) {
    //console.log(scrollPos);
    if (scrollPos > 100 && salary > 0 && !savings_triggered) {
        revealBlock(document.getElementById('savings-prompt'));
        savings_triggered = true;
    }
    else if (scrollPos > 200 && savings > 0 && !tips_triggered) {
        revealBlock(document.getElementById('tips'));
    }
  }

// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Reveal blocks
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
function revealBlock(item) {
    for (let i = 1; i < item.childNodes.length; i+= 2) {
        item.childNodes[i].style.display = "block";
        item.childNodes[i].classList.add('reveal-text');
        // item.childNodes[i].style.animationDelay = i*1;
        item.childNodes[i].style.opacity = 1;
    }
}

// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Render bars on page load
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
for (var i = 0; i < data.length; i+=1) {
    substring = "<div class='percentile' style='height: "+data_full[i]+"px'></div>"
    string = string + substring;
}
document.getElementById('salary-distribution').innerHTML = string;
const pillars = document.querySelectorAll('.percentile');
