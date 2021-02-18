import React from "react";


function DFS(props) {

    async function dfsRecursive(vertex) {
        await props.addVisitedVertices(vertex);
        await props.changeVertex(vertex, "green", 1);
        for (let i = 0; i < props.state.followerList[vertex].length; ++i) {
            if (!props.state.visited.includes(props.state.followerList[vertex][i])) {
                await props.colorEdgeToRed(vertex, props.state.followerList[vertex][i]);
                await props.sleepNow(props.state.timeout);
                await dfsRecursive(props.state.followerList[vertex][i]);
            }
        }
    }

    async function dfs() {
        props.changeProgress()
        await dfsRecursive(1);
        await props.sleepNow(props.state.timeout);
        await props.colorGraphToDefault();
        await props.clearVisitedVertices();
        props.changeProgress()
    }

    return (
        <button
            onClick={(!props.state.inProgress && props.state.nodes.length !== 0)? dfs : () => {}}
        >
            DFS from 1
        </button>
    )
}

export default DFS;
