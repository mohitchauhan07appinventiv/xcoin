function nextToUdp(prop) {
    document.getElementById(prop).scrollIntoView();
}
var num_field_1 = document.getElementById("number1"),
    num_field_2 = document.getElementById("number2"),
    num_field_3 = document.getElementById("number3"),
    num_field_4 = document.getElementById("lastInput");

num_field_1.onkeyup = function () {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        num_field_2.focus();
    }
}

num_field_2.onkeyup = function () {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        num_field_3.focus();
    }
}
num_field_3.onkeyup = function () {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        num_field_4.focus();
    }
}

var oXHR = new XMLHttpRequest();

// Initiate request.
oXHR.onreadystatechange = reportStatus;
oXHR.open("GET", "data.json", true);  // get json file.
oXHR.send();

function reportStatus() {
    if (oXHR.readyState == 4) {		// Check if request is complete.
        createCountryNameList(this.responseText)
        createCountryCodeList(this.responseText, 'cncode')
        createCountryCodeList(this.responseText, 'cncode2')
    }
}


function createCountryNameList(jsonData) {
    var data = JSON.parse(jsonData);
    // console.log(data.data.length);
    var select = document.getElementById('country_select');

    var option = document.createElement('option');
    option.text = getFlagEmoji(data.data[229].iso_code) + Array(4).fill('\xa0').join('') + data.data[229].name;
    select.add(option);
    for (var i = 0; i < data.data.length; i++) {
        var option = document.createElement('option');
        option.text = getFlagEmoji(data.data[i].iso_code) + Array(5).fill('\xa0').join('') + data.data[i].name;
        option.value = data.data[i].name;
        select.add(option);
    }
}
function createCountryCodeList(jsonData, id) {
    var data = JSON.parse(jsonData);
    var select = document.getElementById(id);

    var option = document.createElement('option');
    option.text = getFlagEmoji(data.data[102].iso_code) + Array(4).fill('\xa0').join('') + data.data[102].iso_code + Array(4).fill('\xa0').join('') + data.data[102].phone_code;
    option.value = data.data[80].phone_code;
    select.add(option);
    for (var i = 0; i < data.data.length; i++) {
        var option = document.createElement('option');
        option.text = getFlagEmoji(data.data[i].iso_code) + Array(4).fill('\xa0').join('') + data.data[i].iso_code + Array(4).fill('\xa0').join('') + data.data[i].phone_code;
        option.value = data.data[i].phone_code;
        select.add(option);

    }
}
function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt()); //remove 0
    return String.fromCodePoint(...codePoints);
}
var licenceNumberlength;
function changeLabels() {
    var x = document.getElementById('chooseMethod').selectedIndex;
    switch (x) {
        case 1: {
            document.getElementById('frontPhoto').innerHTML = 'Voter ID front photo<span class="required"> *</span>';
            document.getElementById('backPhoto').innerHTML = 'Voter ID back photo<span class="required"> *</span>';
            document.getElementById('licenceNumber').innerHTML = 'Voter ID number<span class="required"> *</span>';
            document.getElementById('authNum').placeholder='Enter Voter ID number';
            licenceNumberlength = 6;
            break;
        }
        case 2: {
            document.getElementById('frontPhoto').innerHTML = 'Pan Card front photo<span class="required"> *</span>';
            document.getElementById('backPhoto').innerHTML = 'Pan Card back photo<span class="required"> *</span>';
            document.getElementById('licenceNumber').innerHTML = 'Pan Card number<span class="required"> *</span>';
            licenceNumberlength = 10;
            document.getElementById('authNum').placeholder='Enter Pan Card number';
            break;
        }
        case 3: {
            document.getElementById('frontPhoto').innerHTML = 'Aadhaar Card front photo<span class="required"> *</span>';
            document.getElementById('backPhoto').innerHTML = 'Aadhaar Card back photo<span class="required"> *</span>';
            document.getElementById('licenceNumber').innerHTML = 'Aadhaar Card number<span class="required"> *</span>';
            licenceNumberlength = 12;
            document.getElementById('authNum').placeholder='Enter Aadhar Card number';
            break;
        }
    }
}
function errorEffect(data, id) {
    data.style.border = '1px solid rgba(208, 2, 27, 0.3)';
    data.style.boxShadow = '0 0 15px 0 rgb(208 2 27 / 20%)';
    data.style.backgroundColor = 'white';
    document.getElementById(id).style.visibility = "visible";
    return false;
}
function afterErrorEffect(data, id) {
    data.style.border = "solid 1px var(--cerulean-30)";
    data.style.boxShadow = "0 0 15px 0 rgb(0 156 222 / 20%)";
    data.style.backgroundColor = 'white';
    document.getElementById(id).style.visibility = "hidden";
    return true;
}
function changeLanguage() {
    var select = document.getElementById('change_language').selectedIndex;
    if (select === 1) document.getElementById('flagImg').setAttribute("src", 'assets/images/india.svg');
    else if (select === 2) document.getElementById('flagImg').setAttribute("src", 'assets/images/russia.svg')
    else document.getElementById('flagImg').setAttribute("src", 'assets/images/usa.svg')
}

