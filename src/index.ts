import * as d3 from "d3";

let l = console.log

interface Data {
    a: number;
    y: number;
}


d3.csv("/data/messstellen.csv").then((csv: any) => {
    let Viaduktstrasse = csv.map( (d) => {
        return {
            a: ((parseInt(d.Wochentag)-1) * 24 + parseInt(d.Stunde)),
            y: (parseFloat(d.Viaduktstrasse) - parseFloat(d.Basel))
        }
    } )

    let Birskopfsteg = csv.map( (d) => {
        return {
            a: ((parseInt(d.Wochentag)-1) * 24 + parseInt(d.Stunde)),
            y: (parseFloat(d.Birskopfsteg) - parseFloat(d.Basel))
        }
    } )
    draw(Birskopfsteg, "Birskopfsteg")
}, (fail) => l(fail))


function draw(data:Data[], label:string) {
    let chart = d3.select("#container")
        .append("div")
        .attr("id", label)
        .append("svg")
    let h:number = 300
    let w:number = 700

    chart
        .attr("width", w+100)
        .attr("height", h+300)

    let aScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.a), d3.max(data, d => d.a)])
        .range([0, 2*Math.PI])

    let yScale = d3.scaleLinear()
        .range([0.2*h, h])
        .domain([-0.05, 0.05])


    let area:any = d3.areaRadial()
        .angle( (d:any) => aScale(d.a) )
        .innerRadius(0)
        .outerRadius( (d:any) => yScale(d.y) )
        .curve(d3.curveCatmullRomClosed.alpha(0.9));

    let g = chart.append("g")
        .attr("transform", `translate(${w/2+50}, ${h/2+150})`)

    l(area(data))
    g
        .append("clipPath")
        .attr("id", "additive")
        .datum(data)
        .append("path")
        .attr("d", area)
        .attr("stroke", "black")
        .attr("fill", "none")


    let add:string[] = [
        "#D22817",
        "#E6380E",
        "#F14A00",
        "#F95C00",
        "#FF6D00",
        "#FF7E00",
        "#FF9200",
        "#FFA100",
    ]


    add.forEach( (color, i) => {
        g.append("circle")
            .attr("r", h*0.6 + (add.length-i)*h*0.05)
            .attr("fill", color)
            .attr("clip-path", "url(#additive)")
    })



    g.append("circle")
        .attr("r", 0.6*h)
        .attr("fill", "#F2F2F2")


    let negativeArea:any = d3.areaRadial()
        .angle( (d:any) => aScale(d.a) )
        .innerRadius( (d:any) => yScale(d.y))
        .outerRadius(h)
        .curve(d3.curveCatmullRomClosed.alpha(0.5));

    g
        .append("clipPath")
        .attr("id", "remove")
        .datum(data)
        .append("path")
        .attr("d", negativeArea)
        .attr("fill", "none")

    let remove:string[] = [
        "#00B298",
        "#00959D",
        "#0082A1",
        "#006F9C",
        "#005A8E",
        "#004A87",
    ]


    remove.forEach( (color, i) => {
        g.append("circle")
            .attr("r", h*0.6 - i*h*0.05)
            .attr("fill", color)
            .attr("clip-path", "url(#remove)")
    })


    g.append("circle")
        .attr("r", 0.6*h)
        .attr("fill", "none")
        .attr("stroke", "#FFDB00")
        .attr("stroke-width", 2)


    function xPos(day) { return 0.8 * h * Math.sin(-2*Math.PI/7*day+Math.PI) }
    function yPos(day) { return 0.8 * h * Math.cos(-2*Math.PI/7*day+Math.PI) }


    [[0, "So"],[1, "Mo"], [2, "Di"], [3, "Mi"], [4, "Do"] ,[5, "Fr"], [6, "Sa"]].forEach( (day) => {
        g.append("circle")
            .attr("r", 3)
            .attr("fill", "gray")
            .attr("cx", xPos(day[0]))
            .attr("cy", yPos(day[0]))

        g.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", xPos(day[0]))
            .attr("y2", yPos(day[0]))
            .attr("stroke", "gray")
            .attr("opacity", 0.3)

        g.append("circle")
            .attr("r", 6)
            .attr("fill", "none")
            .attr("cx", xPos(day[0]))
            .attr("cy", yPos(day[0]))
            .attr("stroke", "#F2F2F2")
            .attr("stroke-width", 6)

        g.append("text")
            .text(day[1])
            .attr("x", xPos(day[0])+8)
            .attr("y", yPos(day[0])+5)
            .attr("font-family", "Adobe Text Pro, Times New Roman")
            .attr("font-style", "italic")


        g.append("circle")
            .attr("r", h*0.2)
            .attr("fill", "#F2F2F2")

    })

    g.append("text")
        .text(label)
        .attr("x", -40)
        .attr("y", 5)
}


// Sources:
// https://github.com/d3/d3-shape
// https://static.scientificamerican.com/sciam/assets/Image/saw0717Gsci31_d.png
//https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
// https://bl.ocks.org/d3indepth/7bb7f2e389d0bf2ff1a622c4c7833a80
// https://github.com/d3/d3-shape#area
