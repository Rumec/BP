import React from "react";

function SparseGraphSubprocedurePseudocode(props) {
    switch (props.procedure) {
        case 1: return (
            <div>
                <div style={{fontWeight: "bold"}}>function TestUsporadani(Graf, v, w)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" Graf.k(v) < Graf.k(w)"}</div>
            </div>
        );
        case 2: return (
            <div>
                <div style={{fontWeight: "bold"}}>function ZpetnyPruzkum(Graf, start, w, B)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a>{" start == w "}<a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 2)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" CyklusNaleezen"}</div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end if</a></div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 3)?"yellow" : "white"}}>B = B &#8746; {"{v}"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 4)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a>{" Graf.in(start) = {} && B.size() >= Graf.delta "}<a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 5)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" Prekroceno"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 6)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>else if</a>{" Graf.in(start) = {} && B.size() < Graf.delta "}<a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 7)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" Nerekroceno"}</div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end if</a></div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>foreach</a>{" (predchudce, start)"} &#8712; {"Graf.in(start) "}<a style={{fontWeight: "bold"}}>do</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 8)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> B.size() &#8805; Graf.delta <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 9)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" Prekroceno"}</div>
                <div style={{textIndent: 30, fontWeight: "bold"}}>{"end if"}</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 10)?"yellow" : "white"}}>{"status = ZpetnyPruzkum(Graf, predchudce, w, B)"}</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 11)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>switch</a>{" status "}<a style={{fontWeight: "bold"}}>do</a></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 12)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>case: </a>{"CyklusNalezen: "}<a style={{fontWeight: "bold"}}>return</a> CyklusNalezen</div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 13)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>case: </a>{"Prekroceno: "}<a style={{fontWeight: "bold"}}>return</a> prekroceno</div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 14)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>default: </a>{}<a style={{fontWeight: "bold"}}>continue</a></div>
                <div style={{textIndent: 30}}><a style={{fontWeight: "bold"}}>end switch</a>{}</div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end for</a>{}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 15)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return </a>Neprekroceno</div>
            </div>
        );
        case 3: return (
            <div>
                <div style={{fontWeight: "bold"}}>function DoprednyPruzkum(Graf, w, B)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}>{"F = {w}"}</div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>while</a> F &#8800; &#8709; <a style={{fontWeight: "bold"}}>do</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 2)?"yellow" : "white"}}>{"aktualni = F.pop()"}</div>
                <div style={{textIndent: 30}}><a style={{fontWeight: "bold"}}>foreach</a>{" (a, n)"} &#8712; {"Graf.out(aktualni) "}<a style={{fontWeight: "bold"}}>do</a></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 3)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> n &#8712; B <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 60, backgroundColor: (props.step === 4)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" True"}</div>
                <div style={{textIndent: 45}}><a style={{fontWeight: "bold"}}>end if</a></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 5)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> Graf.k(a) == Graf.k(n) <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 60, backgroundColor: (props.step === 6)?"yellow" : "white"}}>Graf.in(n) = Graf.in(n) &#8746; {"{(a, n)}"}</div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 7)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>else if</a> Graf.k(a) > Graf.k(n) <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 60, backgroundColor: (props.step === 8)?"yellow" : "white"}}>Graf.k(n) = Graf.k(a)</div>
                <div style={{textIndent: 60, backgroundColor: (props.step === 8)?"yellow" : "white"}}>Graf.in(n) = {"{(a, n)}"}</div>
                <div style={{textIndent: 60, backgroundColor: (props.step === 8)?"yellow" : "white"}}>F = F &#8746; {"{n}"}</div>
                <div style={{textIndent: 45}}><a style={{fontWeight: "bold"}}>end if</a></div>
                <div style={{textIndent: 30}}><a style={{fontWeight: "bold"}}>end for</a></div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end while</a></div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 9)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return </a>False</div>
            </div>
        );
        case 4: return (
            <div>
                <div style={{fontWeight: "bold"}}>function PridaniHrany(Graf, v, w)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}>Graf.out(v) = Graf.out(v) &#8746; {"{(v, w)}"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 2)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> Graf.k(v) == Graf.k(w) <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 3)?"yellow" : "white"}}>Graf.in(w) = Graf.in(w) &#8746; {"{(v, w)}"}</div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end if</a></div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 4)?"yellow" : "white"}}>Graf.m = Graf.m + 1</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 4)?"yellow" : "white"}}>Graf.delta = min{"{"}m<sup>1/2</sup>, n<sup>2/3</sup>{"}"}</div>
            </div>
        );
        default: return(<div> </div>)
    }

}

function SparseGraphSubprocedure(props) {
    return(
        <div>
            <h3>Podprocedura:</h3>
            <SparseGraphSubprocedurePseudocode
                procedure={props.procedure}
                step={props.step}
            />
        </div>
    )
}

export default SparseGraphSubprocedure;