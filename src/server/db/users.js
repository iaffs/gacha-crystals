/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
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
    tokens: [1],
    crystals: [1]
  };

  users.set(id, user);
  return true;
}

function removeUserCrystal(userId) {
  const user = getUser(userId);
  const crystalCount = user.crystals;

  if (crystalCount |= null && crystalCount > 0) {
    const newCrystalCount = crystalCount - 1;
    user.crystals = newCrystalCount;
    users.set(userId, user);
  }
}

// checks if user has crystals
function hasCrystals(userId) {
  const user = getUser(userId);
  return user != null && user.crystals > 0;
}

// checks how many crystals user has
function getCrystalsCount(userId) {
  const user = getUser(userId);
  return user.crystals;
}

function buyCrystals(userId, value) {
  const user = getUser(userId);
  let newCrystalCount;
  let newTokenValue;

  // increase crystal count
  if (user.crystals != null) {
    newCrystalCount = user.crystals + 1;
  } else {
    newCrystalCount = 1;
  }

  newTokenValue = user.tokens - value;

  user.crystals = newCrystalCount;
  user.tokens = newTokenValue;

  users.set(userId, user)
}

function getFreeCrystal(userId) {
    const user = getUser(userId);

    if (user.crystals != null) {
        user.crystals++;
    }
}

function sellCrystal(userId, value, crysId) {
    const user = getUser(userId);
    const allCrystals = user.crystals;

    if (allCrystals != null && allCrystals.constructor === Array) {
        user.tokens = (user.tokens + value);
        user.crystals.splice(crysId, 1);
}

function updateUser(userId, parameters) {
    const user = getUser(userId);

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

    users.set(userId, user);

}

function addCrystal(userId, crystals) {
    const user = getUser(userId);
    const allCrystals = user.crystals;

    let newAllCrystals;

    if (allCrystals != null && allCrystals.constructor === Array) {
        newAllCrystals = [...allCrystals, crystals];
    } else {
        newAllCrystals = [];
        newAllCrystals.push(crystals);
    }

    user.crystals = newAllCrystals;

    // updates user
    users.set(userId, user);
}

function removeUsers() {
  users.clear();
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

module.exports = { getUser, 
    verifyUser, 
    createUser, 
    removeUserCrystal, 
    hasCrystals, 
    getCrystalsCount, 
    buyCrystals, 
    getFreeCrystal, 
    sellCrystal, 
    updateUser, 
    addCrystal,
    removeUsers 
};
