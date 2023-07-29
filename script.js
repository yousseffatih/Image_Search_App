const accessKey = "JcxXH8S3BaIrGziwwul7ERthzvuBW0fEM8p4smvlcg8";

const formEl = document.querySelector("form");
const searchInputEl =  document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showmorebuttonEl = document.getElementById("show-more-button");  

let inputData = "";
let page = 1;
async function searchImages(){
      inputData  = searchInputEl.value;
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
      const responce = await fetch(url);
      const data = await responce.json();
      if(page === 1)
      {
            searchResultsEl.innerHTML = ""; 
      }
      const results = data.results;
      results.map((result)=>{
            const imagesWrapper = document.createElement("div");
            imagesWrapper.classList.add("search-result");
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imagesWrapper.appendChild(image);
            imagesWrapper.appendChild(imageLink);
            searchResultsEl.appendChild(imagesWrapper);
      })
      
      if(searchInputEl.value != "") 
      {
            page++;
      }

      if(page > 1)
      {
            showmorebuttonEl.style.display = "block";
      }
}

formEl.addEventListener("submit" , (event)=>{
      event.preventDefault();
      page = 1;
      searchImages();
})

showmorebuttonEl.addEventListener("click" , ()=>{
      searchImages();
})