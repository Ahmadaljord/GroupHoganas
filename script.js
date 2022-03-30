//Search Muncipility
var searchTerm = '';
var form = document.getElementById('form');
var search = document.getElementById('search');
form.addEventListener('submit', (e) => {
  e.preventDefault({
    once: true
  });
  searchText = search.value.replace(/\s+/g, ' ').trim();
  searchTerm1 = searchText.toUpperCase();
  searchTerm = searchTerm1;
  fetchmun1();
})


//fetch mun1 function
function fetchmun1() {
  fetch('municipalities.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      citylist = [];
      for (let i = 0; i < data.Municipalities.length; i++) {
        x = data.Municipalities[i].Ort;
        citylist.push(data.Municipalities[i].Ort);
      }
      myarr = Object.values(citylist);
      mystring = myarr.toString();
      console.log(mystring.includes(searchTerm));
      console.log(searchTerm !== undefined);
      //check Blank
      if (!searchTerm || /^\s*$/.test(searchTerm)) {
        alert('It is Blank. Please write your city name!');
        window.location.reload();
        //check Empty
      } else if (!searchTerm || searchTerm.length === 0) {
        alert('It is Blank. Please write your city name!');
        window.location.reload();
      } else if ((searchTerm !== undefined) && (mystring.includes(searchTerm))) {
        if (fetchmun()) {
          console.log(fetchmun());
          window.location.reload();
          setTimeout(function () {
            fetchmun();
          }, 1000); //delay is in milliseconds 
        } else if (fetchmun() || showRegion()) {
          window.location.reload();
          setTimeout(function () {
            fetchmun();
          }, 1000); //delay is in milliseconds 
        } else if (fetchmun() || showRegion() || showActivities()) {
          window.location.reload();
          setTimeout(function () {
            fetchmun();
          }, 1000); //delay is in milliseconds 
        } else if (fetchmun() || showRegion() || showActivities() || showLocals()) {
          window.location.reload();
          setTimeout(function () {
            fetchmun();
          }, 1000); //delay is in milliseconds 
        } else {
          window.location.reload();
          setTimeout(function () {
            fetchmun();
          }, 1000); //delay is in milliseconds 

        }
      } else {
        alert('It is wrong spelling. Please write your city name correctly!');
        window.location.reload();
      }
    })

}



function refresh() {
  alert('THE CITY NAME IS NOT CORRECT PLEASE TRY AGAIN');
  window.location.reload();
}



function fetchmun() {
  fetch('municipalities.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {

      document.getElementById("content").style.display = "none";
      document.getElementById("output5").style.display = "none";
      document.getElementById("showLocals").style.display = "block";
      document.getElementById("showActivities").style.display = "block";
      document.getElementById("showRegion").style.display = "block";


      data.Municipalities.forEach(function (Municipalities) {
        if (`${Municipalities.Ort}` === searchTerm) {
          document.getElementById('output').innerHTML =
            `
          <h2 ID="allmunicipility"><b>Muncipility Details</b></h2>
         <ul class="allmunicipility">
           <li>${Municipalities.Kommunkod}</li>
           <li><span>KommunSV: ${Municipalities.KommunSV}</span></li>
           <li><a href = "mailto: ${Municipalities["E-post"]}">Send us an email!</a></li>
           <li>Telefon: ${Municipalities.Telefon}</li>
           <li><a href = "${Municipalities.Webbadress}">Muncibility Website</a></li>
           <li>Postnr: ${Municipalities.Postnr}</li>
           <li>Ort: ${Municipalities.Ort}</li>
           <li>Kommun Namn: ${Municipalities['Kommun namn']}</li>
           <li>${Municipalities.Lanskod}</li>
           <li>Län namn: ${Municipalities['Län namn']}</li>
           <li>Region namn: ${Municipalities['Region namn']}</li>
           <li><img class="mun-img" src="${Municipalities.image}" alt=""></li>
         </ul>
       `;

        }
      })
    })
}



//show region
document.getElementById('showRegion').addEventListener('click', showRegion, {
  once: true
});

