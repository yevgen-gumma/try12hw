import 'simplelightbox/dist/simple-lightbox.min.css';

import { submitSearch, loadMoreImages } from './js/pixabay-api';

const searchForm = document.querySelector('.searchForm');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  submitSearch();
});

const loadMoreButton = document.querySelector('.load-more-button');
loadMoreButton.addEventListener('click', loadMoreImages);
