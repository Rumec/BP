import React from "react";
import Graph from "react-graph-vis";
import DFS from "./DFS";

const RADIUS = 200;

class NetworkGraph extends React.Component {
    constructor(props) {
        super(props);
        this.visited = [];
        this.state = {
            timeoutInput: 500,
            timeout: 500,
            followerList: {},

            e_in: {}, // list in incoming edges
            m: 0, // total number of edges in graph
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
        this.colorEdgeToRed = this.colorEdgeToRed.bind(this);
        this.colorGraphToDefault = this.colorGraphToDefault.bind(this);
        this.changeProgress = this.changeProgress.bind(this);
        this.addVisitedVertex = this.addVisitedVertex.bind(this);
        this.clearVisitedVertices = this.clearVisitedVertices.bind(this);
        this.setTimeoutFromInput = this.setTimeoutFromInput.bind(this);
    }

    handleChange(event) {
        const {name, type, value, checked} = event.target;

        (type === "checkbox") ? this.setState({[name]: checked})
            : (name === "addingEdge") ? this.setState(prevState => {
                return {
                    addingEdge: !prevState.addingEdge
                }
            })
            : this.setState({[name]: value});
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
            nodesArr.push({
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
            actualAngle += (2 * Math.PI) / (this.state.numberOfVertices);
        }
        await this.setState({
            followerList: followerList,
            nodes: nodesArr,
            edges: []
        });
    }

    /**
     * Adds new edge to graph
     *
     * @returns {Promise<void>}
     */
    async addEdge() {
        const from = parseInt(this.state.from);
        const to = parseInt(this.state.to);

        if (to === from) {
            window.alert("Cannot create loop");
        } else if (this.state.edges.some(edge => edge.from === from && edge.to === to)) {
            window.alert("Edge already exists!");
        } else if (from > this.state.numberOfVertices || to > this.state.numberOfVertices ||
            from < 1 || to < 1) {
            await window.alert("Chosen vertices do not exist in the graph!");
        } else {
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
                from: 0,
                to: 0
            });
        }
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
            await this.addEdge();
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
    async colorEdgeToRed(from, to) {
        let oldEdges = await this.state.edges.slice();
        const index = oldEdges.findIndex(item =>
            item.from === from && item.to === to
        );
        await oldEdges.splice(index, 1);
        await oldEdges.push({
                from: from,
                to: to,
                color: "red",
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

                <label>
                    <input
                        name={"from"}
                        type={"number"}
                        value={this.state.from}
                        onChange={this.handleChange}
                    />
                    from
                </label>

                <label>
                    <input
                        name={"to"}
                        type={"number"}
                        value={this.state.to}
                        onChange={this.handleChange}
                    />
                    to
                </label>

                <button
                    onClick={(!this.state.inProgress) ? this.addEdge : () => {
                    }}
                >
                    Add edge
                </button>

                <p>adding edge from {this.state.from} to {this.state.to}</p>

                <button
                    name={"addingEdge"}
                    onClick={(!this.state.inProgress) ? this.handleChange : () => {
                    }}
                >
                    Add edge with mouse
                </button>
                {this.DisplayAddingStatus()}

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

            </div>

        )
    }
}

export default NetworkGraph;
