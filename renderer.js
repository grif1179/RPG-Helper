const Vue = require('vue/dist/vue.min.js');

let app = new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'Hello Vue!',
            enemies: [],
            newEnemyName: "",
            newEnemyArmor: 0,
            newEnemyHealth: 0,
        };
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
    },
    mounted() {
        this.message = "TESTING";
    },
});
