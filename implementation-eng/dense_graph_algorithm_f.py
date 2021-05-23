import heapq
import math


class Graph:
    """
    Class Graph, representing graph. List out() is named as e_out() for better consistency with implementation of
    algorithm for sparse graphs. Constructor of the class encapsulates initialization of variables and data
    structures to their default values.

    Attributes:
        n:      number of vertices in graph
        k:      list of levels of all vertices
        d:      list of all in-degrees of all vertices
        e_out:  list containing priority queues (min-heaps) of outgoing edges out() for all vertices
        b:      list of bounds of vertices level for specific span
        c:      count of visits of vertices for specific span

    """

    def __init__(self, vertex_count):
        """
        Constructor, initializes graph to its initial state described in thesis.

        :param vertex_count: number of vertices in graph
        """
        self.n = vertex_count

        # Initialization of data structures
        self.k = [1 for _ in range(vertex_count)]
        self.d = [0 for _ in range(vertex_count)]
        self.e_out = [[] for _ in range(vertex_count)]
        self.b = [[1 for _ in range(vertex_count)] for _ in range(vertex_count)]
        self.c = [[0 for _ in range(vertex_count)] for _ in range(vertex_count)]


def dense_graph_fast(vertex_count, edge_sequence):
    """
    Main function of the algorithm. Initialization of variables and data structures is encapsulated inside a constructor
    of graph object. Function prints to the console the edge which will create a cycle.

    :param vertex_count:    number of vertices in graph
    :param edge_sequence:   sequence of edges to be inserted, list of tuples
    :return:                True, if cycle was created
                            False otherwise
    """
    graph = Graph(vertex_count)

    for v, w in edge_sequence:
        # We subtract 1 from vertex name because Python starts indexing at 0
        if edge_insertion(graph, v - 1, w - 1):
            print("Insertion of edge ({}, {}) has created a cycle!".format(v, w))
            return True
    return False


def edge_insertion(graph, v, w):
    """
    Main function for edge insertion. For the purpose of better readability and consistency with thesis, we create
    a separate function for edge traversal.

    :param graph:   graph in which we are inserting an edge
    :param v:       starting vertex of an edge
    :param w:       ending vertex of an edge
    :return:        True if cycle was created
                    False otherwise
    """
    # Increasing in-degree of vertex w
    graph.d[w] += 1

    if graph.k[v] < graph.k[w]:
        # Weak topological ordering was not broken

        # Calculating a span of edge traversal
        j = math.floor(math.log(min(graph.k[w] - graph.k[v], graph.d[w]), 2))
        if graph.d[w] == pow(2, j):
            # There is a new value for span possible
            graph.b[j][w] = graph.k[w]
            graph.c[j][w] = 0
            graph.c[j - 1][w] = 0
        # Inserting the edge into a priority queue of outgoing edges of vertex v together with approximate outgoing
        # level of an edge k_out
        heapq.heappush(graph.e_out[v], (graph.k[w], (v, w)))
        return False
    # Set of candidate edges to be traversed
    T = {(v, w)}
    while T:
        x, y = T.pop()
        if traversal_step(graph, x, y, T, v):
            # Cycle was detected
            return True
    return False


def traversal_step(graph, x, y, T, v):
    """
    Traversing an edge. This function is fixing level of ending edge if the weak topological ordering is broken. It also
    does update of approximate outgoing level of an edge k_out.

    :param graph:   object representing graph
    :param x:       starting vertex of an edge
    :param y:       ending vertex of an edge
    :param T:       set of candidate edges to be traversed
    :param v:       starting vertex of inserted edge
    :return:        True if cycle was detected
                    False otherwise
    """
    if y == v:
        # Cycle was detected
        return True

    if graph.k[x] >= graph.k[y]:
        # Fixing weak topological ordering
        graph.k[y] = graph.k[x] + 1
    else:
        # Calculating a span of edge traversal
        j = math.floor(math.log(min(graph.k[y] - graph.k[x], graph.d[y]), 2))
        graph.c[j][y] += 1

        if graph.c[j][y] == 3 * pow(2, j):
            # Using an estimation for increasing of a vertex level (vertex level is not breaking weak topological
            # ordering)
            graph.c[j][y] = 0
            graph.k[y] = max(graph.k[y], graph.b[j][y] + pow(2, j))
            graph.b[j][y] = graph.k[y]

    # Adding all outgoing edges from vertex y with approximate outgoing level lower or equal to level k(y) into set of
    # candidate edges to be traversed T
    while len(graph.e_out[y]) > 0 and graph.e_out[y][0][0] <= graph.k[y]:
        o = heapq.heappop(graph.e_out[y])
        T.add(o[1])
    heapq.heappush(graph.e_out[x], (graph.k[y], (x, y)))
    return False


def test_of_illustration_of_computation_dense_graph():
    """
    Insertion of testing edge sequence. This is the same sequence used as example in thesis.
    """
    edge_sequence = [(1, 2), (1, 4), (3, 4), (2, 3), (5, 6), (5, 7), (6, 7), (4, 5), (1, 3), (7, 4)]
    dense_graph_fast(7, edge_sequence)


if __name__ == '__main__':
    test_of_illustration_of_computation_dense_graph()
