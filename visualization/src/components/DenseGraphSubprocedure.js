import React from "react";

function DenseGraphSubprocedurePseudocode(props) {
    if (props.procedure !== 0) {
        return (
            <div>
                <div style={{fontWeight: "bold"}}>function PruchodHranou(v, w, T, v)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 1)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> y = v <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 2)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return </a>True</div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end if</a></div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 3)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> k(x) &#8805; k(y) <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 4)?"yellow" : "white"}}>k(y) &#8592; k(x) + 1</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 5)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>else</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 6)?"yellow" : "white"}}>j &#8592; &#8970;log<sub>2</sub>(min{"{k(w) - k(v), d(w)}"})&#8971; </div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 6)?"yellow" : "white"}}>c(j, y) &#8592; c(j, y) + 1</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 8)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>if</a> c(j, y) = 3 * 2<sup>j</sup> <a style={{fontWeight: "bold"}}>then</a></div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 8)?"yellow" : "white"}}>c(j, y) &#8592; 0</div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 8)?"yellow" : "white"}}>k(y) &#8592; max{"{k(y), b(j, y) + "}2<sup>j</sup>{"}"}</div>
                <div style={{textIndent: 45, backgroundColor: (props.step === 8)?"yellow" : "white"}}>b(j, y) &#8592; k(y)</div>
                <div style={{textIndent: 30, fontWeight: "bold"}}>{"end if"}</div>
                <div style={{textIndent: 15, fontWeight: "bold"}}>{"end if"}</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 9)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>while</a> k<sub>out</sub>(top(out(y))) &#8804; k(y) <a style={{fontWeight: "bold"}}>do</a></div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 10)?"yellow" : "white"}}>o &#8592; extractMin(out(y))</div>
                <div style={{textIndent: 30, backgroundColor: (props.step === 10)?"yellow" : "white"}}>T &#8592; T &#8746; {"{o}"} </div>
                <div style={{textIndent: 15}}><a style={{fontWeight: "bold"}}>end while </a></div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 11)?"yellow" : "white"}}> k<sub>out</sub>(x, y) &#8592; k(y)</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 11)?"yellow" : "white"}}> insert((x, y), out(x))</div>
                <div style={{textIndent: 15, backgroundColor: (props.step === 12)?"yellow" : "white"}}><a style={{fontWeight: "bold"}}>return </a>False</div>
            </div>
        )
    } else {
        return (<div> </div>)
    }
}

function DenseGraphSubprocedure(props) {
    return(
        <div>
            <h3>Podprocedura:</h3>
            <DenseGraphSubprocedurePseudocode
                procedure={props.procedure}
                step={props.step}
            />
        </div>
    )
}

export default DenseGraphSubprocedure;