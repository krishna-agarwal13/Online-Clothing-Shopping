

const url= `https://www2.hm.com/en_in/men/shop-by-product/shoes/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=stillLife`


// sorting boots urls 

const lth_url = `https://www2.hm.com/en_in/men/shop-by-product/shoes/_jcr_content/main/productlisting.display.json?sort=ascPrice&image-size=small&image=stillLife`

const htl_url = `https://www2.hm.com/en_in/men/shop-by-product/shoes/_jcr_content/main/productlisting.display.json?sort=descPrice&image-size=small&image=stillLife`

const new_url = `https://www2.hm.com/en_in/men/shop-by-product/shoes/_jcr_content/main/productlisting.display.json?sort=newProduct&image-size=small&image=stillLife`




// Import boots components
import {colourSection} from './activeware_comp.js'

import {user_rating} from './activeware_comp.js'

import {apperBox} from './activeware_comp.js'

// Import Navbar 
import {navbar} from './navbar.js'

document.getElementById("navbar_sd").innerHTML= navbar();

// Import footer
import {footer} from './footer.js'

document.getElementById("footer_sd").innerHTML = footer();




async function activewareData(){

    try{
        const res = await fetch(url);

        const data = await res.json();
    
        appendData(data.products)

    }
    catch(err){
        console.log("err",err)

    }
}

activewareData()


let results = document.getElementById("append_items_sd");

function appendData(data){
    
    results.innerHTML ="";

    data.forEach( function(elem){
        
    let box = document.createElement("div");
    box.setAttribute("id","box_active")

    box.addEventListener("click", function () {
        localStorage.setItem("Selected", JSON.stringify(elem));
        window.location.href = "./ViewSelected.html";
      });

    let imgBox_div_sd = document.createElement("div")
    imgBox_div_sd.setAttribute("id","imgBox_id")


    let img = document.createElement("img");
    img.setAttribute("id","img_active")
    img.src= elem.image[0].src

    let apperBox_div = document.createElement("div");
    apperBox_div.setAttribute("id","apperBox")
    apperBox_div.innerHTML = apperBox();

    let colo = document.createElement("div");
    colo.setAttribute("id","colo_sd")
    colo.innerHTML = colourSection();
    

    let title = document.createElement("p");
    title.setAttribute("id","tit_active")
    title.innerText= elem.title;

    let price = document.createElement("p");
    price.setAttribute("id","pri_active")
    price.innerText= `INR ${elem.price}`;

    let user_rat = document.createElement("div");
    user_rat.innerHTML = user_rating();

    imgBox_div_sd.append(img, apperBox_div)

    box.append(imgBox_div_sd,colo,title,price,user_rat);

    results.append(box);


    } )

}


// Sorting boots

// low to high price fetch call 
async function sortingDatalth(){

    try{
        
        const res = await fetch(lth_url);
        const data = await res.json()

        appendData(data.products)


    }
    catch(err){
        console.log("err :",err)
    }
}

// High to low price fetch call 
async function sortingDatahtl(){

    try{
        
        const res = await fetch(htl_url);
        const data = await res.json()
        appendData(data.products)


    }
    catch(err){
        console.log("err :",err)
    }
}

// latest items fetch call 

async function sortingDatanew(){

    try{
        
        const res = await fetch(new_url);
        const data = await res.json()
        appendData(data.products)


    }
    catch(err){
        console.log("err :",err)
    }
}



// sortingData()

 document.getElementById("sort_opt").addEventListener("change",sortItems);


function sortItems(){

    let select = document.getElementById("sort_opt").value;
    
    if(select == "lth"){
     
        sortingDatalth()

    }
    if(select== "htl"){

        sortingDatahtl()
    }
    if(select=="new"){

        sortingDatanew()
    }
}