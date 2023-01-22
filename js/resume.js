// Check LoggedIn 

const loggedIn = sessionStorage.getItem("userLoggedIn");

function checkLogin(loggedIn) {
    if (!loggedIn) {
        window.location.replace("/");
    }
}

checkLogin(loggedIn);

// Resume JS 
var resumeArrayId = 0; // Default 
var prevBtnDiv = document.getElementById('PrevResumeButton');
var nextBtnDiv = document.getElementById('NextResumeButton');
var searchedArrayId = 0; // Searching 
var searchingChecked = false;
var resId = 0;
var datalenght = 0;


// Fetching Data from JSON 
async function fetchData() {

    // Fatching Data from JSON
    const response = await fetch('../data/data.json');
    const resumeData = await response.json();
    const finalResumeData = resumeData.resume;

    return finalResumeData;
}

// Fetched Data from JSON 
const fetchedData = await fetchData();


// Display Data Function 
async function displayData(finalResumeData, dataid) {

    //Fatching Data from JSON
    //const response = await fetch('../data/Data.json');
    //const resumeData = await response.json();

    //const finalResumeData = await fetchData();
    // const finalResumeData = resumeData.resume;

    const templateDiv = document.getElementById('resumeTemplate');
    const personResume = finalResumeData[dataid];

    if (personResume != undefined) {
        // Divide Json Object to Arrays
        const personalInfo = personResume.basics;
        const userSkills = personResume.skills;
        const previousWork = personResume.work;
        const internship = personResume.Internship;
        const projects = personResume.projects;
        const education = personResume.education;
        const achievements = personResume.achievements;
        const interests = personResume.interests;

        // Show Template 
        const templ = template(personalInfo, userSkills, previousWork, internship, projects, education, achievements, interests);
        templateDiv.innerHTML = templ;
        prevResumeButtonToogle();
        nextResumeButtonToogle();

    } else {
        templateDiv.innerHTML = errorTemplate();
    }

}

// Display Default Data
displayData(fetchedData, resumeArrayId);


// Setting up button Click Data Configuartion 
function buttonConfig() {
    if (searchingChecked) {
        resId = searchedArrayId + 1;
        datalenght = finalSearchedarray.length;
    } else {
        resId = resumeArrayId + 1;
        datalenght = fetchedData.length;
    }
}


//Prev Button Toogle 
function prevResumeButtonToogle() {
    if (searchingChecked) {
        if (searchedArrayId <= 0) {
            prevBtnDiv.innerHTML = ""
        }
        else {
            prevBtnDiv.innerHTML = `<button class="btn btn-primary" id="prevButton">Search Prev</button>`;
        }
    }
    else {
        if (resumeArrayId <= 0) {
            prevBtnDiv.innerHTML = ""
        }
        else {
            prevBtnDiv.innerHTML = `<button class="btn btn-primary" id="prevButton">Prev</button>`;
        }
    }
}

//Next Button Toogle 
function nextResumeButtonToogle() {
    buttonConfig();

    if (searchingChecked) {
        if (resId == datalenght) {
            nextBtnDiv.innerHTML = "";
        }
        else {
            nextBtnDiv.innerHTML = `<button class="btn btn-primary" id="nextButton">Search Next</button>`;
        }
    } else {

        if (resId == datalenght) {
            nextBtnDiv.innerHTML = "";
        }
        else {
            nextBtnDiv.innerHTML = `<button class="btn btn-primary" id="nextButton">Next</button>`;
        }
    }
}

// Setting up data for Next Resume 
function nextResume() {
    if (searchingChecked) {
        ++searchedArrayId;
        displayData(finalSearchedarray, searchedArrayId);
    } else {
        ++resumeArrayId;
        displayData(fetchedData, resumeArrayId);
    }
}

// On Click of Next >> Add Event Listner 
nextBtnDiv.addEventListener('click', async () => {
    buttonConfig();
    if (resId == datalenght) {

    } else {
        nextResume();
    }
})

// Setting up data for Prev Resume 
function preResume() {
    if (searchingChecked) {
        --searchedArrayId;
        displayData(finalSearchedarray, searchedArrayId);
    } else {
        --resumeArrayId;
        displayData(fetchedData, resumeArrayId);
    }
}


// On Click Of Button > Add Event Listner 
prevBtnDiv.addEventListener('click', () => {
    if (searchingChecked) {
        if (searchedArrayId <= 0) {

        } else {
            preResume();
        }
    } else {
        if (resumeArrayId <= 0) {

        } else {
            preResume();
        }
    }
})




// SEARCHING

// Array of Searching Data 
var finalSearchedarray = [];

//Funtion of Searching 
function searching(searchValve) {

    finalSearchedarray = [];

    for (const key in fetchedData) {
        const singleArray = fetchedData[key];
        //console.log(singleArray);
        //console.log(singleArray.basics.AppliedFor);
        var applied = singleArray.basics.AppliedFor;

        applied = applied.toLowerCase();
        searchValve = searchValve.toLowerCase();
        // console.log(applied.search(searchValve));
        var searchheck = applied.search(searchValve);
        // if (applied == searchValve) {
        //     finalarray.push(singleArray);
        // }

        if (searchheck >= 0) {
            finalSearchedarray.push(singleArray);
        }




    }

    // console.log(finalSearchedarray);

    return finalSearchedarray;
}

