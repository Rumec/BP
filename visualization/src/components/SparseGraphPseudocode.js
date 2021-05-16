import React from "react";

function SparseGraphPseudocode(props) {
    return (
        <div>
                <h3>Hlavní funkce:</h3>

            <div style={{fontWeight: "bold"}}>function VlozeniHrany(<span style={{fontStyle: "italic",}}>v, w</span>)</div>
            <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 1)?"yellow" : "white"}}>B &#8592; &#8709;</div>
            <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 1)?"yellow" : "white"}}>dopredny &#8592; False</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 2)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span> &#172;TestUsporadani(<span style={{fontStyle: "italic",}}>v, w</span>) <span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 3)?"yellow" : "white"}}><span style={{fontStyle: "italic",}}>s</span> &#8592; ZpetnyPruzkum(<span style={{fontStyle: "italic",}}>v, w, B</span>)</div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 4)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if </span><span style={{fontStyle: "italic",}}>s = CyklusNalezen </span><span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 5)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" True"}</span></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 6)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>else if</span><span style={{fontStyle: "italic",}}> s = Neprekroceno &#8743; {"k(v) < k(w) "}</span><span style={{fontWeight: "bold"}}>then</span></div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 7)?"yellow" : "white"}}>k(w) &#8592; k(v)</div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 7)?"yellow" : "white"}}>in(w) &#8592; &#8709;</div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 7)?"yellow" : "white"}}>dopredny &#8592; True</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 8)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>else if</span><span style={{fontStyle: "italic",}}>{" s = Prekroceno "}</span><span style={{fontWeight: "bold"}}>then</span></div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 9)?"yellow" : "white"}}>k(w) &#8592; k(v) + 1</div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 9)?"yellow" : "white"}}>in(w) &#8592; &#8709;</div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 9)?"yellow" : "white"}}>B &#8592; {"{v}"}</div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 9)?"yellow" : "white"}}>dopredny &#8592; True</div>
            <div style={{textIndent: 30, fontWeight: "bold"}}>{"end if"}</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 10)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span><span style={{fontStyle: "italic",}}> dopredny </span> &#8743; DoprednyPruzkum(<span style={{fontStyle: "italic",}}>w, B</span>) <span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 11)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" True"}</span></div>
            <div style={{textIndent: 30, fontWeight: "bold"}}>{"end if"}</div>
            <div style={{textIndent: 15, fontWeight: "bold"}}>{"end if"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 12)?"yellow" : "white"}}>PridaniHrany(<span style={{fontStyle: "italic",}}>v, w</span>)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 13)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" False"}</span></div>
        </div>
    )
}

export default SparseGraphPseudocode;