const Vue = require('vue/dist/vue.min.js');

const roll = function(num, dice) {
    let total = 0;
    for (let i=0; i < num; i++) {
        total += Math.floor(Math.random() * dice + 1);
    }
    return total;
};

let app = new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'Hello Vue!',
            baseDice: '1d10',
            enemies: [],
            newEnemyName: "",
            newEnemyArmor: 0,
            newEnemyHealth: 0,
            newEnemyInitiative: 0,
            newInitiativeOverride: -1,
        };
    },
    computed: {
        baseDiceParsed() {
            const diceRe = /^(?<num>\d+)d(?<dice>\d+)$/;
            matchObj = this.baseDice.match(diceRe);
            if (matchObj === null) {
                console.error("Invalid base dice given!");
                return [-100, -100];
            }

            return [matchObj.groups.num, matchObj.groups.dice];
        },
    },
    methods: {
        createEnemy() {
            const multiRegex = /^(?<name>.+)\[(?<num>\d+)\]$/;

            let name = this.newEnemyName.trim();
            let matchObj = name.match(multiRegex);

            let numOfEnemies = 1;
            if (matchObj) {
                name = matchObj.groups.name;
                numOfEnemies = +matchObj.groups.num;
            }

            for (let i=1; i <= numOfEnemies; i++) {
                let newEnemy = {
                    name: name + ' ' + i,
                    health: this.newEnemyHealth,
                    healthTotal: this.newEnemyHealth,
                    healthIncra: 1,
                    armor: this.newEnemyArmor,
                    armorTotal: this.newEnemyArmor,
                    armorIncra: 1,
                    initiative: this.newEnemyInitiative,
                    initiativeOverride: this.newInitiativeOverride,
                    currInit: 0,
                };

                if (numOfEnemies === 1) {
                    newEnemy.name = name;
                }

                this.enemies.push(newEnemy);
            }
        },
        removeEnemy(idx) {
            this.enemies.splice(idx, 1);
        },
        rollInitiative() {
            let [num, dice] = this.baseDiceParsed;
            this.enemies.forEach((enemy) => {
                if (enemy.initiativeOverride <= -1) {
                    enemy.currInit = roll(num, dice) + enemy.initiative;
                } else {
                    enemy.currInit = enemy.initiativeOverride;
                }
            });
        },
        sortByInitiative() {
            this.enemies.sort((enemy1, enemy2) => {
                let enemy1Init = (enemy1.initiativeOverride > -1)
                                 ? enemy1.initiativeOverride
                                   : enemy1.currInit;

                let enemy2Init = (enemy2.initiativeOverride > -1)
                    ? enemy2.initiativeOverride
                    : enemy2.currInit;
                return enemy2Init - enemy1Init;
            });
        },
    },
    mounted() {
        this.message = "TESTING";
    },
});
