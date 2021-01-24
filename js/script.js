// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Globals
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
let salary = 0;
let band = 0;
let cumulativeSampleSize = 0;
let substring = "";
let string = "";
const data_full = [62,94,112,117,114,113,124,123,103,97,119,91,92,75,75,69,72,69,74,59,65,56,58,43,52,38,36,43,38,41,39,30,29,30,27,27,31,33,24,21,23,20,14,19,17,15,11,8,11,17,11,9,9,7,5,8,6,6,7,5,6,5,6,3,2,9,7,5,3,3,4,4,3,4,6,5,3,2,2,1,2,4,5,4,5,1,1,3,2,2,2,4,2,0,2,3,4,2,1];
const data = [62,94,112,117,114,113,124,123,103,97,119,91,92,75,75,69,72,69,74,59,65,56,58,43,52,38,36,43,38,41,39,30,29,30,27,27,31,33,24,21,23,20,14,19,17,15,11,8,11,17,11,9,9,7,5,8,6,6,7,5,6,5,6,3,2,9,7,5,3,3,4,4];
const data_full_total = 2975;
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Add commas to values
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
// Slider event listener
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
document.getElementById('salarySlider').addEventListener("change", function(event) {
    salary = this.value;
    document.getElementById('salary').value = salary;
    updateSalary();
});
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Typed value event listener 
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
document.getElementById('salarySlider').addEventListener("change", function(event) {
    updateSalary();
});

function updateSalary() {
    d = 0.05;
    s = 11000;
    cumulativeSampleSize = 0;
    document.getElementById('salary').style.animation = "none";
    salary = Number(event.target.value.replace(",",""));
    band = (salary-s)/890;
    for (j=0; j<band; j++) {
        cumulativeSampleSize = cumulativeSampleSize + data_full[j];
    }
    if (salary >= 100000) {
        userPercentile = 99;
    }
    else if (salary < 1){
        userPercentile = 0;
    }
    else {
        userPercentile = Math.round(cumulativeSampleSize/data_full_total*100)-1;
    }    
    document.getElementById('user-percentile').textContent = "" + userPercentile + "%";
    

    //event.target.value = addCommas(event.target.value);
    
    document.querySelectorAll('.percentile').forEach(item => {
        s = s + 890;
        d = d + 0.01;
        if (salary > s) {
            item.style.opacity = 1;
            item.style.background = "var(--accent1)";
            item.style.transitionDelay = ""+d+"s";
        }
        else if (salary > 10000) {
            item.style.transitionDelay = ""+d+"s";
            item.style.opacity = 1;
            item.style.background = "var(--text2)";
        }
        else {
            item.style.background = "var(--text2)";
        };
    });
    if (salary > 10000) {
        revealBlock(document.getElementById('salary-comparison'));
    };
};
// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Scroll event listener
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
let last_known_scroll_position = 0;
let ticking = false;
let triggered = false;

function doSomething(scrollPos) {
    //console.log(scrollPos);
    if (scrollPos > 75 && salary > 0 && !triggered) {
        revealBlock(document.getElementById('savings-prompt'));
        triggered = true;
    }
  }

document.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Reveal blocks
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
function revealBlock(item) {
    for (let i = 1; i < item.childNodes.length; i+= 2) {
        item.childNodes[i].style.display = "block";
        item.childNodes[i].classList.add('reveal-text');
        item.childNodes[i].style.opacity = 1;
    }
}

// `````````````````````````````````````````````````````````````````````````````````````````````````````````````````
// Render bars on page load
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
for (var i = 0; i < data.length; i+=1) {
    substring = "<div class='percentile' style='height: "+data[i]+"px'></div>"
    string = string + substring;
}
document.getElementById('salary-distribution').innerHTML = string;

