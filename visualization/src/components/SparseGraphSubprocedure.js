import React from "react";

function SparseGraphSubprocedurePseudocode(props) {
    switch (props.procedure) {
        case 1: return (
            <div>
                <div style={{fontWeight: "bold"}}>function TestUsporadani(<span style={{fontStyle: "italic",}}>v, w</span>)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" k(v) < k(w)"}</span></div>
            </div>
        );
        case 2: return (
            <div>
                <div style={{fontWeight: "bold"}}>function ZpetnyPruzkum(<span style={{fontStyle: "italic",}}>start, w, B</span>)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span><span style={{fontStyle: "italic",}}>{" start = w "}</span><span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 2)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" CyklusNaleezen"}</span></div>
                <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>end if</span></div>
                <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 3)?"yellow" : "white"}}>B &#8592; B &#8746; {"{v}"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 4)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span><span style={{fontStyle: "italic",}}> in(start) = &#8709; &#8743; size(B) &#8805; &#916; + 1 </span><span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 5)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" Prekroceno"}</span></div>
                <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>end if</span></div>
                <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>foreach</span><span style={{fontStyle: "italic",}}>{" (predchudce, start)"} &#8712; {"in(start) "}</span><span style={{fontWeight: "bold"}}>do</span></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 8)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span><span style={{fontStyle: "italic",}}> size(B) &#8805; &#916; +1 </span><span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 9)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" Prekroceno"}</span></div>
                <div style={{textIndent: 30, fontWeight: "bold"}}>{"end if"}</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 10)?"yellow" : "white"}}><span style={{fontStyle: "italic",}}>status &#8592; ZpetnyPruzkum(predchudce, w, B)</span></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 11)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>switch</span><span style={{fontStyle: "italic",}}>{" status "}</span><span style={{fontWeight: "bold"}}>do</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 12)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>case: </span><span style={{fontStyle: "italic",}}>{"CyklusNalezen: "}</span><span style={{fontWeight: "bold"}}>return</span> <span style={{fontStyle: "italic",}}>CyklusNalezen</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 13)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>case: </span><span style={{fontStyle: "italic",}}>{"Prekroceno: "}</span><span style={{fontWeight: "bold"}}>return</span> <span style={{fontStyle: "italic",}}>Prekroceno</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 14)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>default: </span>{}<span style={{fontWeight: "bold"}}>continue</span></div>
                <div style={{textIndent: 30}}><span style={{fontWeight: "bold"}}>end switch</span>{}</div>
                <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>end for</span>{}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 15)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return </span><span style={{fontStyle: "italic",}}>Neprekroceno</span></div>
            </div>
        );
        case 3: return (
            <div>
                <div style={{fontWeight: "bold"}}>function DoprednyPruzkum(<span style={{fontStyle: "italic",}}>w, B</span>)</div>
                <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 1)?"yellow" : "white"}}>F &#8592; {"{out(w)}"}</div>
                <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>while</span><span style={{fontStyle: "italic",}}> F &#8800; &#8709; </span><span style={{fontWeight: "bold"}}>do</span></div>
                <div style={{textIndent: 30, fontStyle: "italic", backgroundColor: (props.step === 2)?"yellow" : "white"}}>(x, y) &#8592; pop(F)</div>
                <div style={{textIndent: 30}}><span style={{fontWeight: "bold"}}>foreach</span><span style={{fontStyle: "italic",}}>{" (a, n)"} &#8712; {"out(y) "}</span><span style={{fontWeight: "bold"}}>do</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 3)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span><span style={{fontStyle: "italic",}}> n &#8712; B </span><span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 60, backgroundColor: (props.step === 4)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" True"}</span></div>
                <div style={{textIndent: 45}}><span style={{fontWeight: "bold"}}>end if</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 5)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span><span style={{fontStyle: "italic",}}> k(a) = k(n) </span><span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 60,fontStyle: "italic", backgroundColor: (props.step === 6)?"yellow" : "white"}}>in(n) &#8592; in(n) &#8746; {"{(a, n)}"}</div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 7)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>else if</span><span style={{fontStyle: "italic",}}> k(a) > k(n) </span><span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 60, fontStyle: "italic", backgroundColor: (props.step === 8)?"yellow" : "white"}}>k(n) &#8592; k(a)</div>
                <div style={{textIndent: 60, fontStyle: "italic", backgroundColor: (props.step === 8)?"yellow" : "white"}}>in(n) &#8592; {"{(a, n)}"}</div>
                <div style={{textIndent: 60, fontStyle: "italic", backgroundColor: (props.step === 8)?"yellow" : "white"}}>F &#8592; F &#8746; {"{out(n)}"}</div>
                <div style={{textIndent: 45}}><span style={{fontWeight: "bold"}}>end if</span></div>
                <div style={{textIndent: 30}}><span style={{fontWeight: "bold"}}>end for</span></div>
                <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>end while</span></div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 9)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return </span><span style={{fontStyle: "italic",}}>False</span></div>
            </div>
        );
        case 4: return (
            <div>
                <div style={{fontWeight: "bold"}}>function PridaniHrany(<span style={{fontStyle: "italic",}}>v, w</span>)</div>
                <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 1)?"yellow" : "white"}}>out(v) &#8592; out(v) &#8746; {"{(v, w)}"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 2)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span> <span style={{fontStyle: "italic",}}>k(v) = k(w)</span> <span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 30, fontStyle: "italic", backgroundColor: (props.step === 3)?"yellow" : "white"}}>in(w) &#8592; in(w) &#8746; {"{(v, w)}"}</div>
                <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>end if</span></div>
                <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 4)?"yellow" : "white"}}>m &#8592; m + 1</div>
                <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 4)?"yellow" : "white"}}>&#916; &#8592; min{"{"}m<sup>1/2</sup>, n<sup>2/3</sup>{"}"}</div>
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