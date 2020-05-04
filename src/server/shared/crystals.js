const crystals = [
  {
    id: 1,
    name: "Emerald",
    img: "/img/emerald.png",
    color: "Emerald Green",
    hardness: 7,
    rarity: 4,
    value: 100,
  },
  {
    id: 2,
    name: "Diamond",
    img: "./img/diamond.png",
    color: "Glossy Transparent",
    hardness: 10,
    rarity: 1,
    value: 300,
  },
  {
    id: 3,
    name: "Angelite",
    img: "/img/angelite.png",
    color: "Dusty Skyblue",
    hardness: 6,
    rarity: 6,
    value: 50,
  },
  {
    id: 4,
    name: "Citrine",
    img: "/img/citrine.png",
    color: "Dijon Yellow",
    hardness: 5,
    rarity: 5,
    value: 60,
  },
  {
    id: 5,
    name: "Rose Quartz",
    img: "/img/rosequartz.png",
    color: "Baby pink",
    hardness: 6,
    rarity: 8,
    value: 30,
  },
  {
    id: 6,
    name: "Amethyst",
    img: "/img/amethyst.png",
    color: "Transparent Purple",
    hardness: 4,
    rarity: 3,
    value: 150,
  },
  {
    id: 7,
    name: "Black Onyx",
    img: "/img/blackonyx.png",
    color: "Glossy Dusty Black",
    hardness: 8,
    rarity: 2,
    value: 200,
  },
  {
    id: 8,
    name: "Tigers Eye",
    img: "/img/tigerseye.png",
    color: "70s Greenorange",
    hardness: 7,
    rarity: 9,
    value: 20,
  },
  {
    id: 9,
    name: "Hematite",
    img: "/img/hematite.png",
    color: "Glossy Steel",
    hardness: 9,
    rarity: 3,
    value: 150,
  },
  {
    id: 10,
    name: "Opal",
    img: "/img/opalspeckled.png",
    color: "White Speckled",
    hardness: 4,
    rarity: 2,
    value: 200,
  },
  {
    id: 11,
    name: "Jade",
    img: "/img/jade.png",
    color: "Dusty Jade Green",
    hardness: 6,
    rarity: 7,
    value: 30,
  },
  {
    id: 12,
    name: "Black Obsidian",
    img: "/img/blackobsidian.png",
    color: "Total Black",
    hardness: 3,
    rarity: 4,
    value: 100,
  },
  {
    id: 13,
    name: "Ruby",
    img: "/img/ruby.png",
    color: "Fuchsia Glossy Red",
    hardness: 3,
    rarity: 3,
    value: 100,
  },
  {
    id: 14,
    name: "Bloodstone",
    img: "/img/bloodstone.png",
    color: "Red Speckled Green",
    hardness: 7,
    rarity: 10,
    value: 5,
  },
  {
    id: 15,
    name: "Sapphire",
    img: "/img/sapphire.png",
    color: "Royal Blue",
    hardness: 9,
    rarity: 2,
    value: 200,
  },
];

/* random number between 1 og 100, + rarity.
range: 1-100 - 1/5
*/
function randomCrystal(index) {
  let rarity = Math.floor(Math.random() * 100) + 1;
  let choice = 0;

  if (rarity <= 2) {
    choice = 1; // 2% chance
  } else if (rarity <= 7) {
    choice = 2; // 5% chance
  } else if (rarity <= 13) {
    choice = 3; // 6% chance
  } else if (rarity <= 20) {
    choice = 4; // 7% chance
  } else if (rarity <= 28) {
    choice = 5; // 8% chance
  } else if (rarity <= 37) {
    choice = 6; // 9% chance
  } else if (rarity <= 47) {
    choice = 7; // 10% chance
  } else if (rarity <= 62) {
    choice = 8; // 15% chance
  } else if (rarity <= 80) {
    choice = 9; // 18% chance
  } else {
    choice = 10; // 20% chance
  }

  let crystalArr = [];
  crystals.forEach((element) => {
    if (element["rarity"] === choice) {
      crystalArr.push(element);
    }
  });
  // console.log(crystalArr);
  const crystal = crystalArr[Math.floor(Math.random() * crystalArr.length)];
  // We make a new crystal so that we're able to assign a unique ID, to avoid duplication issues
  let newCrystal = {};
  newCrystal["name"] = crystal["name"];
  newCrystal["img"] = crystal["img"];
  newCrystal["color"] = crystal["color"];
  newCrystal["hardness"] = crystal["hardness"];
  newCrystal["rarity"] = crystal["rarity"];
  newCrystal["value"] = crystal["value"];
  newCrystal["id"] = index;
  return newCrystal;
}

// export default crystals;
module.exports = { crystals, randomCrystal };
