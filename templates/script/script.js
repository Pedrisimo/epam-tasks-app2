var elEmail = document.getElementById("email");
var elName = document.getElementById("name");
var elPhone = document.getElementById("phone");
var btPost = document.getElementById('post');
var btGet = document.getElementById('get');
var btClear = document.getElementById('clear');
var divTable = document.getElementById('table_div');
var fForm = document.getElementById('form');

ResizeElements();
SetListeners();

function ResizeElements() {
    if (window.innerWidth < 768) {
        fForm.style.width = "100%";
        divTable.style.width = "100%";
        elName.style.width = "100%";
        elPhone.style.width = "100%";
        elEmail.style.width = "100%";
    }

}
//adding button-event listiners
function SetListeners() {
    elName.addEventListener('blur', checkName);
    elPhone.addEventListener('blur', checkPhone);
    elEmail.addEventListener('blur', checkEmail);
    btPost.addEventListener('click', postData);
    btGet.addEventListener('click', getData);
    btClear.addEventListener('click', clearForms);
}

function checkName() {
        let nameReg = new RegExp(/\d/g);
    
    if ((elName.value.length === 0) || (elName.value.match(nameReg) !== null)) {
        RaizeError(window.event.target.name, 1);
    }
    else {
            RaizeError(window.event.target.name, 0);
    }
}

function checkEmail() {
    let emailReg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);

    if ((elEmail.value.length === 0) || emailReg.test(elEmail.value) !== true) {
        RaizeError(window.event.target.name, 1);
    }
    else {
            RaizeError(window.event.target.name, 0);
    }
}

function checkPhone()
{
    let phoneReg = new RegExp(/^\+375(25|29|33|44)\d{7}$/g);
    let phoneReg1 = new RegExp(/^\8017(2|3)\d{6}$/g);

    if ((elPhone.value.length === 0) || (phoneReg.test(elPhone.value) !== true && phoneReg1.test(elPhone.value) !== true)) {
        RaizeError(window.event.target.name, 1);
    }
    else {
            RaizeError(window.event.target.name, 0);
    }
}

function RaizeError(element, on) {
    let elementName = element + "_error";
    let errorMessage;
    if (on >= 1) {
        if (element === "name") {
            errorMessage = "Please enter valid name (length > 0 and contain only symbols";
        }
        else {
            errorMessage = "Please enter valid " + element;
        }
        document.getElementById(elementName).innerHTML = errorMessage;
        document.getElementById(elementName).style.visibility = 'visible';
        document.getElementById(element).focus();
    }
    else {
            document.getElementById(elementName).style.visibility = 'hidden';
            document.getElementById(elementName).innerHTML = null;
    }
}

function postData() {
    if ((elName.value.length > 0) && (elEmail.value.length > 0) && (elPhone.value.length > 0)) {
        let xhr = new XMLHttpRequest();
        let postDataSt = 'name=' + encodeURIComponent(elName.value) + '&email=' + encodeURIComponent(elEmail.value) + '&phone=' + encodeURIComponent(elPhone.value);
        
        console.log("PostData: " + postDataSt);
        xhr.open('POST', '/items');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(postDataSt);
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
            	return;
            }
            if (xhr.readyState === 4 && xhr.status === 200) {
                clearForms();
                getData();
            }
        };
    }
    else {
        alert("All the fields are required");
    }
}

function getData() {
    let xhr = new XMLHttpRequest();
	
    xhr.open('GET', '/items', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function()	{
        if (xhr.readyState === 4 && xhr.status === 200) {
            createList(xhr.responseText);
        }
    };
    xhr.send(null);
}

function createList(data) {
    let data_array = JSON.parse(data);
    divTable.innerHTML = null;
	
    if (data_array.length >= 1) {
        let table = document.createElement("table");
        table.id = "data_list";
        table.setAttribute('class', 'list');
        var head_tr = document.createElement("tr");
        head_tr.appendChild(document.createElement("th")).innerText = "#";
        head_tr.appendChild(document.createElement("th")).innerText = "Name";
        head_tr.appendChild(document.createElement("th")).innerText = "Email";
        head_tr.appendChild(document.createElement("th")).innerText = "Phone";
        head_tr.appendChild(document.createElement("th")).innerText = null;
        head_tr.setAttribute('class', 'border-bottom');
        table.appendChild(head_tr);
        divTable.appendChild(table);
       
        for (var i = 0; i < data_array.length; i++) {
            table.appendChild(document.createElement("tr")).id = "tr" + i;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = i + 1;
            document.getElementById("tr" + i).childNodes[0].setAttribute('class', 'bold');
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = data_array[i].name;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = data_array[i].email;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).innerText = data_array[i].phone;
            document.getElementById("tr" + i).appendChild(document.createElement("td")).id = "td" + i;
            
            let rec_id = data_array[i].id;
            let link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('id', rec_id);
            link.appendChild(document.createTextNode("Remove"));
            document.getElementById("td" + i).appendChild(link);
        }
        document.getElementById('data_list').addEventListener('click', getTarget);
        if (window.innerWidth < 768) {
            document.getElementById('data_list').style.width = "100%";
        }
        divTable.style.visibility = 'visible';
    }
}

function clearForms() {
    elEmail.value = null;
    elName.value = null;
    elPhone.value = null;
}

function removeItem(id, target) {
    let xhr = new XMLHttpRequest();
    let dataDelete = 'id=' + id;

    xhr.open('DELETE', '/items?id=' + id, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            removeTableRow(target);
        }
    };
    xhr.send();
}

function getTarget() {
    let target_obj = window.event.target;

    if (window.event.target.nodeName === "A") {
        removeItem(target_obj.id, target_obj);
    }
}

function removeTableRow(target) {
    let parent_obj = target;
    let ord_num;
    let nodata = false;

	while (parent_obj) {
        parent_obj = parent_obj.parentElement;
    
        if (parent_obj.nodeName === "TR") {
            console.log("node: "+parent_obj.childNodes[0].innerHTML);
            document.getElementById('data_list').removeChild(parent_obj);
        
            if (document.getElementById('data_list').childNodes.length === 1) {
                    document.getElementById('data_list').parentElement.removeChild(document.getElementById('data_list'));
                    divTable.style.visibility='hidden';
                    nodata = true;
            }
            break;
        }
    }
    if (nodata !== true) {
        let tr_count = document.getElementById('data_list').getElementsByTagName("tr").length;
        console.log("tr_length: " + tr_count);
        
        for (var count =0; count < tr_count; count++) {
            if (count > 0) {
                document.getElementById('data_list').childNodes[count].childNodes[0].innerHTML = count;
                console.log("tr:" + count);
                console.log(document.getElementById('data_list').childNodes[count].childNodes[0].innerHTML);
            }
        }
    }
}
