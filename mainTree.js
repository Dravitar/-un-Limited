
function treePress(index1, index2) {
  if(player.clicks>0&&!player.buttons.unlocked.includes(""+index1+index2)){
    if(player.producers.power.gte(player.buttons.requirements.power[index1][index2])&&
       player.buttons.unlocked.includes(player.buttons.requirements.buttons[index1][index2])){
      for(let i=0;i<player.buttons.unlocks[index1][index2].length;i++) {
        let id=player.buttons.unlocks[index1][index2][i];
        docShow("treeButton"+id);
        player.buttons.unlocked.push(id);
      }
      player.clicks--;
    }
  }
}

function docShow(id) {
  document.getElementById(id).style.display = "";
}

function docHide(id) {
  document.getElementById(id).style.display = "none";
}
