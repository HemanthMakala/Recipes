import {elements} from './base';
export const getInput = () => {
    return elements.searchInput.value;
};

export const clearInput = () => {
    elements.searchInput.value='';};

export const clearResults = () => {
    elements.searchResultLIst.innerHTML='';
    elements.searchResPages.innerHTML='';
};

const limitRecipieTitle = (title, limit = 17) =>{
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc,cur) => {
            if(acc+cur.length<=limit){
                newTitle.push(cur);
            }
            return acc+cur.length;
        },0);
        return `${newTitle.join(' ')} ...`;
    };
    return title;
}   

const renderRecipe = receipe =>{
    const markup = `
                <li>
                    <a class="results__link" href="#${receipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${receipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipieTitle(receipe.title)}</h4>
                            <p class="results__author">${receipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    elements.searchResultLIst.insertAdjacentHTML('beforeend',markup);
};

const createButton = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'?page-1:page+1}>
                    <span>Page ${type === 'prev'?page-1:page+1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev'?'left':'right'}"></use>
                    </svg>
                </button>
`;

const renderButtons = (page, numResults, resPerPage) =>{
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pages > 1){
        //Button to go to next page
        button = createButton(page,'next');
    }else if(page < pages){
        //Both Buttons
        button = `
        ${createButton(page,'next')}
        ${createButton(page,'prev')}
        `;
    }else if(page === pages && pages >= 1){
        // Only button to go to prev page
        button = createButton(page,'prev'); 
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResults = (recipes,page = 2,resPerPage=10) =>{
    //Render results of current page
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);
    //Render page buttons
    renderButtons(page,recipes.length,resPerPage);
};