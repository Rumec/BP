from math import sqrt
import enum


class Graf:
    """
    Trida Graf obsahuje reprezentaci grafu seznamem nasledniku. Tato reprezentace je vyhodna vzhledem ke skutecnosti,
    ze mnozina out() jiz seznam nasledniku predstavuje. Mnoziny in() a out() jsou pojmenovany e_in() a e_out(), protoze
    Python pouziva 'in' jako rezervovane slovo, out mezi rezervovana slova nepatri ale prefix 'e_' pouzijeme kvuli
    konzistenci.

    Atributy:
        n:      pocet vrcholu grafu
        m:      pocet hran v grafu
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
        self.m = 0
        self.delta = 0

        self.k = []
        self.e_in = []
        self.e_out = []

        # Inicializace urovni vsech vrcholu na 1 a nastaveni mnozin in() a out() pro vsechny vrcholy jako prazdne
        self.k = [1 for _ in range(vrcholy)]
        self.e_in = [set() for _ in range(vrcholy)]
        self.e_out = [set() for _ in range(vrcholy)]


class Status(enum.Enum):
    Mene_nez_delta_hran = 0
    Cyklus_nalezen = 1
    Vice_nez_delta_hran = 2



def vloz_hranu(graf, hrana):
    """
    Hlavni funkce vkladani hrany. Pro prehlednost clenena do mensich funkci.

    :param graf:    graf do nehoz vkladame hranu
    :param hrana:   dvojice (v, w) repzezentujici hranu z vrcholu v do vrcholu w
    :return:        True pokud vznikl pridanim hrany cyklus
                    False jinak
    """
    v, w = hrana
    B = set()  # Mnozina navstivenych vrcholu
    dopredny = False    # Flag, ktery urcuje, zda ma byt spusten dopredny pruzkum

    if not test_usporadani(graf, v, w):
        # Plati k(v) >= k(w), a tedy pokracujeme na zpetny pruzkum
        status = rekurzivni_zpetny_pruzkum(graf, v, w, B)
        # Cyklus nalezen, odpovida 2. kroku a)
        if status == Status.Cyklus_nalezen:
            return True
        # Zpetny pruzkum prosel mene nez delta hran a zaroven plati k(w) < k(v), odpovida 2. kroku c)
        elif status == Status.Mene_nez_delta_hran and graf.k[w] < graf.k[v]:
            graf.k[w] = graf.k[v]
            graf.e_in[w] = set()
            dopredny = True
        # Zpetny pruzkum prosel alespon delta hran, odpovida 2. kroku d)
        elif status == Status.Vice_nez_delta_hran:
            graf.k[w] = graf.k[v] + 1
            graf.e_in[w] = set()
            B = {v}
            dopredny = True
        # Dopredny pruzkum, odpovida 3. kroku
        if dopredny and iterativni_dopredny_pruzkum(graf, w, B):
            return True
    # Cyklus nebyl nalezen, pridavame tedy hranu do grafu
    pridani_hrany(graf, v, w)
    return False


def test_usporadani(graf, v, w):
    """
    Test usporadani v grafu, odpovida 1. kroku v algoritmu (viz kapitola 2.2, 1. krok)

    :param graf:    graf do nehoz hranu vkladame
    :param v:       vrchol z nehoz vkladana hrana vychazi
    :param w:       vrchol do nehoz vkladana hrana miri
    :return:        True pokud k(v) < k(w)
                    False jinak
    """
    return graf.k[v] < graf.k[w]


def rekurzivni_zpetny_pruzkum(graf, start, w, B):
    """
    Zpetny pruzkum z vrcholu v, prochazime zpetne (proti jejich orientaci) hrany (x, y), pro ktere plati k(x) = k(y).
    Zaciname ve vrcholu v a pokracujeme dokud budto nenarazime na vrchol w, jiz nejsou hrany k dalsimu pruzkumu (tedy
    projdeme men nez delta hran) nebo prozkoumame delta hran. Pruzkum je obdobou algoritmu DFS (pruzkumu do hloubky).
    Odpovida 2. kroku algoritmu (viz kapitola 2.2, 2. krok).

    :param graf:    graf do nehoz hranu vkladame
    :param start:   vrchol, ktery algoritmus aktualne prozkoumava
    :param w:       vrchol, do ktereho vede vkladana hrana
    :param B:       mnozina navstivenych vrcholu
    :return:        cislo odpovidajici vysledku pruzkumu
                    0 - prosel mene nez delta hran
                    1 - narazil na vrchol w, oznamujeme tedy vznik cyklu
                    2 - prosel vice nez delta hran
    """
    if start == w:
        return Status.Cyklus_nalezen
    B.add(start)
    for naslednik in graf.e_in[start]:
        # Bylo prozkoumano vice nez delta hran, '+ 1' je zde kvuli skutecnosti, ze hran mezi vrcholy na ceste je vzdy
        # o 1 mene nez vrcholu a do mnoziny B ukladame z praktickych duvodu vrcholy a ne hrany
        if len(B) >= graf.delta + 1:
            return Status.Vice_nez_delta_hran
        # Preskoci opetovny pruzkum jiz prozkoumanych vrcholu
        if naslednik in B:
            continue
        status = rekurzivni_zpetny_pruzkum(graf, naslednik, w, B)
        # Rekurzivni volani zpetneho pruzkumu narazilo na vrchol w
        if status == Status.Cyklus_nalezen:
            return Status.Cyklus_nalezen
        # Bylo prozkoumano vice nez delta hran
        elif status == Status.Vice_nez_delta_hran:
            return Status.Vice_nez_delta_hran

    return Status.Mene_nez_delta_hran


def iterativni_dopredny_pruzkum(graf, w, B):
    """
    Dopredny pruzkum prochazi vystupni hrany vrcholu x (tedy hrany obsazene v out(x), dle zavedene terminologie bakalarske
    prace), jehoz uroven k(x) byla behem dopredneho pruzkumu zvysena. Pri doprednem pruzkumu dochazi k pripadnym opravam
    pseudotopologickeho usporadani. Odpovida 3. kroku algoritmu (viz kapitola 2.2, 3. krok).

    :param graf:    graf do nehoz vkladame hranu
    :param w:       vrchol, do ktereho vede vkladana hrana, z tohoto vrhcolu dopredny pruzkum zaciname
    :param B:       mnozina vrcholu navstivenych zpetnym pruzkumem
    :return:        True pokud byl objevem cyklus
                    False jinak
    """
    F = {w}     # Mnozina vrcholu urcenych k doprednemu pruzkumu
    while F:
        a = F.pop()
        # Pruzkum nasledniku aktualne prozkoumavaneho vrcholu
        for b in graf.e_out[a]:
            if b in B:
                return True
            # Nasledujici if predstavuje pripadnou opravu pseudotopologickeho usporadani
            if graf.k[a] == graf.k[b]:
                graf.e_in[b].add(a)
            elif graf.k[a] > graf.k[b]:
                graf.k[b] = graf.k[a]
                graf.e_in[b] = {a}
                F.add(b)
    return False


def pridani_hrany(graf, v, w):
    """
    Pridani hrany (v, w) do grafu. Funkce zaroven aktualizuje pocet hran v grafu a hodnotu promenne delta.
    Odpovida 4. kroku algoritmu (viz kapitola 2.2, 4. krok).

    :param graf:    graf do nehoz hranu vkladame
    :param v:       vrchol, z nehoz vkladana hrana vystupuje
    :param w:       vrchol, do nehoz vkladana hrana vstupuje
    """
    graf.e_out[v].add(w)
    if graf.k[v] == graf.k[w]:
        graf.e_in[w].add(v)
    graf.m += 1
    graf.delta = min(sqrt(graf.m), pow(graf.n, 2 / 3))


#######################################################################################################################
# Provizorni testy implementace algoritmu, pozdeji budou napsany pecliveji a prehledneji
#######################################################################################################################

def test(vrcholy):
    g = Graf(vrcholy)
    print("Testuji graf o {} vrcholech".format(vrcholy))
    for i in range(0, vrcholy - 1):
        print("Vkladam: ({}, {})".format(i, i + 1))
        if vloz_hranu(g, (i, i + 1)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 1))
            return 1

    for i in range(1, vrcholy - 1):
        print("Vkladam: ({}, {})".format(1, i + 1))
        if vloz_hranu(g, (i, i + 1)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 1))
            return 1
    for i in range(2, vrcholy - 1):
        print("Vkladam: ({}, {})".format(2, i + 1))
        if vloz_hranu(g, (i, i + 1)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 1))
            return 1

    print("Vkladam: ({}, {})".format(vrcholy - 1, 0))
    if not (vloz_hranu(g, (vrcholy - 1, 0))):
        print("Chyba pri vkladani hrany ({}, {})".format(vrcholy - 1, 0))
        return 1

    return 0


def test_strom():
    g = Graf(13)

    print("Testuji strom:")

    for i in range(1, 5):
        print("Vkladam hranu ({}, {})".format(0, i))
        if vloz_hranu(g, (0, i)):
            print("Chyba pri vkladani hrany ({}, {})".format(0, i))
            return
    for i in range(1, 4):
        print("Vkladam hranu ({}, {})".format(i, i + 1))
        if vloz_hranu(g, (i, i + 1)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 1))
            return
    for i in range(1, 5):
        print("Vkladam hranu ({}, {})".format(i, i + 4))
        if vloz_hranu(g, (i, i + 4)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 4))
            return
        print("Vkladam hranu ({}, {})".format(i, i + 5))
        if vloz_hranu(g, (i, i + 5)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 5))
            return
        print("Vkladam hranu ({}, {})".format(i, i + 6))
        if vloz_hranu(g, (i, i + 6)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 6))
            return
        print("Vkladam hranu ({}, {})".format(i, i + 8))
        if vloz_hranu(g, (i, i + 8)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 8))
            return
    for i in range(5, 8):
        print("Vkladam hranu ({}, {})".format(i, i + 1))
        if vloz_hranu(g, (i, i + 1)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 1))
            return
    for i in range(5, 8):
        print("Vkladam hranu ({}, {})".format(i, i + 1))
        if vloz_hranu(g, (i, i + 1)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i + 1))
            return
    for i in range(12, 8, -1):
        print("Vkladam hranu ({}, {})".format(i, i - 1))
        if vloz_hranu(g, (i, i - 1)):
            print("Chyba pri vkladani hrany ({}, {})".format(i, i - 1))
            return
    return g


def test_cyklus_ve_stromu(pocatecni, koncovy):
    g = test_strom()
    print("Vkladam hranu ({}, {})".format(pocatecni, koncovy))
    if not (vloz_hranu(g, (pocatecni, koncovy))):
        print("Chyba pri vkladani hrany ({}, {})".format(pocatecni, koncovy))
        return 1


if __name__ == '__main__':
    for i in range(2, 50):
        if test(i) == 1:
            print("Test neprosel!")
            break

    if test_cyklus_ve_stromu(12, 0) == 1:
        print("Chyba pri testovani stromu!!!")
    if test_cyklus_ve_stromu(11, 0) == 1:
        print("Chyba pri testovani stromu!!!")
    if test_cyklus_ve_stromu(8, 0) == 1:
        print("Chyba pri testovani stromu!!!")
    if test_cyklus_ve_stromu(4, 3) == 1:
        print("Chyba pri testovani stromu!!!")
    if test_cyklus_ve_stromu(7, 0) == 1:
        print("Chyba pri testovani stromu!!!")
