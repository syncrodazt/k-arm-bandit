
// for (let i = 0; i < numberOfActions; i++) {
//     $("#btn" + i).click(function () { show(i) })
// }

$("#btn1").click(function () { show(0.8, 15, 99, 1) })
$("#btn2").click(function () { show(0.7, 7, 9, 2) })
$("#btn3").click(function () { show(1, 21, 0, 3) })

function show(prob, val1, val2, i) {
    console.log("show!")
    let r = Math.random(), value

    if (r < prob) {
        value = val1
    } else {
        value = val2
    }

    value_count += value
    $("#total").text(value_count)
    $("#out" + i).animate({ opacity: 0 }, "fast", function () {
        $(this).text(value).animate({ opacity: 1 }, "fast");
    })

    turn_count += 1
    $("#turn").text(turn_count)

}

var value_count = 0
var turn_count = 1

console.log(total.innerText)

// $("input").eq(1).val()

var probs = [[0.2, 0.5, 0.3], [0.1, 0.9], [0.7, 0.3]]
var values = [[10, 20, 13], [80, 3], [9, 67]]
var numberOfActions = probs.length

var actions = new Array()
for (let i = 0; i < numberOfActions; i++) {
    var action = new Array()
    var numberOfValues = values[i].length
    for (j = 0; j < numberOfActions; j++) {
        action.push({ p: probs[i][j], v: values[i][j] })
    }
    actions.push(action)
}

$("input.fixed").eq(0).val(math.multiply(probs[0], values[0]))
$("input.fixed").eq(1).val(math.multiply(probs[1], values[1]))
$("input.fixed").eq(2).val(math.multiply(probs[2], values[2]))

Ns = new Array(numberOfActions).fill(0)
