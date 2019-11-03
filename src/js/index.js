import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
import Recipe from './models/Recipe';
const state = {};

const controlSearch = async ()=>{
    // Get query from view
    const query = searchView.getInput();
    if(query){
        // New search object and ad to state
        state.search = new Search(query)
        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //  Search for recipies
        await state.search.getResuts();
        // Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result)
    }
};
elements.searchForm.addEventListener('submit',e=>{
e.preventDefault();
controlSearch();
});

elements.searchResPages.addEventListener('click',e=>{
const btn = e.target.closest('.btn-inline');
if (btn){
    const goToPage = parseInt(btn.dataset.goto,10);
    searchView.clearResults();
    searchView.renderResults(state.search.result,goToPage);
}
});
// Recipe Controller

const controlRecipe = async () =>{
    // Get the id from the url
    const id = window.location.hash.replace('#','');
    if (id){
        // Prepare UI for changes
        state.recipe = new Recipe(id);
        try{
        // Create new recipe object
        await state.recipe.getRecipe();
        }catch(err){
            alert('Error processing Recipe!');
        }
        // Calculate ser2vings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        // Render recipe
        console.log(state.recipe)
    }
};

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));