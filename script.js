// player ///////////////////////////////////////////////

var player = {

  name: "Guerreiro",
  attack: 10,
  defense: 5,
  hp: 30,
  maxHp: 30,
  speed: 5,
  level: 1,
  xp: 0,
  gold: 0,

}


// inimigo ///////////////////////////////////////////////

var enemy = {}

////////////////////////////////////////////////////////////

function levelUp() {

  const levelup = (player.level * 10) * player.level;
  if (player.xp >= levelup) {

    player.level++;
    player.attack += 2;
    player.defense += 1;
    player.maxHp += 10;
    player.hp = player.maxHp;
    pHpBar = player.maxHp;
    console.log(`Parabéns, ${player.name} subiu para o nível ${player.level}!`);
    console.log(`
      ${player.name}:
      - Ataque: ${player.attack}
      - Defesa: ${player.defense}
      - Vida:   ${player.maxHp}
      `);

  }

}

function heal() {

  if (inCombat == false) {

    player.hp = player.maxHp;
    console.log(`${player.name} descansou e recuperou seu hp.`);
    console.log(`${player.name}: [hp: ${player.hp}/${player.maxHp}]`);

  }

}

////////////////////////////////////////////////////////////

const enemies = [

  {name: "Slime",    hp: 20,  maxHp: 20,  attack: 5,  defense: 0,  speed: 6, xp: 5},
  {name: "Goblin",   hp: 30,  maxHp: 30,  attack: 10, defense: 5,  speed: 7, xp: 10},
  {name: "Bandido",   hp: 35,  maxHp: 35,  attack: 12, defense: 7,  speed: 6, xp: 15},
  {name: "Esqueleto", hp: 40,  maxHp: 40,  attack: 15, defense: 10, speed: 4, xp: 15},
  {name: "Orc",      hp: 50,  maxHp: 50,  attack: 20, defense: 15, speed: 2, xp: 20},
  {name: "Dragão",   hp: 100, maxHp: 100, attack: 30, defense: 25, speed: 1, xp: 50},

]

// Gerar um enemy aleatório
function search() {

  if (inCombat == false) {

    if (player.hp > 0) {

      enemy = enemies[Math.floor(Math.random() * enemies.length)];
      enemy.hp = enemy.maxHp;
      eHpBar = enemy.hp;
      enemy.level = Math.floor(Math.random() * player.level) + 1;
      console.log(`Você encontrou um ${enemy.name}!`);

    } else {

      console.log(`Jogador está morto.`);

    }

  }

}

// Ações do personagem //////////////////////////////////////////

function action(p1, p2, auto) {

  const choose = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]

  var V = auto

  if (auto == 100) {
    var V = choose[Math.floor(Math.random() * choose.length)];
  }

  switch (V) {

    case 0: // atacar //

      const chance = Math.floor(Math.random() * 100) + 1;

      if (chance < 10) {

        console.log(`${p1.name} falhou!`);

      } else if (chance < 90) {

        const damage = p1.attack - p2.defense;

        if (damage > 1) {

            p2.hp -= damage;
            if (p2.hp < 0) {p2.hp = 0}
            console.log(`${p1.name} causou ${damage} de dano em ${p2.name}`);
            console.log(`${p2.name}: [hp: ${p2.hp}/${p2.maxHp}]`)

        } else {

            //console.log(p1.name + " não causou dano em " + p2.name);
            p2.hp -= 1;
            if (p2.hp < 0) {p2.hp = 0}
            console.log(`*${p1.name} causou dano mínimo*`)
            console.log(`${p1.name} causou 1 de dano em ${p2.name}`);
            console.log(`${p2.name}: [hp: ${p2.hp}/${p2.maxHp}]`)

        }

      } else if (chance <= 100) {

        const critical_damage = (p1.attack - p2.defense) * 2

        if (critical_damage > 1) {

            p2.hp -= critical_damage;
            if (p2.hp < 0) {p2.hp = 0}
            console.log(`${p1.name} causou ${critical_damage} de dano crítico em ${p2.name}`);
            console.log(`${p2.name}: [hp: ${p2.hp}/${p2.maxHp}]`)

        } else {

            //console.log(p1.name + " não causou dano em " + p2.name);
            p2.hp -= 2
            if (p2.hp < 0) {p2.hp = 0}
            console.log(`*${p1.name} causou dano crítico mínimo*`)
            console.log(`${p1.name} causou 2 de dano em ${p2.name}`)
            console.log(`${p2.name}: [hp: ${p2.hp}/${p2.maxHp}]`)

        }

      }

    break;

    case 1: // curar //

      const curar = Math.floor(p1.maxHp / 2);
      p1.hp += curar;

      if (p1.hp > p1.maxHp) {
        p1.hp = p1.maxHp;
      }

      console.log(`${p1.name} se curou em ${curar} pontos de vida.`);
      console.log(`${p1.name}: [hp: ${p1.hp}/${p1.maxHp}]`);

    break;

    case 2: // Fugir //

    console.log(`${player.name} fugiu!`);
    turn = 0;
    inCombat = false;
    div("menu")

    break;

  }

  if (inCombat == true) {

    setTimeout(battle, 2000);
    div("empty");
    turn++;

  }

}

