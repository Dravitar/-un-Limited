function getDefaultPlayer() {
  return {
    clicks: 12, //How many clicks the player has remaining
    buttons: {
      unlocked: [""], //All buttons the player has currently unlocked
      requirements: { //Power req, button unlock req, buttons that it unlocks, button id
				row0: {col0: [0, "", ["10"], "00"]},
				row1: {col0: [0, "00", ["21"], "10"]},
				row2: {
					col0: ["1e4", "10", [""], "20"],
					col1: [0, "10", [""], "21"],
					col2: ["1e12", "10", [""], "22"],
				},
      },
    },
    producers: {
      power: new Decimal(10),
      amounts: [0, 0, 0, 0],
      prices: [new Decimal(10), new Decimal(100), new Decimal(1e4), new Decimal(1e7)],
      empowered: [0, 0, 0, 0]
    },
    upgrades: [],
    upgradePrices: [],
  };
}

let player = getDefaultPlayer();
let totalButtons = [[0,0],[1,0],[2,0],[2,1],[2,2]];

function updateText(get, set) {
	document.getElementById(get).innerHTML=set;
}

function updateColor(get, color) {
	document.getElementById(get).style.backgroundColor = color;
}

function updateTextColor(get, color) {
	document.getElementById(get).style.color = color;
}

function update() {
	checkPricing();
}

function checkPricing() {
	for(let i of totalButtons) {
		let id = ""+i[0]+i[1];
		let bigId = "treeButton"+id;
		if(player.buttons.unlocked.contains(id)) {
			updateColor(bigId, "green");
			updateTextColor(bigId, "darkGreen");
		}
		else if(player.producers.power.gte(player.buttons.requirements["row"+i[0]]["col"+i[1]][0])) {
			updateColor(bigId, "green");
			updateTextColor(bigId, "white");
		}
		else {
			updateColor(bigId, "white");
			updateTextColor(bigId, "darkRed");
		}
	}
}

function gameCycle(time) {
  getProduction(time);
  update();
}

function getProduction(time) {
  while(time>0) {
    for(let i=player.producers.length-1;i>=0;i--) {
      if(i==0) {
        player.producers.power = player.producers.power.plus(
          player.producers.amounts[0].times(
            player.producers.empowered[0])
          .times(0.1));
        time-=100;
      }
      else {
        player.producers.amounts[i-1] = player.producers.amount.plus(
          player.producers.amounts[i].times(
            player.producers.empowered[i])
          .times(0.1));
      }
    }
  }
}

function startCycle() {
	setInterval(gameCycle(50), 50);
}
