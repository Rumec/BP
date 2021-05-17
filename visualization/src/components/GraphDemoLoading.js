import React from "react";

function GraphDemoLoading(props) {
    async function generator() {
        if (props.state.graphType === "sparse") {
            await props.changeValue("sequenceToAdd", [
                [1, 2], [6, 7], [7, 8], [8, 9], [2, 3], [9, 10], [4, 5], [3, 4], [5, 6], [10, 1]
            ]);
            await props.changeValue("numberOfVertices", 10);
            await props.changeValue("numberOfVerticesInput", 10);
        } else {
            await props.changeValue("sequenceToAdd", [
                [1, 2], [1, 4], [3, 4], [2, 3], [5, 6], [5, 7], [6, 7], [4, 5], [1, 3], [7, 4]
            ]);
            await props.changeValue("numberOfVerticesInput", 7);
            await props.changeValue("numberOfVertices", 7);
        }
        await props.generateGraph();
    }

    return (
        <button
            onClick={props.state.inProgress? () => {} : generator}
        >
            Načíst demo
        </button>
    )
}

export default GraphDemoLoading;
