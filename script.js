const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []
let readyToLoadMore = false
let imageLoadedQuantity = 0
let totalImage = 0
let isInitialLoad = true
    // To avoid too much repeating, write a setAttribute function, attributes is an array:
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// API url:
let initalCount = 5
const apiKey = ''
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initalCount}`

function updateUrlWithNewCount(photoCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`
}

function imageLoaded() {
    imageLoadedQuantity++
    //console.log(imageLoadedQuantity);
    if (imageLoadedQuantity === totalImage) {
        readyToLoadMore = true
        loader.hidden = true
            //console.log('ready = ', readyToLoadMore);
            // for better performance: DOMContentLoaded much faster 以下设置让客户可以立即看到前5张图片，而不是加载符号
    }
}

function displayPhotos() {
    imageLoadedQuantity = 0
    totalImage = photosArray.length
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

        // 'load' Event listener: execute the function imageLoaded() immediately after an image has been loaded.
        img.addEventListener('load', imageLoaded)

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
            // To see what is the element we need:
            //console.log(photosArray);
            // console.log(photosArray[1].alt_description);
            // console.log(photosArray[1].urls.regular);

        displayPhotos()
        if (isInitialLoad) {
            updateUrlWithNewCount(30)
            isInitialLoad = false
        }

    } catch (err) {
        console.log('Oh, something went wrong', err)
    }
}

window.addEventListener('scroll', () => {
    //console.log('scroll');
    //所有的页面高度比内容高度大，就加载
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoadMore) {
        //console.log('Load more!');
        getPhotos()
    }
})

getPhotos()