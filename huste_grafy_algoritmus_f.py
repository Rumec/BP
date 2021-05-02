import math, heapq


class Graf:
    """
    Trida Graf obsahuje reprezentaci grafu seznamem nasledniku. Tato reprezentace je vyhodna vzhledem ke skutecnosti,
    ze mnozina out() jiz obdobu seznamu nasledniku predstavuje. Mnoziny in() a out() jsou pojmenovany e_in() a e_out(),
    protoze Python pouziva 'in' jako rezervovane slovo, out mezi rezervovana slova nepatri ale prefix 'e_' pouzijeme
    kvuli konzistenci.

    Atributy:
        n:      pocet vrcholu grafu
        delta:  hranice pro zpetny pruzkum
        k:      seznam urovni aktualne prirazeny vsem vrcholum v grafu
        e_in:   seznam obsahujici mnozinu vstupnich hran in() pro vsechny vrcholy dle definice (pro in(v) tedy plati, ze
                obsahuje takove hrany (x, v), pro ktere plati k(x) = k(v)
        e_out:  seznam obsahujici mnozinu vystupnich hran out() pro vsechny vrcholy (seznam nasledniku)
    """

    def __init__(self, vrcholy):
        """
        Konstruktor, inicializuje graf do inicialniho stavu popsaneho v praci.

        :param vrcholy: pocet vrcholu grafu, int
        """
        self.n = vrcholy

        # Inicializace urovni vsech vrcholu na 1 a nastaveni mnozin in() a out() pro vsechny vrcholy jako prazdne
        self.k = [1 for _ in range(vrcholy)]
        self.d = [0 for _ in range(vrcholy)]
        self.e_out = [[] for _ in range(vrcholy)]
        self.b = [[1 for _ in range(vrcholy)] for _ in range(vrcholy)]
        self.b = [[0 for _ in range(vrcholy)] for _ in range(vrcholy)]


def husty_graf_rychly(vrcholy, sekvence_hran):
    graf = Graf(vrcholy)

    for v, w in sekvence_hran:
        if vlozeni_hrany(graf, v - 1, w - 1):
            print("Vlozeni hrany ({}, {}) vytvorilo cyklus!".format(v, w))
            return True
    return False


def vlozeni_hrany(graf, v, w):
    graf.d[w] += 1

    if graf.k[v] < graf.k[w]:
        j = math.floor(math.log(min(graf.k[w] - graf.k[v], graf.d[w]), 2))
        if graf.d[w] == pow(2, j):
            graf.b[j][w] = graf.k[w]
            graf.c[j][w] = 0
            graf.c[j - 1, w] = 0
        heapq.heappush(graf.e_out[v], (graf.k[w], (v, w)))
        return False
    T = {(v, w)}
    while T:
        x, y = T.pop()
        if pruchod_hranou(graf, x, y, T, v):
            return True
    return False


def pruchod_hranou(graf, x, y, T, v):
    if y == v:
        return True

    if graf.k[x] >= graf.k[y]:
        graf.k[y] = graf.k[x] + 1
    else:
        j = math.floor(math.log(min(graf.k[y] - graf.k[x], graf.d[y]), 2))
        graf.c[j][y] += 1

        if graf.c[j][y] == 3 * pow(2, j):
            graf.c[j][y] = 0
            graf.k[y] = max(graf.k[y], graf.b[j][y] + pow(2, j))
            graf.b[j][y] = graf.k[y]

    while len(graf.e_out[y]) > 0 and graf.e_out[y][0][0] <= graf.k[y]:
        o = heapq.heappop(graf.e_out[y])
        T.add(o[1])
    heapq.heappush(graf.e_out[x], (graf.k[y], (x, y)))
    return False


def test_ilustrace_vypoctu():
    sekvence_hran = [(1, 2), (6, 7), (7, 8), (8, 9), (2, 3), (9, 10), (4, 5), (3, 4), (5, 6), (10, 1)]
    husty_graf_rychly(10, sekvence_hran)


if __name__ == '__main__':
    test_ilustrace_vypoctu()
