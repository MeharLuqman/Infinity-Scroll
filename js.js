
// helper function to set Attritubutes on DOM Elements
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];




const count = 20;
const apikey = 'yn1RBHGYGf6Vr7ps9IE9uFWXtcXPSLCZwM4Eu6O5FX4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
 





function setAttributes(element , attritubutes) {
    for (const key in attritubutes) {
        element.setAttribute(key , attritubutes[key]);
        // console.log(element)
    }
}


const imageContainer = document.getElementById ('image-Container');
const loader = document.getElementById('loader');

// create elements for links & photos add to DOM
function displayphotos() {
    totalImages = photoArray.length;
    console.log('total images', totalImages);
     // run function for each object in photoArray
     photoArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute("src" , photo.urls.regular)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event lister ,check when each is finished loading
        img.addEventListener( 'load', imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
        loader.hidden = false ;

    });
}

// unsplaish api
// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded ===totalImages) {
        ready = true;
        console.log('ready = ', ready);
    }
}


// Get photos From Unsplash API
async function getphotos() {
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayphotos();
    } catch (error) {
        // Catch error Here
    }
}

// Check to see if scrilling near bottoom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ){
        getphotos();
    ready = false;
    }
})


// on load
getphotos();