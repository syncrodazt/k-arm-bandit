const { Agent, Bandit } = require('../agent-bandit.js');

configuration = [
    {
        "type": "Discrete",
        "rewards": [1, 20],
        "probabilities": [0.8, 0.2]
    },
    {
        "type": "Normal",
        "μ": 5,
        "σ": 0.2
    }
]
const b = new Bandit(3, configuration)
const a = new Agent(b.numberOfActions, ε = 0)

QUnit.module('Test Agent');

// QUnit.test('Test chooseAction', assert => {
//     assert.equal(a.chooseAction(), "choose action!");
// });

QUnit.test('Test chooseActionFromPolicy', assert => {
    let got = a.chooseActionFromPolicy()
    assert.expect(2);
    assert.true(Number.isInteger(got), "got must be an Integer");
    assert.true(0 <= got && got < b.numberOfActions, "got must be less than b.numberOfActions");
});

QUnit.module('Test Bandit');

QUnit.test('Test triggerKthArm', assert => {
    assert.equal(b.triggerKthArm(), 10);
});

QUnit.test('Test calculateReward', assert => {
    // assert.equal(b.calculateReward(), 10);
    assert.true(true);
});