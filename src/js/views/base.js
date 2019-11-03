export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResultLIst: document.querySelector('.results__list'),
    searchRes:document.querySelector('.results'),
    searchResPages:document.querySelector('.results__pages')
};

export const elementStrings = {
    loader:'loader'
}
/*Customised Loader*/

// export const renderLoader = parent =>{
//     const loader = `
//     <div class = "${elementStrings.loader}">
//         <svg>
//             <use href="img/icons.svg#icon-cw"></use>
//         </svg>
//     </div>
//     `;
//     parent.insertAdjacentHTML('afterbegin',loader);
// };


export const renderLoader = parent =>{
    const loader = `
    <div class="${elementStrings.loader} loader-1">
      <div class="loader-outter"></div>
      <div class="loader-inner"></div>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};









export const clearLoader = ()=>{
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader){
        loader.parentElement.removeChild(loader);
    }
}