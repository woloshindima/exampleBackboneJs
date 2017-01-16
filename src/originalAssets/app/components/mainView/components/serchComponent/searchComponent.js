import _ from "lodash";
import Backbone from "backbone";
import Mn from "backbone.marionette";
import radio from "../../../../radio/radio";
import AbstractComponent from "../../../../abstractComponent/abstractComponent";
import keyCode from "../../../../constants/keyCode";

// template
import search_tpl from "./search_tpl.html";
// components

const SearchView = Mn.View.extend({
    template: _.template(search_tpl),
    ui: {
        searchInput: '.main-container_search-menu .input-group>input',
        searchButton: '.main-container_search-menu button.btn',
    },
    events: {
        'click @ui.searchButton': '_searchResult',
        'keyup @ui.searchInput': '_inputSearch'
    },
    initialize(options){
        TestApp.logger.system('SearchView initialize');
    },
    onRender(){
        TestApp.logger.system('SearchView Render');
    },
    _inputSearch(event){
        if (event.keyCode == keyCode.ENTER){
            this._searchResult(event);
        }
    },
    _searchResult(event){
        let input = this.getUI('searchInput');
        let inputValue = input.val().split(' ');
        this.trigger('show:result', inputValue);
    }
});


const SearchComponent = AbstractComponent.extend({
    viewClass: SearchView,
    viewEvents: {
        'show:result': '_showResult',
    },
    _showResult(value){
        radio.routerRadio.request('show:searchResult', value);
    },
    initialize(options){
        TestApp.logger.system('SearchComponent initialize');
    },
});


export default SearchComponent;