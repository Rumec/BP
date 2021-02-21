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
        this.incrementM = this.incrementM.bind(this);
        this.setEinOfVertex = this.setEinOfVertex.bind(this);
        this.setDelta = this.setDelta.bind(this);
    }

    async setDelta(value) {
        await this.setState({
            delta: value
        })
    }

    async incrementM() {
        await this.setState(async prevState => {
            const newM = prevState.m + 1;
            return {
                m: newM
            }
        })
        //await console.log("m changed to:", this.state.m);
    }

    async addVertexToEin(successor, predecessor) {
        await this.setState(async prevState => {
            await console.log({successor, predecessor});
            await console.log({prevEin: prevState.e_in});
            await prevState.e_in[successor].push(predecessor);
            await console.log({postEin: prevState.e_in});
            return prevState;
        })
    }

    async setEinOfVertex(vertex, toBeSet) {
        await this.setState(async prevState => {
            prevState.e_in[vertex] = await toBeSet;
            return prevState;
        })
    }

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

        /*if (to === from) {
            window.alert("Cannot create loop");
        } else if (this.state.edges.some(edge => edge.from === from && edge.to === to)) {
            window.alert("Edge already exists!");
        } else if (from > this.state.numberOfVertices || to > this.state.numberOfVertices ||
            from < 1 || to < 1) {
            await window.alert("Chosen vertices do not exist in the graph!");
        } else {*/
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
        //}
        //await console.log(this.state.edges);
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

    sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    /**
     * Changing vertex with given id to specified attributes
     *
     * @param id
     * @param color
     * @param levelIncrease
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

    changeProgress() {
        this.setState(prevState => {
            return {
                inProgress: !prevState.inProgress
            };
        })
    }

    async addVisitedVertex(vertex) {
        await this.setState(prevState => {
            prevState.visited.push(vertex);
            return prevState;
        })
    }

    async clearVisitedVertices() {
        await this.setState({
            visited: []
        })
    }

    /**
     * Colors given edge to red color (used for animation of searching through edges)
     *
     * @param from - starting vertex of edge
     * @param to - ending vertex of edge
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
     * Colors whole graph to default colors
     * @returns {Promise<void>}
     */
    async colorGraphToDefault() {
        /**
         * Coloring all edges back to black
         */
        let oldEdges = await this.state.edges.slice();
        for (let i = 0; i < oldEdges.length; ++i) {
            let tmpNode = {
                from: oldEdges[0].from,
                to: oldEdges[0].to,
                color: "black",
                width: 3
            };

            await oldEdges.splice(0, 1);
            await oldEdges.push(tmpNode);
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

    setTimeoutFromInput() {
        this.setState({
            timeout: this.state.timeoutInput
        })
    }


    /**************************/

    async insertEdge() {
        let forward = false;
        let actualStatus;

        /**
         * TODO: zkulturnit
         */
        let fromVertex,
            toVertex;
        for (let i = 0; i < this.state.nodes.length; ++i) {
            if (this.state.nodes[i].id === this.state.from) {
                fromVertex = await this.state.nodes[i];
            } else if (this.state.nodes[i].id === this.state.to) {
                toVertex = await this.state.nodes[i];
            }
        }
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

        console.log("visited length", this.state.visited.length);
        console.log("delta:", this.state.delta);

        await this.addingEdge(fromVertex.id, toVertex.id);
        await this.clearVisitedVertices();
        return false;
    }

    async testOrdering(from, to) {
        /**
         * TODO: zkulturnit!!!
         */
        let fromLevel,
            toLevel;
        for (let i = 0; i < this.state.nodes.length; ++i) {
            if (this.state.nodes[i].id === from) {
                fromLevel = await this.state.nodes[i].level;
            } else if (this.state.nodes[i].id === to) {
                toLevel = await this.state.nodes[i].level;
            }
        }
        console.log("Testing ordering: fromLevel:", fromLevel, "toLevel:", toLevel);
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
            console.log("Searching backwards edge: (", predecessor, ", ", start, ")");
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

            /**
             * zkulturnit!!
             */
            for (let i = 0; i < this.state.nodes.length; ++i) {
                if (this.state.nodes[i].id === actual) {
                    actual = await this.state.nodes[i];
                }
            }

            for (let i = 0; i < this.state.followerList[actual.id].length; ++i) {

                let successor = await this.state.followerList[actual.id][i];


                /**
                 * zkulturnit!!
                 */
                for (let i = 0; i < this.state.nodes.length; ++i) {
                    if (this.state.nodes[i].id === successor) {
                        successor = await this.state.nodes[i];
                    }
                }

                // Animation
                console.log("Searching forward edge: (", actual.id, ", ", successor.id, ")");
                await this.colorEdge(actual.id, successor.id, "blue");
                await this.sleepNow(this.state.timeout);


                if (this.state.visited.includes(successor.id)) {
                    return true;
                }

                if (actual.level === successor.level) {
                    await this.addVertexToEin(successor, actual);
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

        for (let i = 0; i < this.state.nodes.length; ++i) {
            if (this.state.nodes[i].id === from) {
                from = await this.state.nodes[i];
            } else if (this.state.nodes[i].id === to) {
                to = await this.state.nodes[i];
            }
        }

        await this.addEdge();
        await console.log(this.state.edges);

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
                await console.log("cycle");
                await window.alert("Cycle detected!");

                // Adding edge which creates cycle (green color)
                await this.addEdge();
                await this.colorEdge(this.state.from, this.state.to, "green");
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

                <br/>
                <p>from: {this.state.from}, to: {this.state.to}</p>


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