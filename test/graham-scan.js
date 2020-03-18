
import assert from "assert";
import mocha from "mocha";
import GrahamScan from "../graham-scan.mjs";

const {describe, it} = mocha;

describe("Graham scan", function () {

    it("should ignore single point", function () {
        const scan = new GrahamScan();
        scan.addPoint([1,0]);
        const hull = scan.getHull();
        assert.deepStrictEqual(hull, []);
    });

    it("should ignore only two points", function () {
        const scan = new GrahamScan();
        scan.addPoint([1,0], [0,0]);
        const hull = scan.getHull();
        assert.deepStrictEqual(hull, []);
    });

    it("should wrap triangle", function () {
        const scan = new GrahamScan();
        scan.setPoints([[1,0], [0,1], [2,1]]);  // clockwise on purpose
        const hull = scan.getHull();
        assert.deepStrictEqual(hull,
            [[1,0], [2,1], [0,1]],  // hull expected to be counter-clockwise
            `actual: ${hull.toString()}`);
    });

    it("should wrap triangle with point inside", function () {
        const scan = new GrahamScan();
        const inside = [1,.5];  // won't be part of the hull
        scan.setPoints([[1,0], [0,1], [2,1], inside]);
        const hull = scan.getHull();
        assert.deepStrictEqual(hull,
            [[1,0], [2,1], [0,1]],  // hull expected to be counter-clockwise
            `actual: ${hull.toString()}`);
    });

    it("should wrap triangle with extra point over one edge", function () {
        const scan = new GrahamScan();
        const extra = [1,1];  // over the edge between 2,1 and 0,1, but should still be included
        scan.setPoints([[1,0], [0,1], [2,1], extra]);
        const hull = scan.getHull();
        assert.deepStrictEqual(hull,
            [[1,0], [2,1], extra, [0,1]],  // hull expected to be counter-clockwise
            `actual: ${hull.toString()}`);
    });

    it("should wrap triangle with duplicated vertex", function () {
        const scan = new GrahamScan();
        const duplicate = [2,1];
        scan.setPoints([[1,0], [0,1], [2,1], duplicate]);
        const hull = scan.getHull();
        assert.deepStrictEqual(hull,
            [[1,0], [2,1], [0,1]],  // hull expected to be counter-clockwise
            `actual: ${hull.toString()}`);
    });
});
