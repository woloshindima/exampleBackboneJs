import _ from "lodash";
import Backbone from "backbone";
import Mn from "backbone.marionette";
//templates:
import searchResult_tpl from "./searchResult_tpl.html";
import AbstractComponent from "../../../../abstractComponent/abstractComponent";
import PaginationComponent from "./components/pagination/paginationComponent";
import PaginationModel from "./components/pagination/paginaitonModel";
import SearchListComponent from "./components/searchListComponent/searchListComponent";
import SearchListCollection from "./components/searchListComponent/searchListCollection";

const SearchResultView = Mn.View.extend({
    template: _.template(searchResult_tpl),
    initialize() {
        this.model.on('reset', this.render);
        TestApp.logger.system('SearchResultCollectionView initialize');
    },
    onRender() {

        this.addRegion('resultList', '.main-container_search-result');
        this.addRegion('resultPagination', '.main-container_pagination');
        TestApp.logger.system('SearchResultCollectionView onRender');
    },
});

const SearchResultComponent = AbstractComponent.extend({
    viewClass: SearchResultView,
    initialize(){
        TestApp.logger.system('SearchResultComponent initialize');
        this.listenTo(this, 'show', this._onShow);
    },
    _onShow(){
        this._createModels();
        this._createComponents();
    },

    _createModels(){
        const value = this.model.get('value');
        const page = this.model.get('page');
        const per_page = this.model.get('per_page');
        this.searchListCollection = new SearchListCollection();
        this.searchListCollection.url = `https://api.github.com/search/repositories?q=${value.join('+')}&page=${page}&per_page=${per_page}`;
        this.paginationModel = new PaginationModel({num: page, value});
    },
    _createComponents(){
        const _this = this;
        const resultListRegion = this.view.getRegion('resultList');
        const resultPaginationRegion = this.view.getRegion('resultPagination');
        let searchListComponent = new SearchListComponent({
            collection: _this.searchListCollection,
        });
        searchListComponent.showIn(resultListRegion);
        let paginationComponent = new PaginationComponent({
            model: _this.paginationModel,
        });
        paginationComponent.showIn(resultPaginationRegion);
    },

});


export default SearchResultComponent;
