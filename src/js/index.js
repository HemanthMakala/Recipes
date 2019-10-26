import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

const state = {};

const controlSearch = async ()=>{
    // Get query from view
    const query = searchView.getInput();
    if(query){
        // New search object and ad to state
        state.search = new Search(query)
        // Prepare UI for results

        //  Search for recipies
        await state.search.getResuts();
        // Render results on UI
        console.log(state.search.result)
    }



   
    

};



elements.searchForm.addEventListener('submit',e=>{
e.preventDefault();
controlSearch();
});
