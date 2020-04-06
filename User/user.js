
function appendphotos(data){
  var maindiv = document.getElementById("gallerydiv");
  //maindiv.innerHTML=data;

  jsongallery = JSON.parse(data);
    
    for (var i = 0; i < jsongallery.length; i++) {

      var gdiv = document.createElement('IMG');
      gdiv.id = 'gdiv';
      gdiv.setAttribute("width","320px");
      gdiv.setAttribute("height","180px");
      gdiv.setAttribute("src",fetch('https://jsonplaceholder.typicode.com/photos?photoId='+jsongallery[i].photoId+'&id='+jsongallery[i].id)
      .then(response => response.json())
      .then(json => {
        //console.log(json)

        photo = JSON.parse(json);
        console.log(photo);
        //maindiv.appendChild(gdiv);
        var photos = `
        <iframe width="180" height="90" 
        src="${photo[i].thumbnailUrl}?frameborder=0">
        </iframe>
        
        `
        gdiv.appendChild(photos);
      }));

      //div.appendChild(document.create);
      //gdiv.innerHTML=jsongallery[i].url;
      
      maindiv.appendChild(gdiv);
  }

}

function displaygellery(id){
  //console.log("yes "+id);
  get('https://jsonplaceholder.typicode.com/photos?albumId='+id).then(function(response){
    console.log("success",response);
    //console.log(id);
    appendphotos(response);
  },function(error){
    console.log("failed",error);
  })
}

function appendData(data) {
  var listdiv = document.getElementById("userdiv");
    
    jsondata = JSON.parse(data);
    
    for (var i = 0; i < jsondata.length; i++) {

      var div = document.createElement('div');
      div.id = 'udiv';
      div.className=jsondata[i].id;
      
      div.setAttribute("type","button");
      //div.appendChild(document.createTextNode(jsondata[i].name)); 
      div.innerHTML=jsondata[i].name;
      
      listdiv.appendChild(div);
  }
  var usr = document.getElementById('udiv');
  //usr.addEventListener("onClick",displaygellery(usr.className));
  usr.onclick = displaygellery(usr.className);
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
