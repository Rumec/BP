from math import sqrt


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


def zpetny_pruzkum(graf, v, w, B):
   