function checkvalid(data, prop) {
    if (prop == 'firstName') {
        if (data.value.length < 1 || data.value.length > 10) {
           return errorEffect(data, "firstNameError");
        } else {
            return afterErrorEffect(data, "firstNameError");
        }
    }
    else if (prop == 'lastName') {
        if (data.value.length < 1 || data.value.length > 10) {
           return errorEffect(data, "lastNameError");
        } else {
            return afterErrorEffect(data, "lastNameError");
        }
    }
    else if (prop == 'email') {
        const emailvalidregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(data.value);

        if (!emailvalidregex) {
          return errorEffect(data, "emailError");
        } else {
           return afterErrorEffect(data, 'emailError')
        }
    }
    else if (prop == 'password') {
        const passvalidregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(data.value);
        if (!passvalidregex) {
            return errorEffect(data, 'passwordError')
        } else {
            return afterErrorEffect(data, 'passwordError')
        }
    } else if (prop == 'recaptcha') {
        if (data.length == 0) {
            document.getElementById('recaptchaError').style.visibility = "visible";
            return false;
        } else {
            document.getElementById('recaptchaError').style.visibility = "hidden";
            return true;
        }
    } else if (prop == 'terms') {
        if (!data.checked) {
            document.getElementById('terms_section1_error').style.visibility = 'visible';
            return false;
        } else {
            document.getElementById('terms_section1_error').style.visibility = 'hidden';
            return true;
        }

    } else if (prop == 'country_select') {
        return data.value;
    } else if (prop == 'fladdress') {
        if (data.value.length < 1 || data.value.length > 15) {
            return errorEffect(data,'fladdressError');
        } else {
            return afterErrorEffect(data,'fladdressError');
        }
    } else if (prop == 'sladdress') {
        if (data.value.length < 1 || data.value.length > 15) {
            return errorEffect(data,'sladdressError');
        } else {
           return afterErrorEffect(data,'sladdressError')
        }
    } else if (prop == 'state') {
        if (data.value.length < 1 || data.value.length > 10) {
            return errorEffect(data, 'stateError');
        } else {
            return afterErrorEffect(data, 'stateError')
        }
    } else if (prop == 'city') {
        if (data.value.length < 1 || data.value.length > 10) {
            return errorEffect(data, 'cityError');
        } else {
           return afterErrorEffect(data, 'cityError')
        }
    } else if (prop == 'zip') {
        if (data.value.length < 1 || data.value.length > 6) {
            return errorEffect(data, 'zipError');
        } else {
            return afterErrorEffect(data, 'zipError')
        }
    } else if (prop == 'phoneNumberInput') {
        if (data.value.length < 1 || data.value.length > 10) {
            return errorEffect(data, 'phoneNumberInputError');
        } else {
            return afterErrorEffect(data, 'phoneNumberInputError');
        }
    }
}
// function onfocusout(data){
//     data.addEventListener("focus", function () {
//         this.style.backgroundColor = "var(--cerulean-005)";
//         this.style.border='none';
//         this.style.boxShadow='none'
//     });
// }
function reverseCss(data, prop) {
    if (checkvalid(data, prop)) {
        data.style.backgroundColor = "var(--cerulean-005)";
        data.style.border = 'none';
        data.style.boxShadow = 'none'
    }
}

