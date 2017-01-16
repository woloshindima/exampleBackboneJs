import _ from "lodash";
import Backbone from "backbone";
import Mn from "backbone.marionette";
import radio from "../../radio/radio";
import AbstractComponent from "../../abstractComponent/abstractComponent";
// template
import main_tpl from "./mainView_tpl.html";
// components
import SearchComponent from "./components/serchComponent/searchComponent";
import SearchResultComponent from "./components/searchResultComponent/searchResultComponent";
import RepositoryComponent from "./components/repositoryComponent/repositoryComponent";

const MainView = Mn.View.extend({
    template: _.template(main_tpl),
    initialize(options){
        TestApp.logger.system('MainView initialize');
    },
    onRender(){
        TestApp.logger.system('MainView Render');
        this.addRegion('mainViewContainer', '.main-container');
    },
});


const MainComponent = AbstractComponent.extend({
    viewClass: MainView,
    channelName: radio.channelName.mainRadio,
    radioRequests: {
        'show:repository': '_showRepository',
        'show:search': '_showSearch',
        'show:searchResult': '_showSearchResult',
    },
    initialize(options){
        TestApp.logger.system('MainComponent initialize');
        this.on('show', () => {
            this._showDir(this.model.get('view'));
            this.listenTo(this.model, 'change', () => this._showDir(this.model.get('view')));
        });
    },
    _showDir(viewName){
        const mainRegion = this.view.getRegion('mainViewContainer');
        const _this = this;
        if (viewName === 'search') {
            this.searchComponent = new SearchComponent({
                model: new Backbone.Model(),
            });
            this.searchComponent.showIn(mainRegion);
        } else if (viewName === 'searchResult') {
            this.searchResultComponent = new SearchResultComponent({
                model: _this.searchResultModel,
            });
            this.searchResultComponent.showIn(mainRegion);
        } else if (viewName === 'repository') {
            this.repositoryComponent = new RepositoryComponent({
                model: _this.repositoryModel,
            });
            this.repositoryComponent.showIn(mainRegion);
        }
    },
    _showRepository(full_name){
        this.repository = (() => {
            let obj = {};
            let array = this.searchResultComponent.searchListCollection.toJSON();
            for (let a = 0; a < array.length; a++) {
                array[a].full_name === full_name ? obj = array[a] : false;
            }
            return obj;
        })();
        this.repositoryModel = new Backbone.Model(this.repository);
        this._showComponent('repository');
    },
    _showSearch(){
        this._showComponent('search');
    },
    _showSearchResult(value, page = 1, per_page = 10){
        this.searchResultModel = new Backbone.Model({value, page, per_page});
        this._showComponent('searchResult');
    },
    _showComponent(name){
        this.model.clear({
            silent: true,
            forceUpdate: true
        });
        this.model.set({
            view: name
        });
    },
});


export default MainComponent;