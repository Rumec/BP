import React from "react";

function SparseGraph(props) {

    const status = {
        LESS_THAN_DELTA_EDGES: 0,
        CYCLE_FOUND: 1,
        MORE_THAN_DELTA_EDGES: 2
    }

    async function insertEdge() {
        let forward = false;
        let actualStatus;

        /**
         * TODO: zkulturnit
         */
        let fromVertex,
            toVertex;
        for (let i = 0; i < props.state.nodes.length; ++i) {
            if (props.state.nodes[i].id === props.state.from) {
                fromVertex = await props.state.nodes[i];
            } else if (props.state.nodes[i].id === props.state.to) {
                toVertex = await props.state.nodes[i];
            }
        }

        if (!(await testOrdering(props.state.from, props.state.to))) {
            actualStatus = await backwardSearch(props.state.from, props.state.to);
            if (actualStatus === status.CYCLE_FOUND) {
                return true;
            } else if (actualStatus === status.LESS_THAN_DELTA_EDGES && (toVertex.level < fromVertex.level)) {
                await props.changeVertex(toVertex.id, toVertex.color, fromVertex.level);
                await props.setEinOfVertex(toVertex.id, []);
                forward = true;
            } else if (actualStatus === status.MORE_THAN_DELTA_EDGES) {
                await props.changeVertex(toVertex.id, toVertex.color, fromVertex.level + 1);
                await props.setEinOfVertex(toVertex.id, []);
                await props.clearVisitedVertices();
                await props.addVisitedVertex(fromVertex.id);
                forward = true;
            }

            actualStatus = (await forwardSearch(props.state.to));

            if (forward && actualStatus) {
                return true;
            }
        }

        await console.log(props.state.visited);

        await addingEdge(props.state.from, props.state.to);
        await props.clearVisitedVertices();
        return false;
    }

    async function testOrdering(from, to) {
        /**
         * TODO: zkulturnit!!!
         */
        let fromLevel,
            toLevel;
        for (let i = 0; i < props.state.nodes.length; ++i) {
            if (props.state.nodes[i].id === from) {
                fromLevel = await props.state.nodes[i].level;
            } else if (props.state.nodes[i].id === to) {
                toLevel = await props.state.nodes[i].level;
            }
        }
        return (fromLevel < toLevel);
    }

    async function backwardSearch(start, w) {

        if (start === w) {
            return status.CYCLE_FOUND;
        }
        await props.addVisitedVertex(start);

        for (let i = 0; i < props.state.e_in[start].length; ++i) {
            const predecessor = await props.state.e_in[start][i];


            if (props.state.visited.length >= props.state.delta + 1) {
                return status.MORE_THAN_DELTA_EDGES;
            }

            if (props.state.visited.includes(predecessor)) {
                continue;
            }

            const actualStatus = await backwardSearch(predecessor, w);

            if (actualStatus === status.CYCLE_FOUND || actualStatus === status.MORE_THAN_DELTA_EDGES) {
                return actualStatus;
            }
        }
        return status.LESS_THAN_DELTA_EDGES;
    }

    async function forwardSearch(w) {
        // Simulation of set (JS set is not very smart)
        let F = [w];

        while (F.length) {
            let actual = await F.pop();

            /**
             * zkulturnit!!
             */
            for (let i = 0; i < props.state.nodes.length; ++i) {
                if (props.state.nodes[i].id === actual) {
                    actual = await props.state.nodes[i];
                }
            }

            for (let i = 0; i < props.state.followerList[actual.id].length; ++i) {
                let successor = await props.state.followerList[actual.id][i];

                /**
                 * zkulturnit!!
                 */
                for (let i = 0; i < props.state.nodes; ++i) {
                    if (props.state.nodes[i].id === successor) {
                        successor = await props.state.nodes[i];
                    }
                }

                if (props.state.visited.includes(successor.id)) {
                    return true;
                }

                if (actual.level === successor.level) {
                    props.addVertexToEin(successor, actual);
                } else if (actual.level > successor.level) {
                    await props.changeVertex(successor.id, "black", actual.level);
                    await props.setEinOfVertex(successor.id, [actual.id]);
                    await F.push(successor.id);
                }
            }
        }
        return false;
    }

    async function addingEdge(from, to) {

        for (let i = 0; i < props.state.nodes.length; ++i) {
            if (props.state.nodes[i].id === from) {
                from = await props.state.nodes[i];
            } else if (props.state.nodes[i].id === to) {
                to = await props.state.nodes[i];
            }
        }
        //await console.log("from:", from, "to:", to);

        await props.addEdge();
        await console.log(props.state.edges);

        if (from.level === to.level) {
            await props.addVertexToEin(to.id, from.id);
        }
        await console.log("edges length:", props.state.edges.length);
        //await props.incrementM();
        //await console.log("new m value:", props.state.m);
        await props.setDelta(await Math.min(await Math.sqrt(props.state.edges.length + 1),
            await Math.pow(props.state.numberOfVertices, (2 / 3))));

        await console.log("delta:", props.state.delta);

    }

    async function mainProcedure() {
        if (await insertEdge()) {
            await console.log("cycle");
            await window.alert("Cycle detected!");
        }
    }

    return (
        <div>
            <label>
                <input
                    name={"from"}
                    type={"number"}
                    value={props.state.from}
                    onChange={props.handleChange}
                />
                from
            </label>

            <label>
                <input
                    name={"to"}
                    type={"number"}
                    value={props.state.to}
                    onChange={props.handleChange}
                />
                to
            </label>

            <button
                onClick={() => {
                    mainProcedure();
                }}
            >
                Add edge
            </button>
        </div>
    )
}

export default SparseGraph;