let nav = document.querySelector("nav");
let barLink = nav.querySelectorAll("div ul li a");

window.addEventListener("scroll", () =>{
    //console.log(window.pageYOffset); //滾輪移動
    if(window.pageYOffset != 0){
        nav.style.backgroundColor = "rgb(0, 72, 121)";
        barLink.forEach( a => {
            a.style.color = "white";
        })


    }else{
        nav.style.backgroundColor = "";
        barLink.forEach( a => {
            a.style.color = "";
        })
    }

});