import 'simplelightbox/dist/simple-lightbox.min.css';

import { submitSearch, loadMoreImages } from './js/pixabay-api';

const searchForm = document.querySelector('.searchForm');
const loadMoreButton = document.querySelector('.load-more-button');

loadMoreButton.style.visibility = 'hidden';

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  submitSearch();
});

loadMoreButton.addEventListener('click', loadMoreImages);
