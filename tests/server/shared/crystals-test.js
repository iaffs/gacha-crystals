const Crystals = require("../../../src/server/shared/crystals");

test("Test if I have crystals", () => {
    expect(Crystals.crystals.length).toBe(15);
});

test("Test get random crystals", () => {
    const random = Crystals.randomCrystal();
    expect(random).not.toBeUndefined();
});

