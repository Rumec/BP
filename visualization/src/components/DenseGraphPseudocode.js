import React from "react";

function DenseGraphPseudocode(props) {
    return (
        <div>
                <h3>Hlavní funkce:</h3>

                <div style={{fontWeight: "bold"}}>function VlozeniHrany(<span style={{fontStyle: "italic",}}>v, w</span>)</div>
            <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 1)?"yellow" : "white"}}>d(w) &#8592; d(w) + 1</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 2)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span> <span style={{fontStyle: "italic",}}>{"k(v) < k(w)"}</span> <span style={{fontWeight: "bold"}}>then</span></div>
            <div style={{textIndent: 30, fontStyle: "italic", backgroundColor: (props.step === 3)?"yellow" : "white"}}>j &#8592; &#8970;log<sub>2</sub>(min{"{k(w) - k(v), d(w)}"})&#8971; </div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 4)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span> <span style={{fontStyle: "italic",}}>d(w) = 2<sup>j</sup></span> <span style={{fontWeight: "bold"}}>then</span></div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 5)?"yellow" : "white"}}>b(j, w) &#8592; k(w)</div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 5)?"yellow" : "white"}}>c(j, w) &#8592; 0</div>
            <div style={{textIndent: 45, fontStyle: "italic", backgroundColor: (props.step === 5)?"yellow" : "white"}}>c(j - 1, w) &#8592; 0</div>
            <div style={{textIndent: 30}}><span style={{fontWeight: "bold"}}>end if </span></div>
            <div style={{textIndent: 30, fontStyle: "italic", backgroundColor: (props.step === 6)?"yellow" : "white"}}>k<sub>out</sub>(v, w) &#8592; k(w)</div>
            <div style={{textIndent: 30, fontStyle: "italic", backgroundColor: (props.step === 7)?"yellow" : "white"}}>insert((v, w), out(v))</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 8)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" False"}</span></div>
            <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>end if </span></div>
            <div style={{textIndent: 15, fontStyle: "italic", backgroundColor: (props.step === 9)?"yellow" : "white"}}>T &#8592; {"{(v, w)}"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 10)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>while</span><span style={{fontStyle: "italic",}}> T &#8800; &#8709; </span><span style={{fontWeight: "bold"}}>do</span></div>
            <div style={{textIndent: 30, fontStyle: "italic", backgroundColor: (props.step === 10)?"yellow" : "white"}}>(x, y) &#8592; pop(T) </div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 11)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>if</span> PruchodHranou(<span style={{fontStyle: "italic",}}>x, y, T, v</span>) <span style={{fontWeight: "bold"}}>then</span></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 12)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" True"}</span></div>
            <div style={{textIndent: 30}}><span style={{fontWeight: "bold"}}>end if </span></div>
            <div style={{textIndent: 15}}><span style={{fontWeight: "bold"}}>end while </span></div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 13)?"yellow" : "white"}}><span style={{fontWeight: "bold"}}>return</span><span style={{fontStyle: "italic",}}>{" False"}</span></div>
        </div>
    )
}

export default DenseGraphPseudocode;