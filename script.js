
var epsilon = 0.1
var rewardSum = 0
var averageReward = 0
var averageRewards = new Array()
var turn_count = 1
var turn_max = 300
var probs = [[0.2, 0.5, 0.3], [0.1, 0.9], [0.7, 0.3]]
var rewards = [[10, 20, 13], [80, 3], [9, 67]]
var numberOfActions = probs.length

var ctx = $("#myChart")[0].getContext('2d');

// Chart.pluginService.register({
//     beforeInit: function (chart) {
//         // We get the chart data
//         var data = chart.config.data;

//         // For every dataset ...
//         for (var i = 0; i < data.datasets.length; i++) {

//             // For every label ...
//             for (var j = 0; j < data.labels.length; j++) {

//                 // We get the dataset's function and calculate the value
//                 var fct = data.datasets[i].function,
//                     x = data.labels[j],
//                     y = fct(x);
//                 // Then we add the value to the dataset data
//                 data.datasets[i].data.push(y);
//             }
//         }
//     }
// });

function updateChart() {
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...Array(turn_max).keys()],
            datasets: [{
                data: averageRewards, // Don't forget to add an empty data array, or else it will break
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Steps'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Average reward'
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }]
            }
        }
    });
}

var actions = new Array()
for (let i = 0; i < numberOfActions; i++) {
    var action = new Array()
    var numberOfRewards = rewards[i].length
    for (j = 0; j < numberOfActions; j++) {
        action.push({ p: probs[i][j], v: rewards[i][j] })
    }
    actions.push(action)
}

for (let i = 0; i < numberOfActions; i++) {
    // set onclick function to buttons
    $("#btn" + (i + 1)).click(function () { show(i) })

    // calculate and set true expected action reward
    $("input.fixed").eq(i).val(math.multiply(probs[i], rewards[i]))
}

$("input#epsilon").val(epsilon)

Ns = new Array(numberOfActions).fill(0)
Qs = Array(3).fill().map(() => Math.random())





function show(i) {

    // random a reward from distribution to show
    reward = chance.weighted(rewards[i], probs[i])

    // update total reward
    rewardSum += reward
    averageReward = ((turn_count - 1) * averageReward + reward) / turn_count
    averageRewards.push(averageReward)
    $("#total").text(rewardSum)
    $("#average").text(averageReward)
    // $("#averageArray").text(averageRewards)

    $("#out" + (i + 1)).text(reward)

    // update turns
    turn_count += 1
    $("#turn").text(turn_count)

    Ns[i]++
    $("input.n").eq(i).val(Ns[i])

    let Qn = Number($("input.estimate").eq(i).val())
    Qnplus1 = Qn + (reward - Qn) / Ns[i]
    Qs[i] = Qnplus1
    $("input.estimate").eq(i).val(Qnplus1)

    updateChart()
}

var epsilon_count = 0
function train() {
    for (let i = 0; i < turn_max; i++) {
        if (chance.bool({ likelihood: (1 - epsilon) * 100 })) {
            selectedAction = Qs.indexOf(Math.max(...Qs));
            $("#btn" + (selectedAction + 1)).trigger("click")
        } else {
            $("#btn" + (math.randomInt(numberOfActions) + 1)).trigger("click")
            epsilon_count++
        }
    }
}

train()

updateChart()
console.log(epsilon_count)