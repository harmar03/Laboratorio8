import { createEpisodeHTML } from "./episode.js";

export const createSeasonHTML = (data, number) => `
  <article class="season">
    <header class="season-header">T${number}</header>
    ${data.map(createEpisodeHTML).join("")}
  </article>
`;
