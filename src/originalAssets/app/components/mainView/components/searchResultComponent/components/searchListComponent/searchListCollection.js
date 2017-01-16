import _ from "lodash";
import moment from "moment";
import Backbone from "backbone";

const SearchListModel = Backbone.Model.extend({
    initialize() {}
});


const SearchListCollection = Backbone.Collection.extend(
    {
        initialize(model){
            TestApp.logger.system('SearchListCollection initialize');
        },
        parse: function(response) {
            return response.items;
        },
        model: SearchListModel
    }
);

export default SearchListCollection;