import React from "react";
import Graph from "react-graph-vis";
//import DFS from "./DFS";
import SparseGraph from "./SparseGraph";

const RADIUS = 200;

class NetworkGraph extends React.Component {
    constructor(props) {
        super(props);
        this.visited = [];
        this.status = {
            LESS_THAN_DELTA_EDGES: 0,
            CYCLE_FOUND: 1,
            MORE_THAN_DELTA_EDGES: 2
        }

        this.state = {
            timeoutInput: 500,
            timeout: 500,
            followerList: {},

            e_in: {}, // JSON of lists in incoming edges
            delta: 0,

            inProgress: false,
            visited: [],
            addingEdge: false,
            from: 0,
            to: 0,
            numberOfVertices: 0,
            nodes: [],
            edges: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.generateGraph = this.generateGraph.bind(this);
        this.addEdge = this.addEdge.bind(this);
        this.changeVertex = this.changeVertex.bind(this);
        this.colorEdge = this.colorEdge.bind(this);
        this.colorGraphToDefault = this.colorGraphToDefault.bind(this);
        this.changeProgress = this.changeProgress.bind(this);
        this.addVisitedVertex = this.addVisitedVertex.bind(this);
        this.clearVisitedVertices = this.clearVisitedVertices.bind(this);
        this.setTimeoutFromInput = this.setTimeoutFromInput.bind(this);
        this.addVertexToEin = this.addVertexToEin.bind(this);
        this.setEinOfVertex = this.setEinOfVertex.bind(this);
        this.setDelta = this.setDelta.bind(this);
    }

    /**
     * Sets new value of delta
     *
     * @param value - New value to be set
     * @returns {Promise<void>}
     */
    async setDelta(value) {
        await this.setState({
            delta: value
        })
    }

    /**
     * Adds a vertex to the e_in set
     *
     * @param successor - Vertex which e_in should be expanded
     * @param predecessor - Vertex to be added
     * @returns {Promise<void>}
     */
    async addVertexToEin(successor, predecessor) {
        const oldEin = await this.state.e_in;
        await oldEin[successor].push(predecessor);
        await this.setState({
            e_in: oldEin,
        });
    }

    /**
     * Sets the set of incoming edges to be the value given as parameter
     *
     * @param vertex - ID of vertex which e_in should be changed
     * @param toBeSet - New value of e_in
     * @returns {Promise<void>}
     */
    async setEinOfVertex(vertex, toBeSet) {
        await this.setState(async prevState => {
            prevState.e_in[vertex] = await toBeSet;
            return prevState;
        })
    }

    /**
     * Handles changes of the controllers
     *
     * @param event - Object returned by event
     */
    handleChange(event) {
        const {name, type, value, checked} = event.target;

        //if (name === "from" || name === "to") {
        this.setState({
            [name]: parseInt(value)
        })
        //}

        /*
        (type === "checkbox") ? this.setState({[name]: checked})
            : (name === "addingEdge") ? this.setState(prevState => {
                return {
                    addingEdge: !prevState.addingEdge
                }
            })
            : this.setState({[name]: value});

         */
    }

    /**
     * Generates new graph, sets levels of all vertices to 1
     *
     * @returns {Promise<void>}
     */
    async generateGraph() {
        let actualAngle = 0;
        let nodesArr = [];
        let followerList = {};
        let e_in = {};
        for (let i = 1; i <= this.state.numberOfVertices; ++i) {
            await nodesArr.push({
                id: i,
                level: 1,
                label: i.toString() + ", 1",
                title: i.toString(),
                color: "#34e1eb",
                x: RADIUS * Math.sin(actualAngle),
                y: RADIUS * Math.cos(actualAngle)
            });
            followerList[i] = [];
            e_in[i] = []; // initializing list of incoming edges
            actualAngle += await (2 * Math.PI) / (this.state.numberOfVertices);
        }
        await this.setState({
            followerList: followerList,
            e_in: e_in,
            nodes: nodesArr,
            edges: [],
            delta: 0
        });
        //console.log(this.state.nodes);
    }

    /**
     * Adds new edge to graph
     *
     * @returns {Promise<void>}
     */
    async addEdge() {
        const from = parseInt(this.state.from);
        const to = parseInt(this.state.to);

        const oldEdges = await this.state.edges.slice();
        await oldEdges.push({
            from: from,
            to: to,
            color: "black",
            width: 3
        });

        const oldFollowerList = await this.state.followerList;
        await oldFollowerList[from].push(to);
        await this.setState({
            followerList: oldFollowerList,
            edges: oldEdges,
        });
    }

    DisplayAddingStatus() {
        if (this.state.addingEdge && this.state.from === 0) {
            return (
                <p>Select starting vertex</p>
            );
        } else if (this.state.addingEdge && this.state.from !== 0) {
            return (
                <p>Select ending vertex</p>
            );
        } else {
            return (<p>doing nothing</p>);
        }
    }

    /**
     * Action performed after node is selected via mouse click
     *
     * @param event - Event provided by mouse click
     * @returns {Promise<void>}
     */
    async selectVertex(event) {
        const {nodes} = event;

        if (this.state.addingEdge && this.state.from !== 0) {
            await this.setState({
                to: nodes[0],
                addingEdge: false
            });
            //await this.addEdge();
        }
        await this.setState({
            from: nodes[0]
        })

    }

    /**
     * Stops program for specified amount of time
     *
     * @param sleepTime - Time to sleep
     * @returns {Promise<unknown>}
     */
    sleepNow = (sleepTime) => new Promise((r) => setTimeout(r, sleepTime));

    /**
     * Changing parameters of vertex with given id to specified attributes
     *
     * @param id - ID of the node to be changed
     * @param color - Color to be set
     * @param levelIncrease - Value by which nodes level should be increased
     * @returns {Promise<void>}
     */
    async changeVertex(id, color, levelIncrease) {
        await this.setState(prevState => {
            prevState.nodes = prevState.nodes.map(node => {
                if (node.id === id) {
                    return {
                        id: id,
                        level: node.level + levelIncrease,
                        label: id.toString() + ", " + (node.level + levelIncrease).toString(),
                        title: node.title,
                        color: color
                    }
                }
                return node;
            })
            return {
                nodes: prevState.nodes
            };
        })
    }

    /**
     * Changes inProgress flag
     */
    changeProgress() {
        this.setState(prevState => {
            return {
                inProgress: !prevState.inProgress
            };
        })
    }

    /**
     * Adds vertex to set of visited vertices
     *
     * @param vertex - ID of vertex to be added
     * @returns {Promise<void>}
     */
    async addVisitedVertex(vertex) {
        await this.setState(prevState => {
            prevState.visited.push(vertex);
            return prevState;
        })
    }

    /**
     * Clears set of visited vertices
     *
     * @returns {Promise<void>}
     */
    async clearVisitedVertices() {
        await this.setState({
            visited: []
        })
    }

    /**
     * Colors given edge to red color (used for animation of searching through edges)
     *
     * @param from - Starting vertex of edge
     * @param to - Ending vertex of edge
     * @param color - Color of the edge
     * @returns {Promise<void>}
     */
    async colorEdge(from, to, color) {
        let oldEdges = await this.state.edges.slice();
        const index = oldEdges.findIndex(item =>
            item.from === from && item.to === to
        );
        await oldEdges.splice(index, 1);
        await oldEdges.push({
                from: from,
                to: to,
                color: color,
                width: 3
            }
        )
        await this.setState({
            edges: oldEdges,
        });
    }

    /**
     * Colors whole graph back to default colors
     *
     * @returns {Promise<void>}
     */
    async colorGraphToDefault() {
        /**
         * Coloring all edges back to black
         */
        let oldEdges = await this.state.edges.slice();
        for (let i = 0; i < oldEdges.length; ++i) {
            let tmpEdge = {
                from: oldEdges[0].from,
                to: oldEdges[0].to,
                color: "black",
                width: 3
            };

            await oldEdges.splice(0, 1);
            await oldEdges.push(tmpEdge);
        }

        await this.setState({
            edges: oldEdges,
        });

        /**
         * Coloring all vertices to default
         */
        await this.setState(prevState => {
            prevState.nodes = prevState.nodes.map(node => {
                node = {
                    id: node.id,
                    level: node.level,
                    label: node.label,
                    title: node.title,
                    color: "#34e1eb"
                }
                return node;
            })
            return {
                nodes: prevState.nodes
            };
        })
    }

    /**
     * Sets value of pause using value in number input
     */
    setTimeoutFromInput() {
        this.setState({
            timeout: this.state.timeoutInput
        })
    }


    /**************************/

    /**
     * Main procedure of algorithm for sparse graphs
     *
     * @returns {Promise<boolean>}
     */
    async insertEdge() {
        let forward = false;
        let actualStatus;

        let fromVertex = this.state.nodes[this.state.nodes.findIndex(node => node.id === this.state.from)],
            toVertex = this.state.nodes[this.state.nodes.findIndex(node => node.id === this.state.to)];

        await this.changeVertex(fromVertex.id, "orange", 0);
        await this.changeVertex(toVertex.id, "orange", 0);

        await this.sleepNow(this.state.timeout);

        await console.log("fromVertex:", fromVertex, "toVertex:", toVertex);

        if (!(await this.testOrdering(this.state.from, this.state.to))) {
            actualStatus = await this.backwardSearch(fromVertex.id, toVertex.id);
            console.log("actual status:", actualStatus);
            if (actualStatus === this.status.CYCLE_FOUND) {
                return true;
            } else if (actualStatus === this.status.LESS_THAN_DELTA_EDGES && (toVertex.level < fromVertex.level)) {

                await this.changeVertex(toVertex.id, "orange", (fromVertex.level - toVertex.level));
                await this.setEinOfVertex(toVertex.id, []);
                forward = true;
            } else if (actualStatus === this.status.MORE_THAN_DELTA_EDGES) {

                await this.changeVertex(toVertex.id, "orange", ((fromVertex.level - toVertex.level) + 1));
                await this.setEinOfVertex(toVertex.id, []);
                await this.clearVisitedVertices();
                await this.addVisitedVertex(fromVertex.id);
                forward = true;
            }

            if (forward) {
                actualStatus = (await this.forwardSearch(this.state.to));
                if (actualStatus) {
                    return true;
                }
            }
        }

        await this.colorGraphToDefault();

        await this.addingEdge(fromVertex.id, toVertex.id);
        await this.clearVisitedVertices();
        return false;
    }

    async testOrdering(from, to) {
        let fromLevel = this.state.nodes[this.state.nodes.findIndex(node => node.id === from)].level,
            toLevel = this.state.nodes[this.state.nodes.findIndex(node => node.id === to)].level;

        await this.sleepNow(this.state.timeout);
        return (fromLevel < toLevel);
    }

    async backwardSearch(start, w) {

        if (start === w) {
            return this.status.CYCLE_FOUND;
        }
        await this.addVisitedVertex(start);

        for (let i = 0; i < this.state.e_in[start].length; ++i) {
            let predecessor = await this.state.e_in[start][i];

            if (this.state.visited.length > this.state.delta /* + 1 */) {
                return this.status.MORE_THAN_DELTA_EDGES;
            }

            if (this.state.visited.includes(predecessor)) {
                continue;
            }

            // Coloring backward-searched edges
            //console.log("Searching backwards edge: (", predecessor, ", ", start, ")");
            await this.colorEdge(predecessor, start, "red");
            await this.sleepNow(this.state.timeout);

            let actualStatus = await this.backwardSearch(predecessor, w);

            if (actualStatus === this.status.CYCLE_FOUND || actualStatus === this.status.MORE_THAN_DELTA_EDGES) {
                return actualStatus;
            }
        }
        return this.status.LESS_THAN_DELTA_EDGES;
    }

    async forwardSearch(w) {
        // Simulation of set (JS set is not very smart)
        let F = [w];

        while (F.length) {
            let actual = await F.pop();
            actual = this.state.nodes[this.state.nodes.findIndex(node => node.id === actual)];

            for (let i = 0; i < this.state.followerList[actual.id].length; ++i) {

                let successor = await this.state.followerList[actual.id][i];
                successor = this.state.nodes[this.state.nodes.findIndex(node => node.id === successor)];

                // Animation
                //console.log("Searching forward edge: (", actual.id, ", ", successor.id, ")");
                await this.colorEdge(actual.id, successor.id, "blue");
                await this.sleepNow(this.state.timeout);

                if (this.state.visited.includes(successor.id)) {
                    return true;
                }

                if (actual.level === successor.level) {
                    await this.addVertexToEin(successor.id, actual.id);
                } else if (actual.level > successor.level) {
                    await this.changeVertex(successor.id, successor.color, (actual.level - successor.level));
                    await this.setEinOfVertex(successor.id, [actual.id]);
                    await F.push(successor.id);
                }
            }
        }
        return false;
    }

    async addingEdge(from, to) {

        from = this.state.nodes[this.state.nodes.findIndex(node => node.id === from)];
        to = this.state.nodes[this.state.nodes.findIndex(node => node.id === to)];

        await this.addEdge();

        if (from.level === to.level) {
            await this.addVertexToEin(to.id, from.id);
        }
        await this.setDelta(await Math.min(await Math.sqrt(this.state.edges.length),
            await Math.pow(this.state.nodes.length, (2 / 3))));
    }

    async mainProcedure() {
        if (!this.state.inProgress) {
            const from = parseInt(this.state.from);
            const to = parseInt(this.state.to);

            await this.changeProgress();

            if (to === from) {
                window.alert("Cannot create loop");
            } else if (this.state.edges.some(edge => edge.from === from && edge.to === to)) {
                window.alert("Edge already exists!");
            } else if (from > this.state.numberOfVertices || to > this.state.numberOfVertices ||
                from < 1 || to < 1) {
                await window.alert("Chosen vertices do not exist in the graph!");
            } else if (await this.insertEdge()) {
                // Adding edge which creates cycle (green color)
                await this.addEdge();
                await this.colorEdge(this.state.from, this.state.to, "green");

                await console.log("cycle");
                await window.alert("Cycle detected!");
            }

            await this.changeProgress();
        }

    }

    /**************************/

    render() {
        const graph = {nodes: this.state.nodes, edges: this.state.edges};

        const options = {
            layout: {
                //hierarchical: true
            },
            edges: {
                color: "#000000"
            },
            physics: {
                enabled: false
            },
            height: "500px",
        };

        const events = {
            // arrow function can access scope of whole component class
            selectNode: async (event) => {
                await this.selectVertex(event)
            },

            dragStart: async (event) => {
                await this.selectVertex(event)
            }
        };
        return (
            <div>

                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                />
                <input
                    name={"numberOfVertices"}
                    type={"number"}
                    value={this.state.numberOfVertices}
                    onChange={this.handleChange}
                />
                <button
                    onClick={(!this.state.inProgress) ? this.generateGraph : () => {
                    }}
                >
                    Generuj graf
                </button>

                <br/>


                <p>adding edge from {this.state.from} to {this.state.to}</p>


                <br/>

                <div>
                    <label>
                        <input
                            name={"from"}
                            type={"number"}
                            value={this.state.from}
                            onChange={(!this.state.inProgress) ? this.handleChange : () => {
                            }}
                        />
                        from
                    </label>

                    <label>
                        <input
                            name={"to"}
                            type={"number"}
                            value={this.state.to}
                            onChange={(!this.state.inProgress) ? this.handleChange : () => {
                            }}
                        />
                        to
                    </label>

                    <button
                        onClick={() => {
                            this.mainProcedure();
                        }}
                    >
                        Add edge
                    </button>
                </div>


                <br/>
                <br/>
                <label>
                    <input
                        name={"timeoutInput"}
                        type={"number"}
                        value={this.state.timeoutInput}
                        onChange={this.handleChange}
                    />
                    Timeout
                </label>
                <button
                    onClick={this.setTimeoutFromInput}
                >
                    Set timeout
                </button>
            </div>

        )
    }
}

export default NetworkGraph;


/*
                <DFS
                    state={this.state}
                    changeProgress={this.changeProgress}
                    colorGraphToDefault={this.colorGraphToDefault}
                    sleepNow={this.sleepNow}
                    visited={this.visited}
                    colorEdgeToRed={this.colorEdgeToRed}
                    changeVertex={this.changeVertex}
                    addVisitedVertices={this.addVisitedVertex}
                    clearVisitedVertices={this.clearVisitedVertices}
                />

                <button
                    name={"addingEdge"}
                    onClick={(!this.state.inProgress) ? this.handleChange : () => {
                    }}
                >
                    Add edge with mouse
                </button>

                {this.DisplayAddingStatus()}

                <button
                    name={"addingEdge"}
                    onClick={(!this.state.inProgress) ? this.handleChange : () => {
                    }}
                >
                    Add edge with mouse
                </button>

                 <button
                    onClick={(!this.state.inProgress) ? this.addEdge : () => {
                    }}
                >
                    Add edge
                </button>



                <SparseGraph
                    state={this.state}
                    sleepNow={this.sleepNow}
                    handleChange={this.handleChange}
                    colorGraphToDefault={this.colorGraphToDefault}
                    colorEdgeToRed={this.colorEdgeToRed}
                    changeProgress={this.changeProgress}
                    changeVertex={this.changeVertex}
                    addVisitedVertex={this.addVisitedVertex}
                    clearVisitedVertices={this.clearVisitedVertices}
                    addVertexToEin={this.addVertexToEin}
                    setEinOfVertex={this.setEinOfVertex}
                    addEdge={this.addEdge}
                    incrementM={this.incrementM}
                    setDelta={this.setDelta}
                />
 */