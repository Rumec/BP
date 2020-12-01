from math import sqrt
from collections import deque


class Graph:
    """Trida Graph drzi graf reprezentovany seznamem nasledniku.
    """

    def __init__(self, vrcholy):
        """
        Konstruktor, inicializuje graf do iniciálního stavu popsaného v práci

        :param vrcholy: pocet vrcholu grafu
        """
        self.n = vrcholy  # Pocet vrcholu
        self.m = 0  # Pocet hran (inicialne 0)
        self.delta = min(round(sqrt(self.m)), round(pow(self.n, 2 / 3)))

        self.k = dict()  # Slovnik obsahujici urovne aktualne prirazene vsem vrcholum
        self.e_in = dict()  # Slovnik obsahujici mnozinu vstupnich hran pro kazdy vrchol
        self.e_out = dict()  # Slovnik obsahujici mnozinu vystupnich hran pro kazdy vrchol, jde o seznam nasledniku
        # Inicializace urovni vsech vrcholu na 1 a nastavení množin in() a out() jako prázdné
        for i in range(vrcholy):
            self.k[i] = 1
            self.e_in[i] = set()
            self.e_out[i] = set()


def vloz_hranu(graf, hrana):
    v, w = hrana  # 'v' a 'w' predstavuji vrcholy, mezi ktere hranu pridavame
    B = set()  # Mnozina navstivenych vrcholu


def test_usporadani(graf, v, w):
    return graf.k[v] < graf.k[w]


def zpetny_pruzkum(graf, start, w, B):
    if start == w:
        return 1
    B.add(start)


def rekurzivni_zpetny_pruzkum(graf, start, w, B):
    """
    Princip DFS

    :param graf:
    :param start:
    :param w:
    :param B:
    :return:    0 - prosel mene nez delta hran
                1 - narazil na vrchol w -> oznamuje cyklus
                2 - prosel vice net delta hran
    """
    if start == w:
        return 1
    B.add(start)
    for naslednik in graf.e_out[start]:
        if len(B) >= graf.delta:
            return 2
        # Preskoci opetovny pruzkum jiz prozkoumanych vrcholu
        if naslednik in B:
            continue
        if rekurzivni_zpetny_pruzkum(graf, naslednik, w, B) == 1:
            return 1
    return 0


def iterativni_dopredny_pruzkum(graf, w, B):
    F = {w}
    while F:
        a = F.pop()
        for b in graf.e_out[a]:
            if b in B:
                return True
            if graf.k[a] == graf.k[b]:
                graf.e_in[b].add(a)
            elif graf.k[a] > graf.k[b]:
                graf.k[b] = graf.k[a]
                graf.e_in[b] = {a}
                F.add(b)
    return False
