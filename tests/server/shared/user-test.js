const Users = require("../../../src/server/shared/users");


let counter = 0;

test("Test create user", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";

    const user = Users.createUser(userId, pw);
    expect(user).not.toBeUndefined();
});



test("Test get user", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";

    const user = Users.createUser(userId, pw);
    expect(user).not.toBeUndefined();

    const gotUser = Users.getUser(userId);
    expect(gotUser).not.toBeUndefined();

});

test("Test verify user", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";

    const user = Users.createUser(userId, pw);
    expect(user).not.toBeUndefined();

    const verify = Users.verifyUser(userId, pw);
    expect(verify).toBe(true);

});


test("Test verify user fail", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";

    const user = Users.createUser(userId, pw);
    expect(user).not.toBeUndefined();

    const verify = Users.verifyUser(userId, "barrrr");
    expect(verify).toBe(false);
});


test("Test update user object", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";
    Users.createUser(userId, pw);

    const parameters = {value: 100, crystals: 10}

   // Users.updateLoggedInUser(userId, parameters);

    const user = Users.getUser(userId);
    expect(user.crystals.length).toBe(0);
    expect(user.value).toBe(5);
});



test("Test redeem gift", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";
    Users.createUser(userId, pw);

    Users.buyLootBox(userId, true);
    Users.buyLootBox(userId, true);
    Users.buyLootBox(userId, true);
    Users.buyLootBox(userId, false);

    const user = Users.getUser(userId);
    expect(user.crystals.length).toBe(4);
});



test("Test buy crystal", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";
    Users.createUser(userId, pw);
    Users.removeUsers(userId);

});



test("Test redeemgift()", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";

    Users.createUser(userId, pw);
    Users.redeemedGift(userId);
});

test("Test sellcrystal()", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";
    
    Users.createUser(userId, pw);
    const user = Users.getUser(userId);
    user.crystals = [1, 2, 3];
    Users.sellCrystal(userId, 1);
});



test("Test removeUsers()", () => {
    counter++;

    const userId = "foo_" + counter;
    const pw = "bar";
    
    Users.createUser(userId, pw);
    Users.removeUsers();

});