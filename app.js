
// Selectors
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');
const result = document.querySelector('.single-result');
const form = document.getElementById('form');

// API URL
const api = 'https://api.lyrics.ovh';

async function searchSongs(term){
    const res = await fetch(`${api}/suggest/${term}`)
    const data = await res.json()
   
    showData(data)
}

// showing Data function
function showData(data){
  
        result.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        ${data.data.map(
            song => `  <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button data-song="${song.title}" data-artist="${song.artist.name}" class="btn btn-success">Get Lyrics</button>
      
        </div>`)
        .join("")}
    </div>
        `;
      
}

// Get Lyrics Function
async function getLyrics(artist , songTitle){
    const res = await fetch(`${api}/v1/${artist}/${songTitle}`);
    const data = await res.json();
   
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `
    <div class="single-result l-position row align-items-center m-auto my-3 p-5">
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
    
    </div>`
}

// Form submit EventListener
form.addEventListener('submit',e =>{
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if(!searchTerm){
        alert('Please add name of artist or song name..')
    }else{
        searchSongs(searchTerm);
    }
})

// Click Lyrics Button Click

result.addEventListener('click',e => {
    const clickedElement = e.target;

    if(clickedElement.tagName === 'BUTTON'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-song');

        getLyrics(artist,songTitle);
    }
})