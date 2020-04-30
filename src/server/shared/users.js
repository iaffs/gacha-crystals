/*
    
 */

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
    redeemedGift: false,
    tokens: [],
    crystals: []
  };

  users.set(id, user);
  return true;
}


function removeCrystal(id) {

    const user = getUser(id);
    const crystalCount = user.crystals;

    if (crystalCount != null && crystalCount > 0) {
        const newCrystalCount = (crystalCount - 1);
        user.crystals = newCrystalCount;
        users.set(id, user);
    }
}

function hasCrystals(id) {
    const user = getUser(id);
    return (user != null && user.crystals > 0);
}

function getCrystalsCount(id) {
    const user = getUser(id);
    return user.crystals;
}

function buyCrystals(id, tokens) {
    const user = getUser(id);
    let newCrystalCount;
    let newTokensCount;

    // increase crystals
    if (user.crystals != null) {
        newCrystalCount = (user.crystals + 1)
    } else {
        newCrystalCount = 1;
    }

    // remove tokens from tokens count
    newTokensCount = (user.tokens - tokens);

    user.crystals = newCrystalCount;
    user.tokens = newTokensCount;

    users.set(id, user);
}

function hasCrystals(id) {
    const user = getUser(id);
    return (user != null && user.crystals > 0);
}

function getFreeCrystal(id) {
    const user = getUser(id);

    // increase crystals count
    if (user.crystals != null) {
        user.crystals++;
    }

}

function sellCrystal(id, tokens, idx) {

    const user = getUser(id);
    const allCrystals = user.tokens;

    if (allCrystals != null && allCrystals.constructor === Array) {
        user.tokens = (user.tokens + tokens);
        user.tokens.splice(idx, 1);
    }
}


function removeUsers() {
  users.clear();
}

function updateUser(id, parameters) {

    const user = getUser(id);

    if (parameters.id) {
        user.id = parameters.id;
    }

    if (parameters.password) {
        user.password = parameters.password;
    }

    if (parameters.redeemedGift) {
        user.redeemedGift = parameters.redeemedGift;
    }

    if (parameters.tokens) {
        user.tokens = parameters.tokens;
    }

    if (parameters.crystals) {
        user.crystals = parameters.crystals;
    }

    users.set(id, user);
}

function addNewCrystal(id, crystal) {

    const user = getUser(id);
    const allCrystals = user.crystals;

    let newAllCrystals;

    if (allCrystals != null && allCrystals.constructor === Array) {
        newAllCrystals = [...allCrystals, crystals];
    } else {
        newallCrystals = [];
        newAllCrystals.push(crystal);
    }

    user.crystals = newAllCrystals;

    // updates user object
    users.set(id, user);
}

/*
const user = {
    id: id,
    password: password,
    redeemedGift: false,
    tokens: [1],
    crystals: [1]
  };
  */

module.exports = { 
    getUser, 
    verifyUser, 
    createUser,
    removeCrystal,
    hasCrystals,
    getFreeCrystal,
    sellCrystal,
    getCrystalsCount,
    buyCrystals,
    updateUser,
    addNewCrystal,
    removeUsers 
};