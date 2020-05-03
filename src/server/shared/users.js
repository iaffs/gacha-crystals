/*
    
 */
const crystals = require("./crystals");

const users = new Map();

function getUser(id) {
  return users.get(id);
}

function verifyUser(id, password) {
  const user = getUser(id);

  if (!user) {
    return false;
  }

  return user.password === password;
}

function createUser(id, password) {
  if (getUser(id)) {
    return false;
  }

  const user = {
    id: id,
    password: password,
    gift: 3,
    value: 5,
    crystals: [],
    crystalCount: 0
  };

  users.set(id, user);
  return true;
}


function buyLootBox(id, free) {
  // loot box value is 5
  const user = getUser(id);

  if (!free) {
    if (user.value < 5) {
      return false;
    }
    user.value = user.value - 5;
  }
  user.crystalCount++;
  const newCrystal = crystals.randomCrystal(user.crystalCount);
  //newCrystal = crystals.randomCrystal(user.crystalCount);
  user.crystals.push(newCrystal);
  return true;
}

function redeemedGift(id) {
  const user = getUser(id);
  this.buyLootBox(id, true);
  user.gift--;
}

function sellCrystal(id, cId) {
  const user = getUser(id);
  let value = 0;
  user.crystals.forEach(element => {
      if (element['id'] == cId) {
          value = element['value'];
      }
  });

  if (value > 0) {
    //const newCrystalArr = user.crystals.filter(crystal => crystal['id'] == cId);
    for (let index = 0; index < user.crystals.length; index++) {
        if (user.crystals[index]["id"] == cId) {
            user.crystals.splice(index,1)
        }
    }
    //user.crystals = newCrystalArr;
    user.value = user.value + value;
    return true;
  }
  return false;
}

function removeUsers() {
  users.clear();
}

module.exports = {
  getUser,
  verifyUser,
  createUser,
  buyLootBox,
  redeemedGift,
  sellCrystal,
  removeUsers,
};
