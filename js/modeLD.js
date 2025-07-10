function modeplacing(selector1, selector2,selector3, classname1, classname2,classname3) {
    $(selector1).toggleClass(classname1)
    $(selector2).toggleClass(classname2)
    $(selector3).toggleClass(classname3)
}

$(document).ready(function () {
    $("#light").click(function () {
        modeplacing('.box', 'body','.mode', 'light', 'lightimg','switch')
    })
})