function showRegion() {
  kod = document.querySelector("#output > ul > li:nth-child(1)").innerHTML;
  kodlan = document.querySelector("#output > ul > li:nth-child(9)").innerHTML;
  fetch('regions.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      data.Region.forEach(function (Region) {
        if (`${Region.Lanskod}` === kodlan) {
          document.getElementById('output3').innerHTML =
            `
            <h2 ID="regionlist">Region Contact Details</h2>
            <ul class="regionlist">
              <li><b> ${Region.Lanskod}</b></li>
              <li><b> ${Region.NameSV}</b></li>
              <li> ${Region['E-post']}</li>
              <li> ${Region['Telefon']}</li>
              <li> ${Region.Webbadress}</li>
              <li> ${Region['Postaddress 1']}</li>
              <li>Postnr: ${Region.Postnr}</li>
              <li> <span>${Region.Ort}</span></li>
            </ul>
          `;

        }
      });
    })
}




//function getactivities()
document.getElementById('showActivities').addEventListener('click', showActivities, {
  once: true
});

function showActivities() {
  kod = document.querySelector("#output > ul > li:nth-child(1)").innerHTML;
  kodlan = document.querySelector("#output > ul > li:nth-child(9)").innerHTML;
  fetch('activities.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      data.Activities.forEach(function (Activities) {
        if (`${Activities.KommunID}` === kod) {
          document.getElementById('output2').innerHTML +=
            `<h2 ID="allactivity"> ${Activities.TitleSV} </h2>
            
          <ul class="allactivity">
          <img class="act-img" src="${Activities.PictureSV}" alt="">
          <li> <b> ${Activities.Date}</b></li>
          <li><b>Time :</b> ${Activities['Time from']} - ${Activities['Time To']}</li>
          <li><b>Discription SV. :</b> ${Activities.DescriptionSV}</li>
          <li><b>Title UA. :</b> ${Activities.TitleUA}</li>
          <li><b>Description UA. :</b> ${Activities.DescriptionUA}</li>
          <li><b>Adress :</b> ${Activities.Adress}</li>
          <li><b>Booking Link :</b> ${Activities['Booking link']}</li>
          <li><b>Name EN :</b> ${Activities.NameEN}</li>  
          <li><b>Link :</b> <ins>${Activities.Link}</ins></li>
          <li><b>Booking Link :</b> <ins>${Activities['Booking link']}</ins></li>
          <li>KommunID: ${Activities.KommunID}</li>
          </ul>
            `;

        }
      });

    })
}




//function showLocals()
document.getElementById('showLocals').addEventListener('click', showLocals, {
  once: true
});

function showLocals() {
  kod = document.querySelector("#output > ul > li:nth-child(1)").innerHTML;
  kodlan = document.querySelector("#output > ul > li:nth-child(9)").innerHTML;
  fetch('locals.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      data.Locals.forEach(function (Locals) {
        console.log(`${Locals.KommunID}`);
        if (`${Locals.KommunID}` === kod) {
          document.getElementById('output1').innerHTML +=
            `
            <h2 ID="alllocals"></h2>
            <ul class="alllocals">
            <li><span>${Locals.Name}</span></li>
            <li><b>TypeOfHelp:</b> ${Locals.TypeOfHelp}</li>
            <li><b>What languages speak?:</b> ${Locals['What languages speak?']}</li>
            <li><b>Contact info:</b> ${Locals['Contact info']}</li>
            <li>KommunID: ${Locals.KommunID}</li>

          </ul>
        `;

        }
      });

    })
}






//Get good to know list
document.getElementById('getgoodtoknowlist').addEventListener('click', getgoodtoknowlist, {
  once: true
});

function getgoodtoknowlist() {
  document.getElementById("output5").style.display = "block";
  document.getElementById("content").style.display = "none";
  fetch('GoodToKnow.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      const x = data.GoodToKnow;
      let output5 = '';
      output5 = `
          <ul class="goodtoknow">
          <li><span><b> 1. </b> ${x[0].TitleSV}</span></li>
          <li>${x[0].DescriptionSV}</li>
              <li><span><b> 2. </b> ${x[1].TitleSV}</span></li>
          <li>${x[1].DescriptionSV}</li>
          </ul>
          
          `;
      document.getElementById('output5').innerHTML = output5;
    })
}