import Mn from "backbone.marionette";
import radio from "../radio/radio";
const mainRadio = radio.mainRadio;


const Controller = Mn.Object.extend({
    channelName: radio.channelName.routerRadio,
    radioRequests: {
        'show:searchResult': '_showSearchResult'
    },
    _showRepository(full_name1, full_name2){
        mainRadio.request('show:repository', `${full_name1}/${full_name2}`);
    },
    _prepareKeywords(value, page = 1){
        this._showSearchResult(value.split('+'), page);
    },
    _showSearchResult(value, page = 1){
        TestApp.logger.system('Route:showSearchResult');
        document.title = `Search: ${value.join(' ')}`;
        Backbone.history.navigate(`#search/${value.join("+")}/page/${page}`);
        mainRadio.request('show:searchResult', value, page);
    },
    showMain(){
        TestApp.logger.system('Route:showMain');
        document.title = `Test app`;
        mainRadio.request('show:search');
    }
});
export default Controller;