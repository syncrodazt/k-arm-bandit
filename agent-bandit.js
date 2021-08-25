const Chance = require('chance');
const chance = new Chance();

/**
* Agent
*/
class Agent {
    ε;
    stepsTaken = 0;
    numberOfActions;
    estimatedRewards = [];
    totalReward = 0
    history = [];
    actionStats = [];
    rewardStats = [];

    constructor(numberOfActions, ε = 0.1) {
        this.numberOfActions = numberOfActions;
        this.estimatedRewards = Array(this.numberOfActions).fill().map(() => Math.random()) // Initialize estimatedRewards
        this.ε = ε
        this.actionStats = Array(this.numberOfActions).fill().map(() => 0)
        this.rewardStats = Array(this.numberOfActions).fill().map(() => 0)
    }
    /** 
    * 
    * @summary chooseActionFromPolicy return action index according to the policy, using ε as exploration rate
    * @return {number} Return action index
    */
    chooseActionFromPolicy() {
        if (chance.bool({ likelihood: (1 - this.ε) * 100 })) {
            return this.estimatedRewards.indexOf(Math.max(...this.estimatedRewards));
            // return 0.5
        } else {
            return chance.integer({ min: 0, max: this.numberOfActions - 1 })
        }
    }
    /** 
    * 
    * @summary chooseActionFromPolicy return action index according to the policy, using ε as exploration rate
    * @return {number} Return action index
    */
    takeAction(b, manualAction) {
        let action = manualAction
        let reward = b.calculateReward(action)
        this.updateStats(action, reward)
    }

    /** 
    * 
    * @summary chooseActionFromPolicy return action index according to the policy, using ε as exploration rate
    * @return {number} Return action index
    */
    takeActionFromPolicy(b) {
        let action = this.chooseActionFromPolicy()
        let reward = b.calculateReward(action)
        this.updateStats(action, reward)
    }

    updateStats(action, reward) {
        this.actionStats[action] += 1;
        this.rewardStats[action] += reward;
        this.estimatedRewards[action] = this.rewardStats[action] / this.actionStats[action];
        this.totalReward += reward;
        this.history.push({ action: action, reward: reward, totalReward: this.totalReward });
        this.stepsTaken += 1;
    }

    status() {
        console.log("ε", this.ε)
        console.log("numberOfActions", this.numberOfActions)
        console.log("stepsTaken", this.stepsTaken)
        console.log("actionStats", this.actionStats)
        console.log("rewardStats", this.rewardStats)
        console.log("estimatedRewards", this.estimatedRewards)
        console.log("history", this.history)
    }

    train(steps) {
        for (let step = 0; step < steps; step++) {
            takeActionFromPolicy(b)
        }
    }
}

/**
* Bandit
*/
class Bandit {
    numberOfActions;
    configuration;

    constructor(configuration) {
        this.numberOfActions = configuration.length;
        this.configuration = configuration
    }

    /** 
    * 
    * @summary calculateReward takes action's index K, then returns reward
    * @param {number} K - Index for the Kth action, 0 ... numberOfActions - 1
    * @return {number} Return reward from triggering the Kth action
    */
    calculateReward(K) {
        const c = this.configuration[K]
        switch (c.type) {
            case 'Discrete':
                return chance.weighted(c.rewards, c.probabilities)
            case 'Normal':
                return chance.normal({ mean: c.μ, dev: c.σ })
        }
    }

    get numberOfActions() {
        return this.numberOfActions
    }
}

module.exports.Agent = Agent
module.exports.Bandit = Bandit
