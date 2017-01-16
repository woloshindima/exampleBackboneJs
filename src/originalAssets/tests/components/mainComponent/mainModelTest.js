import MainModel from "../../../../originalAssets/app/components/mainView/mainModel";

describe("MainModel Class", function () {
    window.TestApp = {
        logger: {
            system: a => a,
        }
    };
    let model = new MainModel();
    it("type of", function () {
        expect(typeof(model)).toBe('object');
    });
    it("defaults data", function () {
        expect(model.get('view')).toBeDefined();
    });
});