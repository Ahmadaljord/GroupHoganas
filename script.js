//Search Muncipility
const form = document.getElementById('form');
const search = document.getElementById('search');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  var searchText = search.value.replace(/\s/g, "");
  var searchTerm1 = searchText.toUpperCase();
  var searchTerm = searchTerm1;

  document.getElementById("showLocals").style.display = "block";
  document.getElementById("showActivities").style.display = "block";
  document.getElementById("showRegion").style.display = "block";
  document.getElementById("content").style.display = "none";


  fetch('municipalities.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      console.log(searchTerm);
      data.Municipalities.forEach(function (Municipalities) {
        if (`${Municipalities.Ort}` === searchTerm) {

          document.getElementById('output').innerHTML =
            `
         <h2 ID="allmunicipility"><b>Muncipility Details</b></h2>
        <ul class="allmunicipility">
          <li>Kommunkod: ${Municipalities.Kommunkod}</li>
          <li>KommunSV: ${Municipalities.KommunSV}</li>
          <li>E-Post: ${Municipalities['E-post']}</li>
          <li>Telefon: ${Municipalities.Telefon}</li>
          <li>Webbadress: ${Municipalities.Webbadress}</li>
          <li>Postnr: ${Municipalities.Postnr}</li>
          <li>Ort: ${Municipalities.Ort}</li>
          <li>Kommun Namn: ${Municipalities['Kommun namn']}</li>
          <li>Lans kod: ${Municipalities.Lanskod}</li>
          <li>Län namn: ${Municipalities['Län namn']}</li>
          <li>Region namn: ${Municipalities['Region namn']}</li>
        </ul>
      `;
          var kod = `${Municipalities.Kommunkod}`;
          var kodlan = `${Municipalities.Lanskod}`;
          console.log(kod);
          console.log(kodlan);
          //function ShowRegion()

          document.getElementById('showRegion').addEventListener('click', showRegion);


          function showRegion() {
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
                                        <li> ${Region.Ort}</li>
                                      </ul>
                                    `;
                    //function showLocals()
                    document.getElementById('showLocals').addEventListener('click', getLocals);

                    function getLocals() {
                      fetch('locals.json')
                        .then((res) => res.text())
                        .then(data => JSON.parse(data))
                        .then((data) => {
                          data.Locals.forEach(function (Locals) {
                            console.log(`${Locals.KommunID}`);
                            if (`${Locals.KommunID}` === kod) {
                              document.getElementById('output1').innerHTML =
                                `
                  <h2 ID="alllocals">Locals Name</h2>
                <ul class="alllocals">
                  <li>Name: ${Locals.Name}</li>
                  <li>TypeOfHelp: ${Locals.TypeOfHelp}</li>
                  <li>What languages speak?: ${Locals['What languages speak?']}</li>
                  <li>Contact info: ${Locals['Contact info']}</li>
                  <li>KommunID: ${Locals.KommunID}</li>

                </ul>
              `;
                              //function getactivities()
                              document.getElementById('showActivities').addEventListener('click', showActivities);

                              function showActivities() {

                                fetch('activities.json')
                                  .then((res) => res.text())
                                  .then(data => JSON.parse(data))
                                  .then((data) => {
                                    data.Activities.forEach(function (Activities) {
                                      if (`${Activities.KommunID}` === kod) {
                                        document.getElementById('output2').innerHTML +=
                                          `<h2 ID="allactivity"> Aktivities </h2>
                                      <ul class="allactivity">
                                          <li>ID: ${Activities.ID}</li>
                                          <li>TitleSV: ${Activities.TitleSV}</li>
                                          <li>DescriptionSV: ${Activities.DescriptionSV}</li>
                                          <li>TitleUA: ${Activities.TitleUA}</li>
                                          <li>DescriptionUA: ${Activities.DescriptionUA}</li>
                                          <li>NameRU: ${Activities.NameRU}</li>
                                          <li>Description RU: ${Activities['Description RU']}</li>
                                          <li>NameEN: ${Activities.NameEN}</li>
                                          <li>Column9: ${Activities.Column9}</li>
                                          <li>Adress: ${Activities.Adress}</li>
                                          <li>Date: ${Activities.Date}</li>
                                          <li>Link: ${Activities.Link}</li>
                                          <li>Booking Link: ${Activities['Booking link']}</li>
                                          <li>Time from : ${Activities['Time from']}</li>
                                          <li>Time to : ${Activities['Time To']}</li>
                                          <li>PictureSV: ${Activities.PictureSV}</li>
                                          <li>PictureUA: ${Activities.PictureUA}</li>
                                          <li>PictureRU: ${Activities.PictureRU}</li>
                                          <li>PictureEN: ${Activities.PictureEN}</li>
                                          <li>KommunID: ${Activities.KommunID}</li>
                                      </ul>
                                      `;

                                      }
                                    });

                                  })
                              }
                            }
                          });

                        })
                    }
                  }
                });
              })
          }
        };

      })

    })
})




//function getMuncipility()

document.getElementById('getMuncipility').addEventListener('click', getMuncipility);


function getMuncipility() {
  document.getElementById("content").style.display = "none";
  fetch('municipalities.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      let output = '<h2 ID="allmunicipility"><b>Muncipility List</b></h2>';
      console.log(data);
      data.Municipalities.forEach(function (Municipalities) {
        output += `
  <ul class="allmunicipility">
    <li><b>Kommunkod: ${Municipalities.Kommunkod}</b></li>
    <li>KommunSV: ${Municipalities.KommunSV}</li>
    <li>KommunUA: ${Municipalities.KommunUA}</li>
    <li>KommunRU: ${Municipalities.KommunRU}</li>
    <li>KommunEN: ${Municipalities.KommunEN}</li>
    <li>E-Post: ${Municipalities['E-post']}</li>
    <li>Telefon: ${Municipalities.Telefon}</li>
    <li>Webbadress: ${Municipalities.Webbadress}</li>
    <li>Postnr: ${Municipalities.Postnr}</li>
    <li>Ort: ${Municipalities.Ort}</li>
    <li>Kommun Namn: ${Municipalities['Kommun namn']}</li>
    <li>Lans kod: ${Municipalities.Lanskod}</li>
    <li>Län namn: ${Municipalities['Län namn']}</li>
    <li>Region namn: ${Municipalities['Region namn']}</li>
  </ul>
`;
      });
      document.getElementById('output').innerHTML = output;
    })
}







//function getRegion(List)
document.getElementById('getregionlist').addEventListener('click', getregionlist);

function getregionlist() {
  document.getElementById("content").style.display = "none";
  fetch('regions.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      let output = '<h2 ID="regionlist"><b>Region List</b></h2>';
      console.log(data);
      data.Region.forEach(function (Region) {
        output += `
  <ul class="regionlist">
    <li><b>${Region.NameSV}</b></li>
  </ul>
`;
      });
      document.getElementById('output').innerHTML = output;
    })
}






//function getLocals()
document.getElementById('getLocals').addEventListener('click', getLocals);

function getLocals() {
  document.getElementById("content").style.display = "none";
  fetch('locals.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      let output = '<h2 ID="alllocals">Locals</h2>';
      console.log(data);
      data.Locals.forEach(function (Locals) {
        output += `
  <ul class="alllocals">
    <li><b>Name: ${Locals.Name}</b></li>
    <li>TypeOfHelp: ${Locals.TypeOfHelp}</li>
    <li>What languages speak?: ${Locals['What languages speak?']}</li>
    <li>Contact info: ${Locals['Contact info']}</li>
    <li>KommunID: ${Locals.KommunID}</li>

  </ul>
`;
      });
      document.getElementById('output').innerHTML = output;
    })
}

//function getactivities()
document.getElementById('getActivities').addEventListener('click', getActivities);

function getActivities() {
  document.getElementById("content").style.display = "none";
  fetch('activities.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      let output = '<h2 ID="allactivity">Activities</h2>';
      console.log(data);
      data.Activities.forEach(function (Activities) {
        output += `
          <ul class="allactivity">
              <li><b>ID:${Activities.ID}</b></li>
              <li>TitleSV: ${Activities.TitleSV}</li>
              <li>DescriptionSV: ${Activities.DescriptionSV}</li>
              <li>TitleUA: ${Activities.TitleUA}</li>
              <li>DescriptionUA: ${Activities.DescriptionUA}</li>
              <li>NameRU: ${Activities.NameRU}</li>
              <li>Description RU: ${Activities['Description RU']}</li>
              <li>NameEN: ${Activities.NameEN}</li>
              <li>Column9: ${Activities.Column9}</li>
              <li>Adress: ${Activities.Adress}</li>
              <li>Date: ${Activities.Date}</li>
              <li>Link: ${Activities.Link}</li>
              <li>Booking Link: ${Activities['Booking link']}</li>
              <li>Time From: ${Activities['Time from']}</li>
              <li>Time To: ${Activities['Time To']}</li>
              <li>PictureSV: ${Activities.PictureSV}</li>
              <li>PictureUA: ${Activities.PictureUA}</li>
              <li>PictureRU: ${Activities.PictureRU}</li>
              <li>PictureEN: ${Activities.PictureEN}</li>
              <li>KommunID: ${Activities.KommunID}</li>
     
          </ul>
          `;
      });
      document.getElementById('output').innerHTML = output;
    })
}

//All News
document.getElementById('getInfo').addEventListener('click', getInfo);

function getInfo() {
  document.getElementById("content").style.display = "none";
  fetch('GoodToKnow.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      let output = '<h2 ID="allnews">Good to know</h2>';
      console.log(data);

      data.GoodToKnow.forEach(function (ayat) {
        console.log(ayat.TitleSV);
      });

      data.GoodToKnow.forEach(function (GoodToKnow) {
        output += `
          <ul class="allnews">
              <li><b>ID:</b> ${GoodToKnow.ID}</li>
              <li><b>Contry:</b> ${GoodToKnow.Contry}</li>
              <li><b>TitleSV:</b> ${GoodToKnow.TitleSV}</li>
              <li><b>DescriptionSV:</b> ${GoodToKnow.DescriptionSV}</li>
              <li><b>NameUA:</b> ${GoodToKnow.NameUA}</li>
              <li><b>NameRU:</b> ${GoodToKnow.NameRU}</li>
              <li><b>NameEN:</b> ${GoodToKnow.NameEN}</li>
              <li><b>Link:   </b> ${GoodToKnow.Link}</li>
              <li><b>KommunID:</b> ${GoodToKnow.KommunID}</li>
              <li><b>RegionID:</b> ${GoodToKnow.RegionID}</li>
              <li><b>PictureSV:</b> ${GoodToKnow.PictureSV}</li>
              <li><b>PictureUA:</b> ${GoodToKnow.PictureUA}</li>
              <li><b>PictureRU:</b> ${GoodToKnow.PictureRU}</li>
              <li><b>PictureEN:</b> ${GoodToKnow.PictureEN}</li>
              <li><b>DataTime:</b> ${GoodToKnow.DataTime}</li>
              <li><b>DateFrom:</b> ${GoodToKnow.DateFrom}</li>
              <li><b>DateTo:</b> ${GoodToKnow.DateTo}</li>
          </ul>
          `;
      });

      document.getElementById('output').innerHTML = output;

    })
}

//Get good to know list
document.getElementById('getgoodtoknowlist').addEventListener('click', getgoodtoknowlist);


function getgoodtoknowlist() {
  document.getElementById("content").style.display = "none";
  fetch('GoodToKnow.json')
    .then((res) => res.text())
    .then(data => JSON.parse(data))
    .then((data) => {
      const x = data.GoodToKnow;
      console.log(data);
      let output = '';
      output = `<h2 id="goodtoknow">Good to know</h2>
          <ul class="goodtoknow">
              <li><b>${x[0].TitleSV}</b></li>
              <li>${x[0].DescriptionSV}</li>
              <li><b>${x[1].TitleSV}</b></li>
              <li>${x[1].DescriptionSV}</li>
          </ul>
          `;
      document.getElementById('output').innerHTML = output;
    })
}
