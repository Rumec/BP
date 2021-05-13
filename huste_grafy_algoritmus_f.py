import heapq
import math


class Graf:
    """
    Trida Graf obsahuje reprezentaci grafu. Zaroven v sobe zapouzdruje datove struktury a promenne algoritmu.

    Atributy:
        n:      pocet vrcholu grafu
        k:      seznam urovni aktualne prirazeny vsem vrcholum v grafu
        d:      seznam vstupnich stupnu vsech vrcholu
        e_out:  seznam obsahujici prioritni frontu (minimovou haldu) vystupnich hran out() pro vsechny vrcholy, prefix
                e_ pouzivame pro konzistenci s implementaci algoritmu pro ridke grafy
        b:      seznam mezi vrcholu pri danem rozsahu pruchodu
        c:      pocet navstev vrcholu pri danem rozsahu pruchodu

    """

    def __init__(self, vrcholy):
        """
        Konstruktor, inicializuje graf do inicialniho stavu popsaneho v praci.

        :param vrcholy: pocet vrcholu grafu, int
        """
        self.n = vrcholy

        # Inicializace datovych struktur
        self.k = [1 for _ in range(vrcholy)]
        self.d = [0 for _ in range(vrcholy)]
        self.e_out = [[] for _ in range(vrcholy)]
        self.b = [[1 for _ in range(vrcholy)] for _ in range(vrcholy)]
        self.c = [[0 for _ in range(vrcholy)] for _ in range(vrcholy)]


def husty_graf_rychly(vrcholy, sekvence_hran):
    """
    Hlavni funkce algoritmu. Inicializace promennych a datovych struktur je zapouzdrena do konstruktoru objektu grafu.
    Funkce vypise na vystup hranu, ktera cyklus vytvorila.

    :param vrcholy:         pocet vrcholu grafu
    :param sekvence_hran:   sekvence hran k vlozeni, seznam dvojic
    :return:                True, pokud vznikl cyklus
                            False jinak
    """
    graf = Graf(vrcholy)

    for v, w in sekvence_hran:
        # Od cisel vrcholu odecitame 1 kvli indexovani od 0
        if vlozeni_hrany(graf, v - 1, w - 1):
            print("Vlozeni hrany ({}, {}) vytvorilo cyklus!".format(v, w))
            return True
    return False


def vlozeni_hrany(graf, v, w):
    """
    Hlavni funkce vkladani hrany. Pro prehlednost a konzistenci s bakalarskou praci je pruchod hranou samostatnou funkci

    :param graf:    graf do nehoz vkladame hranu
    :param v:       pocatecni vrchol hrany
    :param w:       koncovy vrchol hrany
    :return:        True pokud vznikl pridanim hrany cyklus
                    False jinak
    """
    # Zvyseni vstupniho stupne vrcholu w
    graf.d[w] += 1

    if graf.k[v] < graf.k[w]:
        # Neni poruseno slabe topologicke usporadani

        # Vypocet rozsahu pruchodu hrany
        j = math.floor(math.log(min(graf.k[w] - graf.k[v], graf.d[w]), 2))
        if graf.d[w] == pow(2, j):
            # Existuje nová hodnota rozsahu pruchodu hrany
            graf.b[j][w] = graf.k[w]
            graf.c[j][w] = 0
            graf.c[j - 1][w] = 0
        # Vlozeni hrany do prioritni fronty vystupnich hrany vrcholu v spolu s hodnotou priblizne vystupni urovne k_out
        heapq.heappush(graf.e_out[v], (graf.k[w], (v, w)))
        return False
    # Mnozina kandidatskych hran k pruzkumu
    T = {(v, w)}
    while T:
        x, y = T.pop()
        if pruchod_hranou(graf, x, y, T, v):
            # Cyklus byl detekovan
            return True
    return False


def pruchod_hranou(graf, x, y, T, v):
    """
    Pruchod hranou, provadi upravu urovne ciloveho vrcholu (je-li poruseno slabe topologicke usporadani). Zajistuje take
    aktualizaci priblizne vystupni urovne hrany k_out

    :param graf:    Objekt reprezentujici graf
    :param x:       Pocatecni vrchol hrany
    :param y:       Koncovy vrhcol hrany
    :param T:       Mnozina kandidatskych hran k pruzkumu
    :param v:       vrchol, z nehoz vede vkladana hrana
    :return:        True pokud byl detekovan cyklus
                    False jinak
    """
    if y == v:
        # Cyklus byl detekovan
        return True

    if graf.k[x] >= graf.k[y]:
        # Oprava slabeho topologickeho usporadani
        graf.k[y] = graf.k[x] + 1
    else:
        # Vypocet rozsahu pruchodu hrany
        j = math.floor(math.log(min(graf.k[y] - graf.k[x], graf.d[y]), 2))
        graf.c[j][y] += 1

        if graf.c[j][y] == 3 * pow(2, j):
            # Vyuziti odhadu ke zvyseni urovne vrcholu (uroven vrcholu vsak neporusuje slabe topologicke usporadani)
            graf.c[j][y] = 0
            graf.k[y] = max(graf.k[y], graf.b[j][y] + pow(2, j))
            graf.b[j][y] = graf.k[y]

    # Pridani vsech vystupnich hran z vrcholu y s pribliznou vystupni urovni nizsi nebo rovnou aktualni urovni k(y) do
    # mnoziny kandidatskych hran k pruzkumu T
    while len(graf.e_out[y]) > 0 and graf.e_out[y][0][0] <= graf.k[y]:
        o = heapq.heappop(graf.e_out[y])
        T.add(o[1])
    heapq.heappush(graf.e_out[x], (graf.k[y], (x, y)))
    return False


def test_ilustrace_vypoctu_husty_graf():
    sekvence_hran = [(1, 2), (1, 4), (3, 4), (2, 3), (5, 6), (5, 7), (6, 7), (4, 5), (1, 3), (7, 4)]
    husty_graf_rychly(7, sekvence_hran)


if __name__ == '__main__':
    test_ilustrace_vypoctu_husty_graf()
