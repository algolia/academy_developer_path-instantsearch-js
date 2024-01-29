// npm install algoliasearch instantsearch.js instantsearch.css
// npm install --save-dev style-loader css-loader

// Import algoliasearch, instantsearch, instantsearch.css, and stylesheet
import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import "instantsearch.css/themes/satellite.css";

import "./style.css";
// Import instantsearch widgets

import {
  searchBox,
  hits,
  configure,
  pagination,
  refinementList,
  clearRefinements,
  currentRefinements,
} from "instantsearch.js/es/widgets";

// Create variables
const APP_ID = "latency";
const SEARCH_ONLY_API_KEY = "6be0576ff61c053d5f9a3225e2a90f76";
const INDEX_NAME = "instant_search";

// Create searchClient
const searchClient = algoliasearch(APP_ID, SEARCH_ONLY_API_KEY);

// Create the instantsearch instance
const search = instantsearch({
  indexName: INDEX_NAME,
  searchClient,
});

// Add widgets to the instantsearch instance
search.addWidgets([
  searchBox({
    container: "#searchbox",
  }),

  hits({
    container: "#hits",
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <h1>${components.Highlight({ hit, attribute: "name" })}</h1>
          <p>${components.Highlight({ hit, attribute: "description" })}</p>
        </article>
      `,
    },
  }),
  configure({
    hitsPerPage: 5,
  }),
  pagination({
    container: "#pagination",
  }),

  refinementList({
    container: "#refinement-list",
    attribute: "brand",
  }),
  currentRefinements({
    container: "#current-refinements",
  }),
  clearRefinements({
    container: "#clear-refinements",
  }),
]);

// Start the instantsearch instance
search.start();
