
function appendphotos(data){
  var maindiv = document.getElementById("gallerydiv");
  
}

function displaygellery(id){
  console.log("yes "+id);
  get('https://jsonplaceholder.typicode.com/photos?albumId='+id).then(function(response){
    console.log("success",response);
    appendphotos(response);
  },function(error){
    console.log("failed",error);
  })
}

function appendData(data) {
  var listdiv = document.getElementById("userdiv");


  for (var i = 0; i < data.length; i++) {
    var div = document.createElement('div');
    div.id = 'userrec';
    div.className='rec';
    jsondata = JSON.parse(data);
    
    div.innerHTML = jsondata[i].name;
    //div.innerHTML = data;
    listdiv.appendChild(div);
    div.style.status="";
    
    div.addEventListener("click",displaygellery(jsondata[i].id));

  }
}

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

get('https://jsonplaceholder.typicode.com/users').then(function(response) {
  console.log("Success!", response);
  appendData(response);
}, function(error) {
  console.log("Failed!", error);
})
