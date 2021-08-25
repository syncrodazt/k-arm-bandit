const { Agent, Bandit } = require('./agent-bandit.js');

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
const b = new Bandit(configuration)
const a = new Agent(b.numberOfActions)

// a.takeAction(b, 0)