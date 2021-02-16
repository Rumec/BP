import React from "react";
import Graph from "react-graph-vis";

const RADIUS = 200;

class NetworkGraph extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef(); // Creates reference - it'll rerender automatically like any other React component
        this.followerList = {};
        this.visited = [];
        this.state = {
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
        this.colorEdges = this.colorEdges.bind(this);
        this.dfs = this.dfs.bind(this);
        this.dfsRecursive = this.dfsRecursive.bind(this);
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

    async generateGraph() {
        let actualAngle = 0;
        let nodesArr = [];
        //console.log(this.state.numberOfVertices);
        for (let i = 1; i <= this.state.numberOfVertices; ++i) {
            nodesArr.push({
                id: i,
                label: i.toString(),
                title: i.toString(),
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

    async addEdge() {
        if (this.state.from === this.state.to) {
            window.alert("Cannot create loop");
        } else if (this.state.edges.some(edge => edge.from === this.state.from && edge.to === this.state.to)) {
            window.alert("Edge already exists!");
        } else {
            const oldEdges = await this.state.edges.slice();
            await oldEdges.push({
                from: parseInt(this.state.from),
                to: parseInt(this.state.to),
                color: "green",
                width: 3
            });

            await this.followerList[parseInt(this.state.from)].push(parseInt(this.state.to));
            await this.setState({
                edges: oldEdges,
                from: 0,
                to: 0
            });
        }
        //console.log(this.state.edges);
        //console.log(this.followerList);
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

    async selectVertex(event) {
        const {nodes} = event;

        /**
         * Changing node
         */
        await this.setState(prevState => {
            prevState.nodes = prevState.nodes.map(node => {
                if (node.id === nodes[0]) {
                    node = {
                        id: node.id,
                        label: "Clicked",
                        title: "Clicked"
                    }
                }
                return node;
            })
            return {
                nodes: prevState.nodes
            };
        })

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


    async colorEdges() {
        for (let i = 0; i < this.state.edges.length; ++i) {
            //console.log(i);

            const f = await this.state.edges[0].from;
            const t = await this.state.edges[0].to;

            // create copy of actual list of edges
            let oldEdges = await this.state.edges.slice();
            // deleting actual edge
            await oldEdges.splice(0, 1);
            // changing color of actual edge to blue
            await oldEdges.push({
                    from: f,
                    to: t,
                    color: "black",
                    width: 3
                }
            )

            await this.setState({
                edges: oldEdges,
            });

            //await this.sleepNow(500);
        }
    }

    async dfsRecursive(vertex) {
        this.visited.push(vertex);
        for (let i = 0; i < this.followerList[vertex].length; ++i) {
            //console.log("this.followerList[vertex][i]: ", this.followerList[vertex][i]);
            if (!this.visited.includes(this.followerList[vertex][i])) {
                let oldEdges = await this.state.edges.slice();
                const index = oldEdges.findIndex(item =>
                    item.from === vertex && item.to === this.followerList[vertex][i]
                );
                await oldEdges.splice(index, 1);
                await oldEdges.push({
                        from: vertex,
                        to: this.followerList[vertex][i],
                        color: "red",
                        width: 3
                    }
                )
                await this.setState({
                    edges: oldEdges,
                });
                await this.sleepNow(500);
                await this.dfsRecursive(this.followerList[vertex][i]);
            }
        }
    }

    async dfs() {
        await this.dfsRecursive(1);
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
                    getNetwork={network => this.setState({network})}
                />
                <p>{this.state.numberOfVertices}</p>
                <input
                    name={"numberOfVertices"}
                    type={"number"}
                    value={this.state.numberOfVertices}
                    onChange={this.handleChange}
                />
                <button
                    onClick={this.generateGraph}
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
                    onClick={this.addEdge}
                >
                    Add edge
                </button>

                <p>adding edge from {this.state.from} to {this.state.to}</p>

                <button
                    name={"addingEdge"}
                    onClick={this.handleChange}
                >
                    Add edge with mouse
                </button>
                {this.DisplayAddingStatus()}
                {this.state.addingEdge ? "true" : "false"}
                <p>from: {this.state.from}, to: {this.state.to}</p>

                <button
                    onClick={this.dfs}
                >DFS starting in 1
                </button>
            </div>

        )
    }
}


export default NetworkGraph;