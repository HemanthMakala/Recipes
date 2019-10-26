import axios from 'axios';
export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResuts(){
        const key = `067eff23bdc35a5f69fb8eacd9d94619`;
        try{
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
        }catch(error){
            alert(error);
        }
    }

}