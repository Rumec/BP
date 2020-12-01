from math import sqrt, ceil


class Graf:
    """Trida Graf drzi graf reprezentovany seznamem nasledniku.
    """

    def __init__(self, vrcholy):
        """
        Konstruktor, inicializuje graf do iniciálního stavu popsaného v práci

        :param vrcholy: pocet vrcholu grafu
        """
        self.n = vrcholy  # Pocet vrcholu
        self.m = 0  # Pocet hran (inicialne 0)
        self.delta = 0

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
    dopredny = False

    if not test_usporadani(graf, v, w):
        status = rekurzivni_zpetny_pruzkum(graf, v, w, B)
        if status == 1:
            # Cyklus nalezen
            return True
        elif status == 0 and graf.k[w] < graf.k[v]:
            # krok 3 pripad v)
            graf.k[w] = graf.k[v]
            dopredny = True
        elif status == 2:
            graf.k[w] = graf.k[v] + 1
            B = {v}
            dopredny = True

        if dopredny and iterativni_dopredny_pruzkum(graf, w, B):
            return True

    pridani_hrany(graf, v, w)
    return False


def test_usporadani(graf, v, w):
    return graf.k[v] < graf.k[w]


def rekurzivni_zpetny_pruzkum(graf, start, w, B):
    """
    Princip DFS

    :param graf:
    :param start:
    :param w:
    :param B:
    :return:    0 - prosel mene nez delta hran
                1 - narazil na vrchol w -> oznamuje cyklus
                2 - prosel vice nez delta hran
    """
    # Zeptat se, zda raději neházet exception
    if start == w:
        return 1
    B.add(start)
    for naslednik in graf.e_in[start]:
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


def pridani_hrany(graf, v, w):
    graf.e_out[v].add(w)
    if graf.k[v] == graf.k[w]:
        graf.e_in[w].add(v)
    graf.m += 1
    graf.delta = min(ceil(sqrt(graf.m)), ceil(pow(graf.n, 2 / 3)))


def test():
    g = Graf(2)

    if vloz_hranu(g, (0, 1)):
        print("Chyba u Graf(2) 1")
    if not vloz_hranu(g, (1, 0)):
        print("Chyba u Graf(2) 2")

    g = Graf(4)
    if vloz_hranu(g, (0, 1)):
        print("Chyba u Graf(4) 1")
    if vloz_hranu(g, (1, 2)):
        print("Chyba u Graf(4) 2")
    if vloz_hranu(g, (2, 3)):
        print("Chyba u Graf(4) 3")
    if vloz_hranu(g, (1, 3)):
        print("Chyba u Graf(4) 4")
    if vloz_hranu(g, (0, 2)):
        print("Chyba u Graf(4) 5")
    if vloz_hranu(g, (0, 3)):
        print("Chyba u Graf(4) 6")
    if not vloz_hranu(g, (3,0)):
        print("Chyba u Graf(2) 7")

test()

