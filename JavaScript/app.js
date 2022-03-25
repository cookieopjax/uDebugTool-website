// headers: { 'Content-Type': 'application/json' },
axios.get('https://udebugtoolapp.herokuapp.com/').then(function (response) {
    console.log(response.data)
    //console.log(response.data[0].name)
    
    for(let i=0; i<response.data.length; i++){
        let suggDiv = document.createElement("div");
        suggDiv.classList.add("everySuggection");
        let nameText = document.createElement("h3");
        nameText.innerText = response.data[i].name;
        let suggText = document.createElement("P");
        suggText.innerText = response.data[i].suggs;
        let timeText = document.createElement("h6");
        timeText.innerText = response.data[i].publish_date;
    
        suggDiv.appendChild(nameText);
        suggDiv.appendChild(suggText)
        suggDiv.appendChild(timeText);
    
        let allSugg = document.querySelector(".suggection");
        allSugg.appendChild(suggDiv);
    }
   
})
.catch(function (error) {
  // handle error
  console.log(error);
});


let form = document.getElementById("submitForm");
form.addEventListener("submit", e =>{
    //e.target.innerText = "按我衝三小"
    e.preventDefault();
    let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    let name = document.getElementById("nickName").value;
    let suggs = document.getElementById("content").value;
    let input = {
        time : now,
        name : name,
        suggs : suggs
    }
    
axios.post('https://udebugtoolapp.herokuapp.com/add', input).then(function (response) {
      console.log(response.data)
      location.reload();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
    //
})
