import * as d3 from "d3";

let l = console.log

interface Data {
    x: number;
    y: number;
}


d3.csv("data.csv").then((csv: any) => {
    let data = csv.map((d) => {
        return {
            x: parseInt(d.x),
            y: parseInt(d.y)
        }
    } )

draw(data)
    
}, (fail) => l(fail))


function draw(data:Data[]) {
    let chart = d3.select("#container")
        .append("svg")
    
    const h:number = 300
    const w:number = 700

    chart
        .attr("width", w)
        .attr("height", h)

}