function verifyAll() {

    var fn = document.getElementById('firstName');
    var ln = document.getElementById('lastName');
    var em = document.getElementById('email');
    var pw = document.getElementById('password');
    var tm = document.getElementById('section_1_terms');
    var re = grecaptcha.getResponse();

    var con1 = checkvalid(fn, 'firstName');
    var con2 = checkvalid(ln, 'lastName');
    var con3 = checkvalid(em, 'email');
    var con4 = checkvalid(pw, 'password');
    var con5 = checkvalid(tm, 'terms');
    var con6 = checkvalid(re, 'recaptcha');

    if (!con1) {
        console.log("int con1")
    } else if (!con2) {
        console.log("int con2")

    } else if (!con3) {
        console.log("int con3")

    } else if (!con4) {
        console.log("int con4")

    } else if (!con5) {
        // console.log("int con5"+con5);

    } else if (!con6) {
        console.log("int con6")

    } else {
        var obj = {
            firstName: fn.value,
            lastName: ln.value,
            email: em.value,
            password: pw.value,
            terms: tm.value,
            recaptch: re ? true : false
        }
        alert(JSON.stringify(obj, null, 6));
        console.log("successfull");
        nextToUdp('onBoarding01UDP');
    }
}
var globalPhone = 0;
function verifyAllSection3(){
    var fla = document.getElementById('fladdress');
    var sla = document.getElementById('sladdress');
    var state = document.getElementById('state');
    var city = document.getElementById('city');
    var zip = document.getElementById('zip');
    var cn = document.getElementById('country_select')
    var cncode = document.getElementById('cncode');
    var phone = document.getElementById('phoneNumberInput');

    var con1 = checkvalid(fla, 'fladdress');
    var con2 = checkvalid(sla, 'sladdress');
    var con3 = checkvalid(state, 'state');
    var con4 = checkvalid(city, 'city');
    var con5 = checkvalid(zip, 'zip');
    var con6 = 'true';
    var con7 = checkvalid(phone, 'phoneNumberInput');
    console.log(con1,con2, con3, con4, con5, con6, con7);

    if (!con1) {
        console.log("int con1")
    } else if (!con2) {
        console.log("int con2")

    } else if (!con3) {
        console.log("int con3")

    } else if (!con4) {
        console.log("int con4")

    } else if (!con5) {
        // console.log("int con5"+con5);

    } else if (!con6) {
        console.log("int con6")

    } else {
        var obj = {
            country:cn.value,
            firstLineAddress:fla.value,
            secondLineAddress:sla.value,
            state:state.value,
            city:city.value,
            zip:zip.value,
            countryCode:cncode.value,
            phoneNumber:phone.value            
        }
        alert(JSON.stringify(obj, null, 6));
        globalPhone=obj.phoneNumber;
        console.log("successfull");
        document.getElementsByClassName('sp_number_text')[0].innerHTML=globalPhone;
        nextToUdp('onBoarding03');
    }
}
function resendCode(prop, errorId, redirectTo ,inputEleID) {
    if(prop=='verify'){
        var sentCode = 1234567;
        var inputCodeElement = document.getElementById(inputEleID);
        if(sentCode==inputCodeElement.value){
            afterErrorEffect(inputCodeElement,errorId);
            setTimeout(() => {  alert('OTP Verified Successfully');
                nextToUdp(redirectTo);
            }, 500);
            
        }else{
            errorEffect(inputCodeElement, errorId);
        }

    }else{
        var digitsArray4 = document.getElementsByClassName("otp_number_input");
        var fieldCode = num_field_1.value + num_field_2.value + num_field_3.value + num_field_4.value + '';
        console.log(fieldCode);
    
        var sentCode = '1234';
        if (fieldCode === sentCode) {
            document.getElementById('resendCode-errorMessage').innerHTML = "<p></p>"
            for (var i = 0; i < digitsArray4.length; i++) {
                digitsArray4[i].style.border = '1px solid rgba(0, 156, 222, 0.5)';
                digitsArray4[i].style.removeProperty('box-shadow');
                digitsArray4[i].style.backgroundColor = 'rgba(0, 156, 222, 0.5);';
            }
            alert("OTP Verified Successfully");
            document.getElementById('onBoarding02').scrollIntoView();
        } else {
            var errorMessage = document.getElementById('resendCode-errorMessage');
            errorMessage.innerHTML = "<p>Invalid Code Try Again</p>"
            errorMessage.style.textAlign = "center"
            for (var i = 0; i < digitsArray4.length; i++) {
                digitsArray4[i].style.border = '1px solid rgba(208,2,27,0.3)';
                digitsArray4[i].style.boxShadow = '0 0 15px 0 rgba(208 2 27 / 20%)';
                digitsArray4[i].style.backgroundColor = '#ffffff';
            }
        }
    }
}

function changeGlobalNo(focusTo, errorTo){
    if(document.getElementById(errorTo).value.length ==10 ){
        globalPhone=document.getElementById(errorTo).value;
        document.getElementsByClassName('sp_number_text')[0].innerHTML=globalPhone;
        document.getElementById(errorTo).style.border='1px solid rgba(0, 156, 222, 0.5)';
        document.getElementById(errorTo).style.removeProperty("box-shadow");
        document.getElementById(errorTo).style.backgroundColor='rgba(0, 156, 222, 0.5);';
        document.getElementById(focusTo).focus();
    }else{
        document.getElementById(errorTo).style.border='1px solid rgba(208,2,27,0.3)';
        document.getElementById(errorTo).style.boxShadow='0 0 15px 0 rgba(208 2 27 / 20%)';
        document.getElementById(errorTo).style.backgroundColor='#ffffff';
    }
}

function verifyAllSection6(){
    var dobElement = document.getElementById('dob');
    var chooseMethodElement=document.getElementById('chooseMethod');
    var frontPhotoEle = document.getElementById('frontfile');
    var backPhotoEle=document.getElementById('backfile');
    var selfieEle=document.getElementById('selfiefile');
    var authNumEle=document.getElementById('authNum');
    console.log(
            dobElement.value,
            chooseMethodElement.value,
            frontPhotoEle.value,
            backPhotoEle.value,
            selfieEle.value,
            authNumEle.value,
        );
}