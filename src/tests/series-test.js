var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Series = require('../../lib/series').Series;


/**
 * @test test base query
 */
var options =  {

};
describe('SeriesGetTest', function () {

    it('test series get query', function () {
        var series = new Series(options);
        var query = {
            "startDate": "2016-02-22T13:37:00Z",
            "endDate": "2016-02-22T13:40:00Z",
            "entity": "nurswgvml007",
            "metric": "mpstat.cpu_busy"
        };
        var expected_response = [
            {
                "entity": "nurswgvml007",
                "metric": "mpstat.cpu_busy",
                "tags": {},
                "type": "HISTORY",
                "aggregate": {
                    "type": "DETAIL"
                },
                "data": []
            }
        ];
        series.get(query, function (error, response, data) {
            console.log(data);
            expect(data).to.deep.equal(expected_response);
        });
    });
});