// batalha ///////////////////////////////////////////////////////////

var turn = 0
var inCombat = false

function battle() {

  switch (turn % 2) {

    // Vez do jogador ////////////////////////////////////////////////
    case 0:

      console.log(``);

      if (player.hp > 0) {

        //action(player, enemy, 0);
        div("combat");
        //setTimeout(battle, 2000);

      } else {

        console.log(`${player.name} foi derrotado!`);
        turn = 0;
        inCombat = false;
        div("menu");

      }

    break;

    // Vez do inimigo ///////////////////////////////////////////////
    case 1:

      console.log(``);

      if (enemy.hp > 0) {

        action(enemy, player, 100);
        //setTimeout(battle, 2000);

      } else {

        const gold = Math.floor((Math.random() * enemy.xp) + enemy.xp/2);
        console.log(`${enemy.name} foi derrotado!`);
        console.log(`${player.name} ganhou ${enemy.xp} de xp.`);
        console.log(`${player.name} ganhou ${gold} de Gold.`);
        player.gold += gold;
        player.xp += enemy.xp;
        turn = 0;
        inCombat = false;
        div("menu");

      }

    break;

  }

}

// inciar batalha //////////////////////////////////////////////////

function start() {

  if (inCombat == false) {

    if (player.hp > 0) {

      if (enemy.hp > 0) {

        console.log(`- ${player.name} entrou em combate com um ${enemy.name} -`);
        var battle_loop = setTimeout(battle, 0);
        inCombat = true;

      } else {

        console.log(`Inimigo não foi encontrado.`);

      }

    } else {

      console.log(`${player.name} está morto.`);

    }

  }

}

function div(name) {

  switch (name) {

    case "menu":
      var div = document.getElementById("button").innerHTML = `
      <input type="button" onclick="search()" value="Procurar inimigo">
      <input type="button" onclick="start()" value="Iniciar combate">
      <input type="button" onclick="heal()" value="Descansar">
      `
    break;

    case "combat":
    var div = document.getElementById("button").innerHTML = `
    <input type="button" onclick="action(player, enemy, 0)" value="Atacar">
    <input type="button" onclick="action(player, enemy, 1)" value="Curar">
    <input type="button" onclick="action(player, enemy, 2)" value="Fugir">
    `
    break;

    case "empty":
    var div = document.getElementById("button").innerHTML = ``
    break;


  }

}

log = ["olá", "mundo"]

var pHpBar = player.maxHp
var eHpBar = enemy.maxHp

function info() {

  document.getElementById("player.name").innerHTML = `${player.name}`;
  document.getElementById("player.level").innerHTML = `Nível: ${player.level}`;
  document.getElementById("player.attack").innerHTML = `Ataque: ${player.attack}`;
  document.getElementById("player.defense").innerHTML = `Defesa: ${player.defense}`;
  document.getElementById("player.gold").innerHTML = `Gold: ${player.gold}`;
  document.getElementById("player.xp").innerHTML = `xp: ${player.xp}/${(player.level * 10) * player.level}`;

  document.getElementById("log").innerHTML = `${log.map}`;

  document.getElementById("player.name+level").innerHTML = `${player.name} Lv.${player.level}`;
  document.getElementById("player.hp").value = pHpBar;
  document.getElementById("player.hp").max = player.maxHp;
  document.getElementById("player.maxHp").innerHTML = `${pHpBar}/${player.maxHp}`;

  if (pHpBar > player.hp) {pHpBar--};
  if (pHpBar < player.hp) {pHpBar++};

  document.getElementById("enemy.name").innerHTML = `${enemy.name}`;
  document.getElementById("enemy.hp").value = eHpBar;
  document.getElementById("enemy.hp").max = enemy.maxHp;
  document.getElementById("enemy.maxHp").innerHTML = `${eHpBar}/${enemy.maxHp}`;

  if (eHpBar > enemy.hp) {eHpBar--};
  if (eHpBar < enemy.hp) {eHpBar++};

}

function loop() {

  info()
  levelUp()

}

setInterval(loop, 30)

////////////////////////////////////////////////////////////////////

search()
div("menu")

///////////////////////////////////////////////////////////////////
