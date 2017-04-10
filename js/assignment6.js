function showArea() {
    var showArea1 = document.getElementById("userAreaSelection");
    var showArea2 = showArea1.options[showArea1.selectedIndex].value;

    if (showArea2 == 1) {
        document.getElementById("Area1").style.display = 'block';
        document.getElementById("Area2").style.display = 'none';
        document.getElementById("Area3").style.display = 'none';
        // document.getElementById("docFooter").style.display = 'flex';
    }
    else if (showArea2 == 2) {
        document.getElementById("Area2").style.display = 'block';
        document.getElementById("Area1").style.display = 'none';
        document.getElementById("Area3").style.display = 'none';
        // document.getElementById("docFooter").style.display = 'flex';
    }
    else if (showArea2 == 3) {
        document.getElementById("Area3").style.display = 'block';
        document.getElementById("Area2").style.display = 'none';
        document.getElementById("Area1").style.display = 'none';
        // document.getElementById("docFooter").style.display = 'hidden';
    }
    else if (showArea2 == 0) {
        document.getElementById("Area1").style.display = 'none';
        document.getElementById("Area2").style.display = 'none';
        document.getElementById("Area3").style.display = 'none';
        // document.getElementById("docFooter").style.display = 'hidden';
    }

}

function addCustomertoDB() {
    var objReq = new XMLHttpRequest(),
        url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";


    var custID = document.getElementById('custIdInput').value,
        custName = document.getElementById('custNameInput').value,
        custCity = document.getElementById('custCity').value;


    var newCustomer = '{"CustomerID":"' + custID + '","CompanyName":"' + custName + '","City":"' + custCity + '"}';


    objReq.onreadystatechange = function () {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var result = JSON.parse(objReq.responseText);
            processAddCustResult(result);
            // console.log(result);
        }
    };


    objReq.open("POST", url, true);
    objReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objReq.send(newCustomer);
}
function processAddCustResult(output) {
    if (output.WasSuccessful == 1) {
        document.getElementById("addMessageLabel").innerHTML = "The operation was successful!";
    }
    else {
        document.getElementById("addMessageLabel").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}


function changeShipAddress() {
    var objReq = new XMLHttpRequest(),
        url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";

    
    var shipOrderNum = document.getElementById('shipOrderNum').value,
        shipName = document.getElementById('shipName').value,
        shipStAddr = document.getElementById('shipStreetAddress').value,
        shipCity = document.getElementById('shipCity').value,
        shipZip = document.getElementById('shipZip').value;


    
    var newAddress = '{"OrderID":"' + shipOrderNum + '","ShipName":"' + shipName + '","ShipAddress":"' + shipStAddr + '","ShipCity":"' + shipCity + '","ShipPostcode":"' + shipZip + '"}';

    
    objReq.onreadystatechange = function () {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var result = JSON.parse(objReq.responseText);
            processChangeShipResult(result);
            // console.log(result);
        }
    };


    
    objReq.open("POST", url, true);
    objReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); objReq.send(newAddress);

}
function processChangeShipResult(output) {
    if (output.WasSuccessful == 1) {
        document.getElementById("changeShipLabel").innerHTML = "The operation was successful!";
    }
    if (output.WasSuccessful == -2) {
        document.getElementById("changeShipLabel").innerHTML = "The operation was successful!" + "<br>" + output.Exception;
    }
    if (output.WasSuccessful == 3) {
        document.getElementById("changeShipLabel").innerHTML = "The operation was successful!" + "<br>" + output.Exception;
    }
    else {
        document.getElementById("changeShipLabel").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
        // console.log(output);
    }
}


function checkIfSure() {
    if (confirm('Are you sure you want to delete this customer?') == true) {
        deleteCustomer();
    }
    else {
        document.getElementById("deleteCustLabel").innerHTML = "You pressed Cancel";
    }
}
function deleteCustomer() {
    
    var customerID = document.getElementById('deleteCustID').value;
    var objReq = new XMLHttpRequest(),
        url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/"+customerID;

    


    
    var custToDelete = '{"CustomerID":"' + customerID + '"}';

    
    objReq.onreadystatechange = function () {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var result = JSON.parse(objReq.responseText);
            processDeletion(result);
        }
    };


    
    objReq.open("GET", url, true);
    objReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); objReq.send(custToDelete);
}
function processDeletion(output) {
    if (output.DeleteCustomerResult.WasSuccessful == 1) {
        document.getElementById("deleteCustLabel").innerHTML = "The operation was successful!";
    }
    else {
        document.getElementById("deleteCustLabel").innerHTML = "The operation was not successful!" + "<br>" + output.DeleteCustomerResult.Exception;
    }
}