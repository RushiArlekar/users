
function appendphotos(id){
  var maindiv = document.getElementById("gallerydiv");
  //maindiv.innerHTML=data;

  //jsongallery = JSON.parse(data);
  var src = "https://jsonplaceholder.typicode.com/photos?photoId="+id;
  console.log(id);

    maindiv.setAttribute("src",fetch(src)
    .then(response => response.json())
    .then(json => {
      console.log(json)


      var gdiv = document.createElement('IMG');
      gdiv.id = i;
      gdiv.setAttribute("width","180px");
      gdiv.setAttribute("height","90px");

      //photo = JSON.parse(json);
      //console.log(photo);
      //maindiv.appendChild(gdiv);
      var photos = `
      <iframe width="180" height="90" 
      src="${json[i].thumbnailUrl}?frameborder=0">
      </iframe>
      
      `
      gdiv.innerHTML = photos;
    }));
    

    //div.appendChild(document.create);
    //gdiv.innerHTML=jsongallery[i].url;
    
    //maindiv.appendChild(gdiv);
  

}

function displaygellery(e){
  var id = this.e;
  console.log("yes "+this.id);
  get('https://jsonplaceholder.typicode.com/photos?albumId='+this.id).then((response)=>{
    console.log("success 1",response);

    photo = JSON.parse(response);
    var maindiv = document.getElementById("gallerydiv");
    var src = 'https://jsonplaceholder.typicode.com/photos?albumId='+this.id;
    //console.log("src"+src);

    /*
    if(maindiv.hasChildNodes()){
        
      for (var i = 0; i < photo.length; i++){
        maindiv.removeChild(document.getElementById(i));
      }
    }
    */

    for (var i = 0; i < photo.length; i++){
      var gdiv = document.createElement('img');
      gdiv.id = i;
      gdiv.setAttribute("width","150px");
      gdiv.setAttribute("height","150px");

      gdiv.setAttribute('src',photo[i].thumbnailUrl);
      console.log("done "+i);

      maindiv.appendChild(gdiv);

    }

  },function(error){
    console.log("failed",error);
  })
}

function appendData(data) {
  var listdiv = document.getElementById("userdiv");
    
    jsondata = JSON.parse(data);
    
    for (var i = 0; i < jsondata.length; i++) {

      var div = document.createElement('div');
      div.className = 'udiv';
      div.id=jsondata[i].id;
      div.setAttribute("href",'https://jsonplaceholder.typicode.com/photos/'+jsondata[i].id);
      
      div.innerHTML=jsondata[i].name;
      
      listdiv.appendChild(div);
      div.addEventListener("click",displaygellery);
  }
  
}

function get(url) {
  
  return new Promise(function(resolve, reject) {
    
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
