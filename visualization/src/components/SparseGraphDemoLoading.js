import React from "react";

function SparseGraphDemoLoading(props) {
    async function generator() {
        await props.changeValue("sequenceToAdd", [
            [1, 2], [6, 7], [7, 8], [8, 9], [2, 3], [9, 10], [4, 5], [3, 4], [5, 6], [10, 1]
        ]);
        await props.changeValue("numberOfVertices", 10);
        await props.generateGraph();
    }

    return (
        <button
            onClick={generator}
        >
            Načíst demo
        </button>
    )
}

export default SparseGraphDemoLoading;
