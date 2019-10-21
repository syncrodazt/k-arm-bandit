
var value_count = 0
var turn_count = 1
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

for (let i = 0; i < numberOfActions; i++) {
    // set onclick function to buttons
    $("#btn" + (i + 1)).click(function () { show(i) })

    // calculate and set true expected action value
    $("input.fixed").eq(i).val(math.multiply(probs[i], values[i]))
}

Ns = new Array(numberOfActions).fill(0)





function show(i) {
    console.log("show!")

    // random a value from distribution to show
    value = chance.weighted(values[i], probs[i])

    // update total value
    value_count += value
    $("#total").text(value_count)
    $("#out" + (i + 1)).animate({ opacity: 0 }, "fast", function () {
        $(this).text(value).animate({ opacity: 1 }, "fast");
    })

    // update turns
    turn_count += 1
    $("#turn").text(turn_count)

    Ns[i]++
    let Qn = Number($("input.estimate").eq(i).val())
    console.log(typeof(Qn), Qn)
    Qnplus1 = Qn + (value - Qn) / Ns[i]
    console.log(Qnplus1)
    $("input.estimate").eq(i).val(Qnplus1)

}
