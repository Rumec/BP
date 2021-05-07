import React from "react";

function DenseGraphPseudocode(props) {
    return (
        <div>
                <h3>Hlavni procedura:</h3>

            <div style={{fontWeight: "bold"}}>function VlozeniHrany(v, w)</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}>d(w) &#8592; d(w) + 1</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 2)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> {"k(v) < k(w)"} <a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 3)?"yellow" : "white"}}>j &#8592; &#8970;log<sub>2</sub>(min{"{k(w) - k(v), d(w)}"})&#8971; </div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 4)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> d(w) = 2<sup>j</sup> <a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 5)?"yellow" : "white"}}>b(j, w) &#8592; k(w)</div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 5)?"yellow" : "white"}}>c(j, w) &#8592; 0</div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 5)?"yellow" : "white"}}>c(j - 1, w) &#8592; 0</div>
            <div style={{textIndent: 30}}><a style={{fontWeight: "bold"}}>end if </a></div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 6)?"yellow" : "white"}}>k<sub>out</sub>(v, w) &#8592; k(w)</div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 7)?"yellow" : "white"}}>insert((v, w), out(v))</div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 8)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" False"}</div>
            <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end if </a></div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 9)?"yellow" : "white"}}>T &#8592; {"{(v, w)}"}</div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 10)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>while</a> T &#8800; &#8709; <a style={{fontWeight: "bold"}}>do</a></div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 10)?"yellow" : "white"}}>(x, y) &#8592; pop(T) </div>
            <div style={{textIndent: 30, backgroundColor: (props.step === 12)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> PruchodHranou(x, y, T, v) <a style={{fontWeight: "bold"}}>then</a></div>
            <div style={{textIndent: 45, backgroundColor: (props.step === 12)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" True"}</div>
            <div style={{textIndent: 30}}><a style={{fontWeight: "bold"}}>end if </a></div>
            <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end while </a></div>
            <div style={{textIndent: 15, backgroundColor: (props.step === 12)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return</a>{" False"}</div>
        </div>
    )
}

export default DenseGraphPseudocode;