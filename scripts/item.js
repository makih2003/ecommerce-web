class Item {
  constructor(image, name, priceInCents, id, keywords) {
    this.image = image;
    this.name = name;
    this.priceInCents = priceInCents;
    this.id = id;
    this.keywords = keywords;
  }

  static getPriceById(itemArray, targetId) {
    const item = itemArray.find((item) => item.id === targetId);
    return item ? item.priceInCents : null;
  }

  static getNameById(itemArray, targetId) {
    const item = itemArray.find((item) => item.id === targetId);
    return item ? item.name : null;
  }

  static getPicById(itemArray, targetId) {
    const item = itemArray.find((item) => item.id === targetId);
    return item ? item.image : null;
  }
}

const bodysoap = new Item(
  "images/bodysoap.jpg",
  "100% Organic Bodysoap 3 Piece Set",
  999,
  "a1",
  ["soap", "cosmetics", "bodysoap"]
);

const cactus = new Item(
  "images/cactus.jpg",
  "Artificial Plant for Home Cuctus",
  1599,
  "a2",
  ["plants", "decoration", "cactus", "gifts"]
);

const eyeShadow = new Item(
  "images/eyeshadow.jpg",
  "Long-Lasting Eyeshadow Platte",
  2245,
  "a3",
  ["eyeshadow", "cosmetics", "gifts"]
);

const iphone = new Item(
  "images/iphone.jpg",
  "Iphone 13 Pro Max Black with Charger",
  169000,
  "a4",
  ["smartphone", "iphone", "Apple"]
);

const light = new Item(
  "images/light.jpg",
  "Light with Black Stand for Home",
  5910,
  "a5",
  ["light", "home", "decoration"]
);

const lipstic = new Item(
  "images/lip.jpg",
  "Moisturizing Shiny Pink Lipstic",
  1299,
  "a6",
  ["lip", "cosmetics", "gifts"]
);

const shoes = new Item(
  "images/shoes.jpg",
  "Men Classic Leather Shoes Size 10",
  12000,
  "a7",
  ["shoes", "men", "leather"]
);

const sunglasses = new Item(
  "images/sunglasses.jpg",
  "Sunglasses for Men and Women",
  2999,
  "a8",
  ["sunglasses", "beach", "summer"]
);

const tie = new Item(
  "images/tie.jpg",
  "Men's 60-inches Extra Long Tie",
  2999,
  "a9",
  ["tie", "suites", "gifts"]
);

const towel = new Item(
  "images/towel.jpg",
  "100% Organic Cotton Towel",
  2999,
  "a10",
  ["towel", "bath", "gifts"]
);

const backpack = new Item(
  "images/backpack.jpg",
  "Adidas Red Backpack for Men and Women",
  6999,
  "a11",
  ["adidas", "backpack", "school"]
);

const balloon = new Item(
  "images/balloon.jpg",
  "Cute Balloon Perfect for Kids",
  1025,
  "a12",
  ["balloon", "kids", "party", "gifts"]
);

const chair = new Item(
  "images/chair.jpg",
  "Comfortable Low Chair with Square Cushion",
  7890,
  "a13",
  ["chair", "cushion", "home"]
);

const mug = new Item(
  "images/mug.jpg",
  "Coffee Mug Dishwasher Safe Microwave Safe",
  1345,
  "a14",
  ["mug", "coffee", "dishwasher safe", "microwave safe"]
);

const notebook = new Item(
  "images/notebook.jpg",
  "200 Pages Notebook with Pencil Stationery",
  898,
  "a15",
  ["note", "pencil", "stationery"]
);

const shampoo = new Item(
  "images/shampoo.jpg",
  "Shampoo and Moisturizing Conditioner Set",
  2145,
  "a16",
  ["shampoo", "conditioner", "bath"]
);

const shoulderBag = new Item(
  "images/shoulder-bag.jpg",
  "Men's Shoulder Bag Brown Leather",
  4500,
  "a17",
  ["bag", "men"]
);

const soccerBall = new Item(
  "images/soccerball.jpg",
  "Soccer Ball Official Size 5 Blue Orange",
  3299,
  "a18",
  ["soccerball", "ball", "sports"]
);

const items = [
  bodysoap,
  cactus,
  eyeShadow,
  iphone,
  light,
  lipstic,
  shoes,
  sunglasses,
  tie,
  towel,
  backpack,
  balloon,
  chair,
  mug,
  notebook,
  shampoo,
  shoulderBag,
  soccerBall,
];

const cart = [];
