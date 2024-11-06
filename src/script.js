const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('loadMore');
const clearGalleryButton = document.getElementById('clearGallery');
const removeLastButton = document.getElementById('removeLast');
const reverseGalleryButton = document.getElementById('reverseGallery');

let imageCount = 4;


async function fetchImages(count) {
  try {
    const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${count}`);
    const images = await response.json();
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function loadImages(count) {
  const images = await fetchImages(count);
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.download_url;
    imgElement.alt = `Photo by ${image.author}`;
    gallery.appendChild(imgElement);
  });
}


loadImages(imageCount);


loadMoreButton.addEventListener('click', () => {
  loadImages(imageCount);
});


clearGalleryButton.addEventListener('click', () => {
  gallery.innerHTML = '';
});


removeLastButton.addEventListener('click', () => {
  if (gallery.lastElementChild) {
    gallery.removeChild(gallery.lastElementChild);
  }
});


reverseGalleryButton.addEventListener('click', () => {
  const images = Array.from(gallery.children);
  gallery.innerHTML = '';
  images.reverse().forEach(img => gallery.appendChild(img));
});
