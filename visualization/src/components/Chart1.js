import React from "react";
import Graph from "react-graph-vis";

const RADIUS = 200;

class NetworkGraph extends React.Component {
    constructor(props) {
        super(props);
        this.followerList = {};
        this.visited = [];
        this.state = {
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
        this.dfs = this.dfs.bind(this);
        this.dfsRecursive = this.dfsRecursive.bind(this);
        this.colorEdgeToRed = this.colorEdgeToRed.bind(this);
        this.colorGraphToDefault = this.colorGraphToDefault.bind(this);
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
     * Generates new graph
     *
     * @returns {Promise<void>}
     */
    async generateGraph() {
        let actualAngle = 0;
        let nodesArr = [];
        //console.log(this.state.numberOfVertices);
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

            this.followerList[i] = [];

            actualAngle += (2 * Math.PI) / (this.state.numberOfVertices);
        }
        await this.setState({
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
        if (this.state.from === this.state.to) {
            window.alert("Cannot create loop");
        } else if (this.state.edges.some(edge => edge.from === this.state.from && edge.to === this.state.to)) {
            window.alert("Edge already exists!");
        }else if (this.state.from > this.state.numberOfVertices || this.state.to > this.state.numberOfVertices ||
            this.state.from < 1 || this.state.to < 1 ){
            window.alert("Chosen vertices do not exist in the graph!");
        } else {
            const oldEdges = await this.state.edges.slice();
            await oldEdges.push({
                from: parseInt(this.state.from),
                to: parseInt(this.state.to),
                color: "black",
                width: 3
            });

            await this.followerList[parseInt(this.state.from)].push(parseInt(this.state.to));
            await this.setState({
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
        await console.log(this.state.nodes);
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

    async dfsRecursive(vertex) {
        await this.visited.push(vertex);

        await this.changeVertex(vertex, "green", 1);

        for (let i = 0; i < this.followerList[vertex].length; ++i) {
            //console.log("this.followerList[vertex][i]: ", this.followerList[vertex][i]);
            if (!this.visited.includes(this.followerList[vertex][i])) {
                await this.colorEdgeToRed(vertex, this.followerList[vertex][i]);
                await this.sleepNow(500);
                await this.dfsRecursive(this.followerList[vertex][i]);
            }
        }
    }

    async dfs() {
        this.setState({
            inProgress: true
        })
        await this.dfsRecursive(1);
        await this.sleepNow(1000);
        await this.colorGraphToDefault();
        this.visited = [];
        this.setState({
            inProgress: false
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
                <p>{this.state.numberOfVertices}</p>
                <input
                    name={"numberOfVertices"}
                    type={"number"}
                    value={this.state.numberOfVertices}
                    onChange={this.handleChange}
                />
                <button
                    onClick={(!this.state.inProgress)? this.generateGraph : () => {}}
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
                    onClick={(!this.state.inProgress)? this.addEdge : () => {}}
                >
                    Add edge
                </button>

                <p>adding edge from {this.state.from} to {this.state.to}</p>

                <button
                    name={"addingEdge"}
                    onClick={(!this.state.inProgress)? this.handleChange : () => {}}
                >
                    Add edge with mouse
                </button>
                {this.DisplayAddingStatus()}
                {this.state.addingEdge ? "true" : "false"}
                <p>from: {this.state.from}, to: {this.state.to}</p>

                <button
                    onClick={(!this.state.inProgress)? this.dfs : () => {}}
                >DFS starting in 1
                </button>
            </div>

        )
    }
}


export default NetworkGraph;