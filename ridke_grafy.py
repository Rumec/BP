from math import sqrt
import enum


class Graf:
    """
    Trida Graf obsahuje reprezentaci grafu. Mnoziny in() a out() jsou pojmenovany e_in() a e_out(),
    protoze Python pouziva 'in' jako rezervovane slovo, out mezi rezervovana slova nepatri ale prefix 'e_' pouzijeme
    kvuli konzistenci.

    Atributy:
        n:      pocet vrcholu grafu
        m:      pocet hran v grafu
        delta:  hranice pro zpetny pruzkum
        k:      seznam urovni aktualne prirazeny vsem vrcholum v grafu
        e_in:   seznam obsahujici mnozinu vstupnich hran in() pro vsechny vrcholy dle definice (pro in(v) tedy plati, ze
                obsahuje takove hrany (x, v), pro ktere plati k(x) = k(v)
        e_out:  seznam obsahujici mnozinu vystupnich hran out() pro vsechny vrcholy
    """

    def __init__(self, vrcholy):
        """
        Konstruktor, inicializuje graf do inicialniho stavu popsaneho v praci.

        :param vrcholy: pocet vrcholu grafu, int
        """
        self.n = vrcholy
        self.m = 0
        self.delta = 0

        # Inicializace urovni vsech vrcholu na 1 a nastaveni mnozin in() a out() pro vsechny vrcholy jako prazdne
        self.k = [1 for _ in range(vrcholy)]
        self.e_in = [set() for _ in range(vrcholy)]
        self.e_out = [set() for _ in range(vrcholy)]


class Status(enum.Enum):
    """
    Vycet slouzici k jednoznacnemu urceni situace, jez nastana pri zpetnem pruzkumu.
    """
    Neprekroceno = 0
    Cyklus_nalezen = 1
    Prekroceno = 2


def ridky_graf(vrcholy, sekvence_hran):
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
    Hlavni funkce vkladani hrany. Pro prehlednost clenena do mensich funkci, stejne jako v textu bakalarske prace.

    :param graf:    graf do nehoz vkladame hranu
    :param v:       pocatecni vrchol hrany
    :param w:       koncovy vrchol hrany
    :return:        True pokud vznikl pridanim hrany cyklus
                    False jinak
    """
    B = set()  # Mnozina navstivenych vrcholu
    dopredny = False  # Flag, ktery urcuje, zda ma byt spusten dopredny pruzkum

    if not test_usporadani(graf, v, w):
        # Plati k(v) >= k(w), a tedy pokracujeme na zpetny pruzkum
        s = zpetny_pruzkum(graf, v, w, B)
        # Cyklus nalezen, odpovida 2. kroku a)
        if s == Status.Cyklus_nalezen:
            return True
        # Zpetny pruzkum prosel mene nez delta hran a zaroven plati k(w) < k(v), odpovida 2. kroku c)
        elif s == Status.Neprekroceno and graf.k[w] < graf.k[v]:
            graf.k[w] = graf.k[v]
            graf.e_in[w] = set()
            dopredny = True
        # Zpetny pruzkum prosel alespon delta hran, odpovida 2. kroku d)
        elif s == Status.Prekroceno:
            graf.k[w] = graf.k[v] + 1
            graf.e_in[w] = set()
            B = {v}
            dopredny = True
        # Dopredny pruzkum, odpovida 3. kroku
        if dopredny and dopredny_pruzkum(graf, w, B):
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


def zpetny_pruzkum(graf, start, w, B):
    """
    Zpetny pruzkum z vrcholu v, prochazime zpetne (proti jejich orientaci) hrany (x, y), pro ktere plati k(x) = k(y).
    Zaciname ve vrcholu v a pokracujeme dokud budto nenarazime na vrchol w, jiz nejsou hrany k dalsimu pruzkumu (tedy
    projdeme men nez delta hran) nebo prozkoumame delta hran. Pruzkum je obdobou algoritmu DFS (pruzkumu do hloubky).
    Odpovida 2. kroku algoritmu (viz kapitola 2.2, 2. krok).

    :param graf:    graf do nehoz hranu vkladame
    :param start:   vrchol, ktery algoritmus aktualne prozkoumava
    :param w:       vrchol, do ktereho vede vkladana hrana
    :param B:       mnozina navstivenych vrcholu
    :return:        Status.Mene_nez_delta_hran - prosel mene nez delta hran
                    Status.Cyklus_nalezen - narazil na vrchol w, oznamujeme tedy vznik cyklu
                    Status.Vice_nez_delta_hran - prosel vice nez delta hran
    """
    if start == w:
        return Status.Cyklus_nalezen
    B.add(start)

    # Osetreni okrajoveho pripadu, kdy se dostaneme do posledniho vrcholu o dane urovni
    if len(graf.e_in[start]) == 0 and len(B) >= graf.delta + 1:
        return Status.Prekroceno

    for predchudce in graf.e_in[start]:
        # Bylo prozkoumano vice nez delta hran, '+ 1' je zde kvuli skutecnosti, ze hran mezi vrcholy na ceste je vzdy
        # o 1 mene nez vrcholu a do mnoziny B ukladame z praktickych duvodu vrcholy a ne hrany
        if len(B) >= graf.delta + 1:
            return Status.Prekroceno
        # Preskoci opetovny pruzkum jiz prozkoumanych vrcholu
        if predchudce in B:
            continue
        status = zpetny_pruzkum(graf, predchudce, w, B)
        # Rekurzivni volani zpetneho pruzkumu narazilo na vrchol w
        if status == Status.Cyklus_nalezen:
            return Status.Cyklus_nalezen
        # Bylo prozkoumano vice nez delta hran
        elif status == Status.Prekroceno:
            return Status.Prekroceno

    return Status.Neprekroceno


def dopredny_pruzkum(graf, w, B):
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
    F = {w}  # Mnozina vrcholu urcenych k doprednemu pruzkumu
    while F:
        aktualni = F.pop()
        # Pruzkum nasledniku aktualne prozkoumavaneho vrcholu
        for naslednik in graf.e_out[aktualni]:
            if naslednik in B:
                return True
            # Nasledujici if predstavuje pripadnou opravu pseudotopologickeho usporadani
            if graf.k[aktualni] == graf.k[naslednik]:
                graf.e_in[naslednik].add(aktualni)
            elif graf.k[aktualni] > graf.k[naslednik]:
                graf.k[naslednik] = graf.k[aktualni]
                graf.e_in[naslednik] = {aktualni}
                F.add(naslednik)
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


def test_ilustrace_vypoctu():
    sekvence_hran = [(1, 2), (6, 7), (7, 8), (8, 9), (2, 3), (9, 10), (4, 5), (3, 4), (5, 6), (10, 1)]
    ridky_graf(10, sekvence_hran)


if __name__ == '__main__':
    test_ilustrace_vypoctu()
