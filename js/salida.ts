const API_URL = ["https://icanhazdadjoke.com/slack","http://api.icndb.com/jokes/random","https://www.tronalddump.io/random/quote"];
const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather?q=Castelldefels&units=metric&lang=sp,es&appid=92f5f77850bec117de737b83bc4e6de0";

var boton = document.getElementById("but");
var chiste = document.getElementById("chiste");

var reportAcudits = [];

function nextJoke(){
    const randomElement = API_URL[Math.floor(Math.random() * API_URL.length)];

    switch(randomElement){
        case API_URL[0]:
            fetch(randomElement)
                .then(response => response.json())
                .then(data => chiste.innerHTML = data.attachments[0].text);
            break;
        case API_URL[1]:
            fetch(randomElement)
                .then(response => response.json())
                .then(data => chiste.innerHTML = data.value.joke);
            break;
        case API_URL[2]:
            fetch(randomElement)
                .then(response => response.json())
                .then(data => chiste.innerHTML = data.value);
            break;
    }
}

fetch(API_WEATHER)
    .then(response => response.json())
    .then(data => {
        document.getElementById("weather").innerHTML = "<img src=' http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png'>";
        document.getElementById("temp").innerHTML = data.main.temp+"º";
    });

boton.addEventListener("click", nextJoke);


function darLike(score){
    if(chiste.textContent == ""){
        return nextJoke();
    }
    const d = new Date();
    let text: string = d.toISOString();
    var numScore: number = score.getAttribute("data-score");
    reportAcudits.push({'joke': chiste.textContent, 'score': numScore, 'date': text});
    nextJoke();
    console.log(reportAcudits);
}
    