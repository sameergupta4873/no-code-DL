var btn = document.querySelector('#another')
var container = document.querySelector('#container')

var dform = document.querySelector('#d-form')
var template = dform.firstElementChild;
let layer=7


btn.addEventListener('click',()=>{
    layer++;
    var label = document.createElement("label");
    label.for="layer"+layer;
    label.innerHTML="layer"+layer;
    var input = document.createElement("input");
    input.type="text";
    input.name="layer"+layer;

    container.insertBefore(label,container.children[container.childElementCount-1])
    container.insertBefore(input,container.children[container.childElementCount-1])
})





var layerr=1;
btn.addEventListener('click',()=>{
    layerr++;
    var p = document.createElement("p")
    p.innerHTML = "Layer"+layerr;
    dform.appendChild(p)

    var d = document.createElement("div")
    d.innerHTML=template.innerHTML
    d.setAttribute("class",template.getAttribute("class"))
    dform.appendChild(d);

    ichilds = dform.lastElementChild.querySelectorAll("input")
    lchilds = dform.lastElementChild.querySelectorAll("label")

    ichilds.forEach(element => {
       element.setAttribute("name",`layer${layerr}`);
       ca = element.getAttribute("id");
       element.setAttribute("id",`${ca}${layerr}`);
    });

    lchilds.forEach(element => {
        ca = element.getAttribute("for");
        element.setAttribute("for",`${ca}${layerr}`)
    });

})