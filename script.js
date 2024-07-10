const body = document.getElementsByTagName('body')[0];
body.style.margin = '0 auto';
body.style.padding = 0;
body.style.boxSizing = 'border-box';

const loading = document.createElement('div')
loading.innerText = 'loading....'
loading.style.textAlign = 'center'
loading.style.fontSize = '30px'

const container = document.createElement('div');
container.style.width = '700px'
container.style.minHeight = '100px'
container.style.margin = '50px auto 10px auto'
container.style.border = '1px solid black'
container.style.display = 'grid';
container.style.gap = '10px';
container.style.padding = '10px';
container.style.gridTemplateColumns = 'auto auto auto auto';
body.insertAdjacentElement('afterbegin', container);
body.insertAdjacentElement('afterbegin', loading);

//counter
let photoCounter = 20;
let photos = [];

const getDataFromApi = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then((res) => res.json())
        .then((data) => {
            loading.style.display = 'none'
            photos = data;
            displayPhoto(data.slice(0, 20))
        })
}
getDataFromApi();

const eachPhotoElem = (photoData) => {
    const image = document.createElement('img');
    image.src = photoData.thumbnailUrl;
    image.style.height = '100%'
    image.style.width = '100%'
    image.style.cursor = 'pointer'
    container.appendChild(image);
    image.addEventListener('click', (e) => {
        const modalImg = document.createElement('img');
        modalImg.src = photoData.url;
        modalImg.style.height = '100%';
        modalImg.style.width = '100%';
        modalContent.innerHTML = '';
        modalContent.appendChild(modalImg)
        modal.style.display = "block";
    })
};

const displayPhoto = (dataList) => {
    dataList.forEach((item) => {
        eachPhotoElem(item);
    });
};


const loadMoreFun = ()=>{
    photoCounter += 20;
    const selectedData = photos.slice(photoCounter-20, photoCounter)
    displayPhoto(selectedData);
}

const buttonDiv = document.createElement('div');
buttonDiv.style.display = 'flex'
buttonDiv.style.justifyContent = 'center'
const moreButton = document.createElement('button');
buttonDiv.appendChild(moreButton)
moreButton.innerText = 'Load more'
moreButton.style.backgroundColor = 'green';
moreButton.style.color = 'white';
moreButton.style.padding = '8px';
moreButton.style.fontSize = '12px';
moreButton.style.borderRadius = '5px';
moreButton.style.cursor = 'pointer';
moreButton.style.marginBottom = '10px';
moreButton.addEventListener('click', loadMoreFun)
container.insertAdjacentElement('afterend', buttonDiv);


const modal = document.createElement('div');
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.zIndex = 1;
modal.style.top = 0;
modal.style.left = 0;
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.overflow = 'auto';
modal.style.backgroundColor = 'rgb(0,0,0, 0.4)';

const modalContent = document.createElement('div');
modalContent.style.backgroundColor = '#fefefe'
modalContent.style.margin = '15% auto'
modalContent.style.padding = '50px'
modalContent.style.width = '50%'

modal.appendChild(modalContent);
const closeIcon = document.createElement('span');
closeIcon.innerText = 'X';
closeIcon.style.color = '#3a3a3a';
closeIcon.style.float = 'right';
closeIcon.style.fontSize = '28px';
closeIcon.style.fontWeight = 'bold';


modalContent.appendChild(closeIcon);
const modalData = document.createElement('div')
modalContent.appendChild(modalData);


buttonDiv.insertAdjacentElement('afterend', modal);


closeIcon.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


