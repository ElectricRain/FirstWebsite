/*let myVar = document.querySelector("h1");
myVar.onclick = function(){
    if(myVar.textContent ==="Hello world!"){
      myVar.textContent = 'Testy!';
    } else {
      myVar.textContent = 'Hello world!'
    }
}

function setUserName() {
    let myName = prompt('Podaj tekst.');
    localStorage.setItem('Wpisz tekst', myName);
    myVar.textContent = 'Testy, ' + myName;
  }





var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

myButton.onclick = function() {
    getJSON('https://localhost:44391/Customers/jsonGet/MORGK3',
    function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
});
}
const fetchPromise1 = fetch('https://localhost:44391/Customers/jsonGet/MORGK');
    fetchPromise1.then(response => {
      console.log(response);
});
fetchPromise1

function getJSONP(url, success) {

  var ud = '_' + +new Date,
      script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0] 
             || document.documentElement;

  window[ud] = function(data) {
      head.removeChild(script);
      success && success(data);
  };

  script.src = url.replace('callback=?', 'callback=' + ud);
  head.appendChild(script);

}


let myButton = document.querySelector('button');

async function fetchDataAsync() {
  const response = await fetch('https://localhost:44391/Customers/jsonGet/MORGK');
  console.log(await response.json())
}

myButton.onclick = function() {
  fetchDataAsync();
}
*/
async function CreateTableFromJSON(ltext){                                                   //Based on https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
  /*var myJson = [{
    "CustomerId": "MORGK",
    "CompanyName": "Morgenstern Gesundkost",
    "ContactName": "Alexander Feuer",
    "ContactTitle": "Marketing Assistant",
    "Address": "Heerstr. 22",
    "City": "Leipzig",
    "Region": null,
    "PostalCode": "04179",
    "Country": "Germany",
    "Phone": "0342-023176",
    "Fax": null,
    "CustomerCustomerDemo": [],
    "Orders": []
  }]*/
  //var myJson = [];
  const response = await fetch(ltext);
  //myJson.push(await response.json());
  var myTemp = await response.json();
  if(Array.isArray(myTemp))
  {
    var myJson = myTemp;
  } else {
    var myJson = [];
    myJson.push(myTemp);
  }

  var col = [];
  for (var i = 0; i < myJson.length; i++) {
      for (var key in myJson[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }

   // CREATE DYNAMIC TABLE.
   var table = document.createElement("table");
   table.classList.add("table");
   // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

   var tr = table.insertRow(-1);                   // TABLE ROW.

   for (var i = 0; i < col.length; i++) {
       var th = document.createElement("th");      // TABLE HEADER.
       th.innerHTML = col[i];
       tr.appendChild(th);
   }

   // ADD JSON DATA TO THE TABLE AS ROWS.
   for (var i = 0; i < myJson.length; i++) {

       tr = table.insertRow(-1);

       for (var j = 0; j < col.length; j++) {
           var tabCell = tr.insertCell(-1);
           tabCell.innerHTML = myJson[i][col[j]];
       }
   }

   // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
   var divContainer = document.getElementById("showData");
   divContainer.innerHTML = "";
   divContainer.appendChild(table);
}