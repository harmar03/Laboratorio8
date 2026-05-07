export const createSearchResultHTML = (show) =>
  `<li class="search-result" data-id="${show.id}">
    <img src="${show.image}" alt="${show.name}">
    <span>${show.name}</span>
  </li>`;
