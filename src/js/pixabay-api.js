import axios from 'axios';
import { renderImages, renderMoreImages } from './render-functions';

let currentPage = 1;

export async function submitSearch() {
  const searchInput = document.querySelector('.searchInput');
  const query = searchInput.value.trim();
  const loader = document.querySelector('.loader');
  const galleryContainer = document.querySelector('.gallery');
  const loadMoreButton = document.querySelector('.load-more-button');

  if (query === '') {
    iziToast.show({
      message: 'Please enter a keyword',
      backgroundColor: 'yellow',
    });
    return Promise.reject('Empty query');
  }

  const apiKey = '42324270-89622daef349524aeb531ebd1';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${currentPage}`;

  loader.style.display = 'inline-block';

  galleryContainer.innerHTML = '';

  try {
    const response = await axios.get(apiUrl);

    loader.style.display = 'none';

    if (!response.data.hits || response.data.hits.length === 0) {
      iziToast.error({
        color: '#fafafb',
        backgroundColor: '#ef4040',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(response.data.hits);
      loadMoreButton.style.visibility = 'visible';
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error!',
      message: `An error occurred while fetching data: ${error.message}. Please try again later.`,
    });
  }
}

export async function loadMoreImages() {
  currentPage += 1;

  const loader = document.querySelector('.loader');
  const searchInput = document.querySelector('.searchInput');
  const query = searchInput.value.trim();
  const apiKey = '42324270-89622daef349524aeb531ebd1';
  const newApiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${currentPage}`;

  try {
    const response = await axios.get(newApiUrl, { cache: 'no-cache' });
    loader.style.display = 'none';

    if (!response.data.hits || response.data.hits.length === 0) {
      iziToast.error({
        color: '#fafafb',
        backgroundColor: '#ef4040',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderMoreImages(response.data.hits);
      const totalHits = response.data.totalHits || 0;
      const displayedHits = currentPage * 15;
      if (displayedHits >= totalHits) {
        const loadMoreButton = document.querySelector('.loadMoreButton');
        loadMoreButton.style.display = 'none';
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
      smoothScrollToGallery();
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error!',
      message: `An error occurred while fetching data: ${error.message}. Please try again later.`,
    });
  }
}

function smoothScrollToGallery() {
  const galleryContainer = document.querySelector('.gallery');
  const cardHeight = getCardHeight(galleryContainer);
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function getCardHeight(element) {
  const firstCard = element.querySelector('.image-card');
  const rect = firstCard.getBoundingClientRect();
  return rect.height;
}
