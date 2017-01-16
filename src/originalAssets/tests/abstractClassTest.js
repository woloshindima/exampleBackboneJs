import Abstract from '../app/abstractComponent/abstractComponent';

describe("Abstract Class", function() {
    // beforeEach(("./mainView/template/main-view.html"));
    let component = new Abstract({model:'testModel', collection: 'testCollection'});
    it("type of", function() {
        expect(typeof(component)).toBe('object');
    });
    it("include showIn", function() {
        expect(component.showIn).toBeDefined();
    });
    it("include destroy", function() {
        expect(component.destroy).toBeDefined();
    });
    it("not model", function() {
        expect(component.model).toBe('testModel');
    });
    it("not collection", function() {
        expect(component.collection).toBe('testCollection');
    });
});