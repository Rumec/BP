import React from "react";

function SparseGraphPseudocode(props) {
    return (
        <div>
            <div style={{fontWeight: "bold"}}>function VlozeniHrany(Graf, hrana)</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}>{"v, w = hrana"}</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}>{"B = {}"}</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}>{"dopredny = False"}</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 2)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a>{" !TestUsporadani(Graf, v, w) "}<a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 3)?"yellow" : "white"}}>{"s = ZpetnyPruzkum(Graf, v, w, b)"}</div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 4)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a>{" s == CyklusNalezen "}<a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 5)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" True"}</div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 6)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>else if</a>{" s == Neprekroceno && Graf.k(v) < Graf.k(w) "}<a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 7)?"yellow" : "white"}}>{"Graf.k(w) = Graf.k(v)"}</div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 7)?"yellow" : "white"}}>{"Graf.in(w) = {}"}</div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 7)?"yellow" : "white"}}>{"dopredny = True"}</div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 8)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>else if</a>{" s == Prekroceno "}<a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 9)?"yellow" : "white"}}>{"Graf.k(w) = Graf.k(v) + 1"}</div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 9)?"yellow" : "white"}}>{"Graf.in(w) = {}"}</div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 9)?"yellow" : "white"}}>{"B = {v}"}</div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 9)?"yellow" : "white"}}>{"dopredny = True"}</div>
            <div style={{textIndent: 30, fontWeight: "bold"}}>{"end if"}</div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 10)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a>{" dopredny && DoprednyPruzkum(Graf, w, B) "}<a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 11)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" True"}</div>
            <div style={{textIndent: 30, fontWeight: "bold"}}>{"end if"}</div>
            <div style={{textIndent: 15, fontWeight: "bold"}}>{"end if"}</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 12)?"yellow" : "white"}}>{"PridaniHrany(Graf, v, w)"}</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 12)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" False"}</div>
        </div>
    )
}

export default SparseGraphPseudocode;