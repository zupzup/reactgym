jest.dontMock('../scripts/components/Header.js');
var React = require('react/addons'),
    Router = require('react-router'),
    HeaderState = require('../scripts/stores/HeaderState'),
    HeaderStateActionCreators = require('../scripts/actions/HeaderStateActionCreators'),
    TestUtils = React.addons.TestUtils,
    Header = require('../scripts/components/Header.js');

describe("Header", function() {
    beforeEach(function() {
        HeaderState.init();
    });

    it("renders a Header", function() {
        var Context = {
            getCurrentRoutes: function() {
                return ['ello'];
            }
        };
        var header = React.withContext(Context, function() {
            return TestUtils.renderIntoDocument(<Header />);
        });
        expect(TestUtils.isCompositeComponent(header)).toEqual(true);
        expect(header.getDOMNode().className).toEqual("header");
    });

    it("renders a title, addbutton, editbutton and backbutton", function() {
        HeaderStateActionCreators.setConfig({
            back: true,
            title: {
                visible: true,
                text: 'sample'
            },
            add: {
                visible: true,
                handler: function() {}
            },
            editMode: {
                visible: true,
                handler: function() {}
            }
        });
        var Context = {
            getCurrentRoutes: function() {
                return ['ello'];
            }
        };
        var header = React.withContext(Context, function() {
            return TestUtils.renderIntoDocument(<Header />);
        });
        var backSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'back');
        var titleSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headertitle');
        var addSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeradd');
        var editSpan = TestUtils.findRenderedDOMComponentWithClass(header, 'headeredit');
        expect(backSpan.getDOMNode().textContent).toEqual('back');
        expect(titleSpan.getDOMNode().textContent).toEqual('sample');
        expect(addSpan.getDOMNode().textContent).toEqual('add');
        expect(editSpan.getDOMNode().textContent).toEqual('edit');
    });
});

