let nameOne = document.getElementById('nameOne');
let marqueTwo = document.getElementById('marqueTwo');
let priceThree = document.getElementById('priceThree');
let dateFour = document.getElementById('dateFour');
let submit = document.getElementById('submit');
let result1 = document.getElementById('result1');
let result2 = document.getElementById('result2');
let result3 = document.getElementById('result3');
let result4 = document.getElementById('result4');
var selectedvalue = document.getElementById('optionss');
let regexx = /^[a-zA-Z-\s]+$/;
let regg = /[1-9]/


var arraydata;
if (localStorage.product != null) {
    arraydata = JSON.parse(localStorage.product)
}
else {
    arraydata = [];
}



// ==================== save in local storage ================================================
const arr = [];

submit.onclick = function (e) {

    e.preventDefault()
    submit.innerHTML = 'Create';
    submit.style.backgroundColor = "rgb(107, 78, 238)"


    if (nameOne.value.length === 0) {
        result1.innerHTML = "name required"
        nameOne.style.borderColor = "red"
        result1.style.color = "red"

    } else if (nameOne.value.length > 30) {
        result1.innerHTML = "name can not be more than 30 characters"
        nameOne.style.borderColor = "red"
        result1.style.color = "red"
        console.log('name more than 30')

    }

    else if (regexx.test(nameOne.value) === false) {
        result1.innerHTML = "name required"
        result1.style.color = "red"

    } else {
        result1.innerHTML = "you ready to go"
        nameOne.style.borderColor = "green"
        result1.style.color = "green"
        arr.push(true);
        console.log('name true pushed')
    }




    if (marqueTwo.value.length === 0) {
        result2.innerHTML = "marque required"
        marqueTwo.style.borderColor = "red"
        result2.style.color = "red"

    } else if (marqueTwo.value.length > 30) {
        result2.innerHTML = "name can not be more than 30 characters"
        marqueTwo.style.borderColor = "red"
        result2.style.color = "red"
        console.log('name more than 30')

    } else if (regexx.test(marqueTwo.value) === false) {
        result2.innerHTML = "marque required"
        result2.style.color = "red"

    } else {
        result2.innerHTML = "you ready to go"
        result2.style.color = "green"
        arr.push(true);
        console.log('marque true pushed')

    }





    if (priceThree.value.match(regg)) {
        result3.innerHTML = "you ready to go"
        priceThree.style.borderColor = "green"
        result3.style.color = "green"
        arr.push(true);



    } else {
        result3.innerHTML = "choose a price"
        priceThree.style.borderColor = "red"
        result3.style.color = "red"

    }






    if (dateFour.value != '') {
        result4.innerHTML = "you ready to go"
        dateFour.style.borderColor = "green"
        result4.style.color = "green"
        arr.push(true);


    } else {
        result4.innerHTML = "choose a date"
        dateFour.style.borderColor = "red"
        result4.style.color = "red"

    }





    var ginre = document.getElementsByName('ginre');

    ginre.forEach(radio => {
        if (radio.checked) {

            console.log(radio.value);

            if (arr.length === 4) {

                let newobject = {
                    nameOne: nameOne.value,
                    marqueTwo: marqueTwo.value,
                    priceThree: priceThree.value,
                    dateFour: dateFour.value,
                    selectedvalue: selectedvalue.value,
                    ginre: radio.value,

                }
                arraydata.push(newobject);
                localStorage.setItem('product',JSON.stringify(arraydata))

                showallvalues()

            } else {
                console.log('arr do not equals !== 4')

            }



            deleteallvalues()
            arr.length = 0
        }


    });

}



// ==================== just to clear inputs  ================================================

function deleteallvalues() {
    nameOne.value = ''
    marqueTwo.value = ''
    priceThree.value = ''
    dateFour.value = ''

}

// ==================== creates values

function showallvalues() {
    let tablo = '';
    for (let i = 0; i < arraydata.length; i++) {
        tablo += `
            <tr>
            <th>${arraydata[i].nameOne}</th>
            <th>${arraydata[i].marqueTwo}</th>
            <th>${arraydata[i].priceThree}</th>
            <th>${arraydata[i].dateFour}</th>
            <th>${arraydata[i].selectedvalue}</th>
            <th>${arraydata[i].ginre}</th>
            <th>
            <button type="button" onclick="updateData(${i})" class="btn" id="edit" >Edit <i class="fa-solid fa-wand-magic-sparkles"></i></button>
            </th>
            <th>
            <button type="submit" onclick="deleteone(${i})" class="btn" id="delete">Delete <i class="fa-solid fa-trash-can"></i></button>
            </th>
            </tr>
            
            `
        document.getElementById('tbody').innerHTML = tablo
    }

}

showallvalues()


// ============ confirmation to delete

let popup = document.getElementById('popup');
let btntodelete = document.getElementById('btntodelete');
function deleteone(i) {

    popup.style.display = "block"
// ============ btntodelete button in the card
    btntodelete.onclick = function () {
// ============ to delete

        console.log(i)
        arraydata.splice(i,1);
        localStorage.product = JSON.stringify(arraydata);
// ============ to to show values again and hide card
        showallvalues()
        hideback()
        window.location.reload();
    }
}

function hideback() {
    popup.style.display = "none"
}






// ============ Update and delete at the same time


function updateData(i) {

    console.log(i)
    nameOne.value = arraydata[i].nameOne;
    marqueTwo.value = arraydata[i].marqueTwo;
    priceThree.value = arraydata[i].priceThree;
    dateFour.value = arraydata[i].dateFour;
    submit.innerHTML = 'Update <i class="fa-solid fa-wand-magic-sparkles"></i>';
    submit.style.backgroundColor = "green"
// ============ delete
    arraydata.splice(i,1);
    localStorage.product = JSON.stringify(arraydata);

}


