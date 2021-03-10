import React from "react";

function renderTupleList(list) {
    let out = "";
    for(let i = 0; i < list.length; ++i) {
        out += "(" + list[i][0] + ", " + list[i][1] + ")";
        out += (i < list.length - 1)? ", " : "";
    }
    return out;
}

function SparseGraphDemoStep(props) {

    return (
        <div
            className={"bottomPanel"}
        >
            {renderTupleList(props.state.sequenceToAdd)}
            <br/><br/>
            <button
                onClick={()=>{}}
            >
                Přidat hranu ze sekvence
            </button>
        </div>
    )
}

export default SparseGraphDemoStep;
