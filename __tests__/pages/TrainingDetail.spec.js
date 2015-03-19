'use strict';

jest.dontMock('../../scripts/pages/TrainingDetail.js');
jest.mock('../../scripts/stores/TrainingStore.js');
jest.mock('react-router');

var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    Immutable = require('immutable'),
    Router = require('react-router'),
    TrainingStore = require('../../scripts/stores/TrainingStore.js'),
    TrainingDetail = require('../../scripts/pages/TrainingDetail.js'),
    StubRouterContext = require('../../StubRouterContext.js');

describe("TrainingDetail", () => {
    var detail,
        wrapped,
        ContextComponent = StubRouterContext(TrainingDetail, {}, {
            getCurrentQuery: () => {
                return {
                    training: 0
                };
            }
        });
    beforeEach(() => {
        TrainingStore.getTrainingForId.mockImplementation(() => {
            return Immutable.fromJS(
                {
                    id: 0,
                    dateEnd: '01.02.2015',
                    dateStart: '01.01.2015',
                    workout: {
                        exercises: [
                            {
                                id: 1,
                                label: 'T-Bar-Rows'
                            },
                            {
                                id: 2,
                                label: 'Hammercurls'
                            },
                            {
                                id: 3,
                                label: 'Butterfly'
                            }
                        ],
                        label: 'some training'
                    },
                    sets: {
                        '1': [
                            {reps: 15, weight: 10}
                        ],
                        '2': [
                            {reps: 1, weight: 1}
                        ]
                    }
                }
            );
        });
        wrapped = TestUtils.renderIntoDocument(<ContextComponent/>);
        detail = TestUtils.findRenderedComponentWithType(wrapped, TrainingDetail);
    });

    afterEach(() => {
        TrainingStore.getTrainingForId.mockClear();
        Router.State.getQuery.mockClear();
    });

    it("renders a TrainingDetail Page", () => {
        expect(TestUtils.isCompositeComponent(detail)).toEqual(true);
        expect(detail.getDOMNode().className).toEqual('page trainingdetail');
    });

    it("renders invalid id, if there is no training for the given id", () => {
        TrainingStore.getTrainingForId.mockImplementation(() => {
            return undefined;
        });
        wrapped = TestUtils.renderIntoDocument(<ContextComponent/>);
        detail = TestUtils.findRenderedComponentWithType(wrapped, TrainingDetail);
        expect(detail.getDOMNode().textContent).toEqual('invalid Id');
    });
});

