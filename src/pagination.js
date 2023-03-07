import { fetchPokemon } from "./app";

const paginationList = document.querySelector(".pagination");
const searchInput = document.querySelector(".text-box");
const searchForm = document.querySelector(".search-wrapper");
const buttonPage = document.querySelector(".load-more");
let page = 1;
let maxPage;

const searchPokemon = (isFirstCheck) => {
  fetchPokemon(input.value, page).then((res) => {
    maxPage = Math.ceil(res.pageSize / 60);
    if (res.pageSize === 0) {
      buttonPage.classList.add("hidden");
    } else {
      if (maxPage > 1) {
        buttonPage.classList.remove("hidden");
      }
      if (page > maxPage) {
        buttonPage.classList.add("hidden");
      }
    }
  });
};
