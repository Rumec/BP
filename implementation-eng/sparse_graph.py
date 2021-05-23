from math import sqrt
import enum


class Graph:
    """
    Class Graph, representing graph. Lists of sets in() and out() are named as e_in() and e_out() because 'in' is a
    reserved keyword of Python language, out is not a reserved keyword however, we add prefix 'e_' as well for the
    sake of consistency. Constructor encapsulated initialization of variables and data structures to their default
    values.

    Attribudes:
        n:      number of vertices in graph
        m:      number of edges in graph
        delta:  bound for backward search
        k:      list of levels of all vertices
        e_in:   list containing set of entering edges in() for all vertices according to definition (this means that
                in(v) contains edges (x, v) such that k(x) = k(v)
        e_out:  list containing set of outgoing edges out() for all vertices
    """

    def __init__(self, vertex_count):
        """
        Constructor, initializes graph to its initial state described in thesis.

        :param vertex_count: number of vertices in graph
        """
        self.n = vertex_count
        self.m = 0
        self.delta = 0

        # Initialization of data structures
        self.k = [1 for _ in range(vertex_count)]
        self.e_in = [set() for _ in range(vertex_count)]
        self.e_out = [set() for _ in range(vertex_count)]


class Status(enum.Enum):
    """
    Enumeration of situations happening during backward search
    """
    Not_exceeded = 0
    Cycle_found = 1
    Exceeded = 2


def sparse_graph(vertex_count, edge_sequence):
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
    Main function for edge insertion. For the purpose of better readability and consistency with thesis, we divide this
    function into smaller functions.

    :param graph:   graph in which we are inserting an edge
    :param v:       starting vertex of an edge
    :param w:       ending vertex of an edge
    :return:        True if cycle was created
                    False otherwise
    """
    # Set of visited vertices
    B = set()
    # Flag, signaling if forward search should be made
    forward = False

    if not ordering_test(graph, v, w):
        # k(v) >= k(w), so we are proceeding with backward search
        s = backward_search(graph, v, w, B)
        # Cycle was found
        if s == Status.Cycle_found:
            return True
        elif s == Status.Not_exceeded and graph.k[w] < graph.k[v]:
            # Backward search traversed less than delta edges and k(w) < k(v)
            graph.k[w] = graph.k[v]
            graph.e_in[w] = set()
            forward = True
        elif s == Status.Exceeded:
            # Backward search traversed at least delta edges
            graph.k[w] = graph.k[v] + 1
            graph.e_in[w] = set()
            B = {v}
            forward = True
        if forward and forward_search(graph, w, B):
            # Forward search (fixing the ordering)
            return True
    # Cycle was not found so we add the edge into a graph
    edge_addition(graph, v, w)
    return False


def ordering_test(graph, v, w):
    """
    Testing if the vertices levels are in a topological ordering which rules out the possibility of creating a cycle.

    :param graph:   graph in which we are inserting an edge
    :param v:       starting vertex of an edge
    :param w:       ending vertex of an edge
    :return:        True if k(v) < k(w)
                    False otherwise
    """
    return graph.k[v] < graph.k[w]


def backward_search(graph, start, w, B):
    """
    Backward search traverses edges against their orientation. It traverses only edges (x, y) where k(x) = k(y). We are
    starting at the vertex start and we continue until we either reach vertex w, there are no more edges to be traversed
    or we traverse delta edges.

    :param graph:   graph in which we are inserting an edge
    :param start:   vertex which is searched at this moment
    :param w:       ending vertex of the inserted edge
    :param B:       set of visited vertices
    :return:        Status.Not_exceeded - less than delta edges was traversed
                    Status.Cycle_found - cycle was detected
                    Status.Exceeded - at least delta edges was traversed
    """
    if start == w:
        return Status.Cycle_found
    B.add(start)

    if len(graph.e_in[start]) == 0 and len(B) >= graph.delta + 1:
        # Edge case - we search last vertex with a particular level
        return Status.Exceeded

    for predecessor in graph.e_in[start]:
        if len(B) >= graph.delta + 1:
            # More than delta edges were traversed, we use '+ 1' because there is 1 edge less than vertices on a path
            # and we put vertices into B, not edges
            return Status.Exceeded
        if predecessor in B:
            # We search each vertex only once
            continue
        status = backward_search(graph, predecessor, w, B)
        if status == Status.Cycle_found:
            # Recursive call of backward search found a cycle
            return Status.Cycle_found
        elif status == Status.Exceeded:
            # Recursive call of backward search traversed more than delta edges
            return Status.Exceeded

    return Status.Not_exceeded


def forward_search(graph, w, B):
    """
    Forward search traverses outgoing edges from vertex x (edges in out(x) according to terminology of thesis) which
    level k(x) was increased during a forward search. Pseudo-topological ordering is fixed if needed during forward
    search.

    :param graph:   graph in which we are inserting an edge
    :param w:       ending vertex of inserted edge, we start forward search at this vertex
    :param B:       set of vertices visited during a backward search
    :return:        True if cycle was found
                    False otherwise
    """
    # Set of vertices to be searched during a forward search
    F = {w}
    while F:
        actual = F.pop()
        # Searching successors of actually searched vertex
        for successor in graph.e_out[actual]:
            if successor in B:
                # Cycle was detected - forward search found a vertex visited during a backward search
                return True
            # Fixing ordering if needed
            if graph.k[actual] == graph.k[successor]:
                graph.e_in[successor].add(actual)
            elif graph.k[actual] > graph.k[successor]:
                graph.k[successor] = graph.k[actual]
                graph.e_in[successor] = {actual}
                F.add(successor)
    return False


def edge_addition(graph, v, w):
    """
    Adding an edge (v, w) into a graph. Function is also responsible for updating value of delta and count of edges.

    :param graph:   graph in which we are inserting an edge
    :param v:       starting vertex of inserted edge
    :param w:       ending vertex of inserted edge
    """
    graph.e_out[v].add(w)
    if graph.k[v] == graph.k[w]:
        graph.e_in[w].add(v)
    graph.m += 1
    graph.delta = min(sqrt(graph.m), pow(graph.n, 2 / 3))


def test_of_illustration_of_computation_sparse_graph():
    """
    Insertion of testing edge sequence. This is the same sequence used as example in thesis.
    """
    edge_sequence = [(1, 2), (6, 7), (7, 8), (8, 9), (2, 3), (9, 10), (4, 5), (3, 4), (5, 6), (10, 1)]
    sparse_graph(10, edge_sequence)


if __name__ == '__main__':
    test_of_illustration_of_computation_sparse_graph()
