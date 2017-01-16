import _ from "lodash";
import Mn from "backbone.marionette";
import $ from "jquery";
import radio from "../../../../../../radio/radio";
//templates:
import searchResult_tpl from "./searchList_tpl.html";
import AbstractComponent from "../../../../../../abstractComponent/abstractComponent";

const SearchListView = Mn.View.extend({
    template: _.template(searchResult_tpl),
    tagName: 'tr',
});

const SearchListCollectionView = Mn.CollectionView.extend({
    childView: SearchListView,
    tagName: 'table',
    className: 'table table-hover main-container_searchList',
    initialize() {
        this.collection.on('reset', this.render);
        TestApp.logger.system('SearchListCollectionView initialize');
    },
    onRender() {
        TestApp.logger.system('SearchListCollectionView onRender');
    },
});

const SearchListComponent = AbstractComponent.extend({
    viewClass: SearchListCollectionView,
    initialize(){
        TestApp.logger.system('SearchListComponent initialize');
        this._collectionFetch();
    },

    _collectionFetch(){
        this.collection.fetch({
            success() {},
            error(e, message) {
                radio.notificationRadio.request('show:message', `Server error: ${message.statusText}`, `Status: ${message.status}`);
            }
        });
    }
});


export default SearchListComponent;