// On Input,  searching will called ... 
document.getElementById('searchText').addEventListener('input', () => {
    var searchValve = document.getElementById('searchText').value;
    //console.log(searchValve);
    if (searchValve != "") {
        searchingChecked = true;
        const searchArray = searching(searchValve);
        displayData(searchArray, searchedArrayId);

    } else {
        searchedArrayId = 0;
        resumeArrayId = 0;
        searchingChecked = false;
        displayData(fetchedData, resumeArrayId);
    }
});





// Creating HTML Template of resume  
function template(personalInfo, userSkills, previousWork, internship, projects, education, achievements, interests) {
    const Userprofile = personalInfo.profiles;
    const userLocation = personalInfo.location;
    const userSkillKeywords = userSkills.keywords;
    const userInterest = interests.hobbies;
    const achievementsSummary = achievements.Summary;

    const template = `<div class="container">
<div class="row justify-content-center">
   <div class="col-12 col-sm-12 col-md-12  col-lg-9 col-xl-9 col-xxl-9 resumeTemplate">
       <div class="row resumeTempMainHeader">
           <div class="col-12 col-sm-3 col-md-3  col-lg-2 col-xl-2 col-xxl-2 resumeImg">
               <img src="${personalInfo.image}" alt="" class="img-fluid ">
           </div>
           <div
               class="col-12 col-sm-9 col-md-9  col-lg-10 col-xl-10 col-xxl-10 text-center resumeTempMainHeaderText">
               <h3>${personalInfo.name}</h3>
               <p>Applied For : ${personalInfo.AppliedFor} </p>
           </div>
       </div>

       <div class="row">
           <div class="col-12 col-sm-12 col-md-12  col-lg-4 col-xl-4 col-xxl-4">
               <div class="row resumeRight">
                   <div class="resumeRightSecT">
                       <p>Personal Information</p>
                   </div>
                   <div class="resumeRightSecDes">
                       <p>${personalInfo.phone}</p>
                       <p>${personalInfo.email}</p>
                       <p><a href="${Userprofile.url}">${Userprofile.network}</a></p>
                   </div>

                   <div class="resumeRightSecT">
                       <p>Address </p>
                   </div>
                   <div class="resumeRightSecDes">
                       <p>${userLocation.address}, ${userLocation.city} ${userLocation.state}, ${userLocation.postalCode}</p>

                   </div>

                   <div class="resumeRightSecT">
                       <p>Technical Skills </p>
                   </div>
                   <div class="resumeRightSecDes">
                       <p>Name : ${userSkills.name}</p>
                       <p>Level : ${userSkills.level}</p>
                       <p>Skills : ${returnArrayData('', userSkillKeywords, ',')}</p>
                   </div>

                   <div class="resumeRightSecT">
                       <p>Hobbies</p>
                   </div>
                   <div class="resumeRightSecDes">
                       <p>${returnArrayData('', userInterest, '<br>')}</p>
                   </div>
               </div>
           </div>

           <div class="col-12 col-sm-12 col-md-12  col-lg-8 col-xl-8 col-xxl-8">

               <div class="resumeLeft">
               <div class="row">
                   <h4>Work Experience in Previous Company</h4>
                   <div class="resumeLeftSecDes">
                       <ul>
                           ${returnArrayLoop(previousWork)}
                       </ul>
                   </div>

               </div>

               <div class="row">
                   <h4>Projects</h4>
                   <div class="resumeLeftSecDes">
                       <ul>
                        ${returnArrayLoop(projects)}
                       </ul>
                   </div>

               </div>

               <div class="row">
                   <h4>Education</h4>
                   <div class="resumeLeftSecDes listStyledot">
                       <ul>
                           ${educationData(education)}
                       </ul>
                   </div>

               </div>

               <div class="row">
                   <h4>InternShip</h4>
                   <div class="resumeLeftSecDes listStyledot">
                       <ul>
                       ${returnArrayLoop(internship)}
                       </ul>
                   </div>

               </div>

               <div class="row">
                   <h4>Achievements</h4>
                   <div class="resumeLeftSecDes listStyledot">
                       <ul>
                          ${returnArrayData('<li>', achievementsSummary, '</li>')}
                       </ul>
                   </div>

               </div>
           </div>
           </div>
       </div>
   </div>
</div>
</div>`

    return template;

}



//For Direct List Format 
function returnArrayData(frontHtmlTag, array, lastHtmlTag) {
    var arrayData = "";
    for (var i = 0; i < array.length; i++) {
        arrayData += frontHtmlTag + '' + array[i] + '' + lastHtmlTag;
    }
    return arrayData;
}

// For Key and Value Pair List Format 
function returnArrayLoop(array) {
    var arrayData = "";
    for (const key in array) {
        arrayData += `<li><span>${key} </span> : ${array[key]}</li>`;
    }

    return arrayData;
}


// Education Data 
function educationData(array) {
    var headData = "";

    for (const key in array) {
        var description = "";
        headData += `<li><span>${key} </span> :`;
        for (const keySecond in array[key]) {
            const desArray = array[key];
            description += ` ${desArray[keySecond]}, `;
        }



        headData += ` ${description} </li>`;
    }

    return headData;
}


// Error Template If No Data Found 
function errorTemplate() {
    var errorHtml = `<div class="container">
    <div class="row justify-content-center">
        <div class="col-12 col-sm-12 col-md-12  col-lg-5 col-xl-5 col-xxl-5 errorTemplate text-center">
            <span><i class="fa-solid fa-face-frown"></i></span> 
            <p>No Such Result Found !!</p>
        </div>
    </div>
</div>`

    return errorHtml;
}




