const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// To avoid too much repeating, write a setAttribute function, attributes is an array:
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// API url:
const count = 10
const apiKey = ''
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function displayPhotos() {
    photosArray.forEach((photo => {
        // Create <a>:
        const item = document.createElement('a')

        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        })

        // Create <img>:
        const img = document.createElement('img')

        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        })

        // Put <img> inside <a>, then put both into imageContainer:
        item.appendChild(img)
        imageContainer.appendChild(item)
    }))
}

// Get a photo from API:
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
            //console.log(photosArray);
            // console.log(photosArray[1].alt_description);
            // console.log(photosArray[1].urls.regular);

        displayPhotos()
    } catch (err) {
        console.log('Oh, something went wrong', err)
    }
}

getPhotos()