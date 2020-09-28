let imagesArr = [];
let gallery = document.querySelector('.image-list');
let shuffleBtn = document.querySelector('#shuffle');

// Fn: takes index and creates a new card depending upon the number of images requested
function createImageCard(i) {
    const flipCard = document.createElement('div');
    flipCard.setAttribute('class', 'flip-card');
    flipCard.setAttribute('id', `flip-card-${i}`);

    const flipCardInner = document.createElement('div');
    flipCardInner.setAttribute('class', 'flip-card-inner');
    flipCard.appendChild(flipCardInner)

    const flipCardFront = document.createElement('div');
    flipCardFront.setAttribute('class', 'flip-card-front');

    const img = document.createElement('img');
    img.setAttribute("id", `monster-${i}`);
    img.src = `assets/placeholder-200x200.png`;
    flipCardFront.appendChild(img);

    flipCardInner.appendChild(flipCardFront)
    return flipCard;
}

window.addEventListener('DOMContentLoaded', async () => {
    for (let i = 0; i < 10; i++) {
        gallery.appendChild(createImageCard(i));
    }

    // API call which return users data
    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(res => res.json())
        .then(users => {
            imagesArr = [...users];
            createImageGallery()
        }).catch(err => alert('Images could not be loaded'));

    shuffleBtn.style.visibility = 'visible'; // visibility shown after DOM has been updated

    gallery.addEventListener('click', (e) => {
        if (e.target.src && e.target.src.includes('delete.svg')) {
            let removeIndex = e.target.getAttribute('id');
            const elem = document.getElementById(`flip-card-${removeIndex}`)
            gallery.removeChild(elem);
        }
    })

    shuffleBtn.addEventListener('click', (e) => {
        shuffleImages(gallery);
    })
})

// Fn: Updating the gallery of images with the data returned from API
function createImageGallery() {
    let lastChild;
    const children = gallery.children
    for (let i = 0; i < children.length; i++) {
        lastChild = children[i].lastElementChild;
        updateImages(lastChild, i);
        const image = lastChild.querySelector(`.flip-card-front #monster-${i}`);
        image.src = `https://robohash.org/${imagesArr[i].id}?set=set3&size=200x200`
    }
}

// Fn: updateImages takes the last child and index and adds detail back card and updates images
function updateImages(lastChild, i) {
    const flipCardBack = lastChild.appendChild(document.createElement('div'));
    flipCardBack.setAttribute('class', 'flip-card-back');

    const title = flipCardBack.appendChild(document.createElement('h1'));
    const description = flipCardBack.appendChild(document.createElement('h4'));
    const image = flipCardBack.appendChild(document.createElement('img'));

    title.innerHTML = `${imagesArr[i].name}`;
    description.innerHTML = `${imagesArr[i].email}`;
    image.src = '/assets/delete.svg';
    image.setAttribute('id', `${i}`)
}

// Fn: shuffleImages accepts a node with children and randomizes them and replaces it with a new fragment
const shuffleImages = ((parent) => {
    const newNode = parent.cloneNode(true);
    const newNodeChildren = newNode.children;
    const newNodeFragment = document.createDocumentFragment();

    while (newNodeChildren.length > 0) {
        newNodeFragment.appendChild(newNodeChildren[Math.floor(Math.random() * newNodeChildren.length)]);
    }
    parent.innerHTML = "";
    parent.appendChild(newNodeFragment);
});





