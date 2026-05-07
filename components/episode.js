export const createEpisodeHTML = (episode) =>
  `<div class="episode episode-${episode.number} rating-${Math.round(episode.rating ?? 0)}">${episode.number}</div>`;
