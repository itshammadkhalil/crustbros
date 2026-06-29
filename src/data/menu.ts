import pizzaImg from "@/assets/cat-pizza.jpg";
import burgerImg from "@/assets/cat-burger.jpg";
import friesImg from "@/assets/cat-fries.jpg";
import rollImg from "@/assets/cat-roll.jpg";
import wingsImg from "@/assets/cat-wings.jpg";
import pastaImg from "@/assets/cat-pasta.jpg";
import sandwichImg from "@/assets/cat-sandwich.jpg";
import broastImg from "@/assets/cat-broast.jpg";
import chaatImg from "@/assets/cat-chaat.jpg";
import shakeImg from "@/assets/cat-shake.jpg";
import iceImg from "@/assets/cat-icecream.jpg";
import margaritaImg from "@/assets/cat-margarita.jpg";
import cakeImg from "@/assets/cat-cake.jpg";
import drinkImg from "@/assets/cat-drink.jpg";
import dealImg from "@/assets/cat-deal.jpg";

export type SizeOption = { size: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  type?: string;
  sizes: SizeOption[];
  image: string;
  description?: string;
  dealGroup?: string;
};

export const CATEGORIES = [
  "Pizza", "Burgers", "French Fries", "Chicken Rolls", "Hot Wings",
  "Pasta", "Sandwich", "Broast Chicken", "Fruit Chaat",
  "Shakes & Cold Coffee", "Ice Cream", "Margarita", "Cake", "Drinks", "Deals",
] as const;

export const DEAL_FILTERS = [
  "All", "Pizza Deals", "Lunch & Midnight", "1 Person", "2 Person", "Family", "Student",
] as const;

const pz = (name: string, type: string, prices: number[]) => {
  const sizeNames = ["Small", "Medium", "Large", "Family"];
  const sizes: SizeOption[] = prices.map((p, i) => ({ size: sizeNames[i], price: p }));
  return {
    id: `pz-${name.replace(/\s+/g, "-").toLowerCase()}`,
    name, category: "Pizza", type, sizes, image: pizzaImg,
  } as MenuItem;
};

const single = (cat: string, name: string, price: number, image: string): MenuItem => ({
  id: `${cat}-${name}`.replace(/\s+/g, "-").toLowerCase(),
  name, category: cat, image, sizes: [{ size: "Regular", price }],
});

export const MENU: MenuItem[] = [
  // STANDARD pizzas
  ...["Vege Lover Pizza","Supreme Pizza","Cheese Lover Pizza","Shahi Pizza","Chicken Tikka Pizza","Achari Pizza","Chicken Fajita Pizza","Bonfire Pizza","Simple Malai Boti Pizza"]
    .map(n => pz(n, "Standard", [550,1100,1450,2000])),
  // CLASSIC
  ...["Crush Kabab Pizza","Crunchy Pizza","Creamy Pizza","Pepperoni Pizza"]
    .map(n => pz(n, "Classic", [600,1200,1600,2100])),
  // PREMIUM
  ...["Lazania Malai Boti Pizza","Cheese Crust Pizza","Behari Kabab Pizza","Multani Pizza","Seekh Kabab Pizza","Lazania Pizza","Extreme Pizza","Crown Crust Pizza","Squire Crust Pizza"]
    .map(n => pz(n, "Premium", [700,1350,1750,2350])),
  // SPECIAL PIZZAZ
  ...["Double Seekh Kabab Pizza","Crispy Crust Pizza","Special Multan Sultan Pizza","4X Pizza (Any 4 Flavours)","Mughlai Pizza","Royal Crust Pizza"]
    .map(n => pz(n, "Special", [800,1550,1900,2750])),
  // NEW ADDITION (Medium & Large only)
  ...["Double Extreme Pizza","Lazania Double Extreme","Seekh Kabab Double Extreme","Parry Parry Extreme"].map(n => ({
    id: `pz-${n.replace(/\s+/g,"-").toLowerCase()}`,
    name: n, category: "Pizza", type: "New",
    sizes: [{size:"Medium",price:1600},{size:"Large",price:2200}], image: pizzaImg,
  } as MenuItem)),
  // SPECIAL MAZZ
  { id:"pz-special-mazz", name:"Special Mazz Pizza", category:"Pizza", type:"Special Mazz",
    sizes:[{size:"Large",price:2400},{size:"Family",price:3200}], image: pizzaImg },
  // MATAKA
  ...["Malai Boti Pizza (Mataka)","Tikka Boti Pizza (Mataka)","Kabab Pizza (Mataka)"].map(n => ({
    id: `pz-${n.replace(/\s+/g,"-").toLowerCase()}`,
    name: n, category: "Pizza", type: "Mataka",
    sizes: [{size:"Mataka", price:1100}], image: pizzaImg,
  } as MenuItem)),
  // SPECIAL STEAK
  { id:"pz-special-steak", name:"Special Steak Pizza", category:"Pizza", type:"Steak",
    sizes:[{size:"Medium",price:1100},{size:"Large",price:1400}], image: pizzaImg },

  // BURGERS
  ...[
    ["Zinger Burger",370],["Chicken Burger",320],["Mighty Burger",650],["Pizza Burger",600],
    ["Jalapeno Burger",370],["Tikka Burger",320],["Double Decker Burger",600],["Double Patty Burger",600],
    ["Crust Bros 0 Burger",660],["Special Grill Tikka Burger",500],["Special Sunny Grill Burger",650],["Special Beef Burger",650],
  ].map(([n,p]) => single("Burgers", n as string, p as number, burgerImg)),
  single("Burgers","Extra Cheese Slice (Add-on)", 70, burgerImg),

  // FRENCH FRIES
  { id:"fr-fries", name:"French Fries", category:"French Fries", image: friesImg,
    sizes:[{size:"Small",price:250},{size:"Large",price:350},{size:"Family",price:500}] },
  { id:"fr-loaded", name:"Loaded Pizza Fries", category:"French Fries", image: friesImg,
    sizes:[{size:"Small",price:500},{size:"Large",price:700}] },
  { id:"fr-crunchy", name:"Crunchy Pizza Fries", category:"French Fries", image: friesImg,
    sizes:[{size:"Small",price:550},{size:"Large",price:800}] },

  // CHICKEN ROLLS
  ...[
    ["MFC Special Malai Boti Roll",350],["Shawarma Roll",220],["Cheese Shawarma Roll",320],
    ["Pratha Roll",320],["Zinger Pratha Roll",380],["Zinger Shawarma Roll",380],
    ["Kabab Roll",320],["Arabian Shamoli",320],["Twister Roll",340],["Shapata Roll",800],
  ].map(([n,p]) => single("Chicken Rolls", n as string, p as number, rollImg)),
  single("Chicken Rolls","Extra Cheese Slice (Add-on)", 70, rollImg),

  // HOT WINGS
  ...[
    ["6 Pc Hot Wings/Nuggets",320],["12 Pc Hot Wings/Nuggets",600],["10 Pc Oven Baked Wings",600],
    ["10 Pc Honey Wings",600],["10 Pc Crunchy Hot Shot",450],["Hot Shot Shakers",500],
  ].map(([n,p]) => single("Hot Wings", n as string, p as number, wingsImg)),

  // PASTA
  ...[
    ["MFC 20 20 Pasta",550,750],["Flaming Pasta",500,700],["Crunchy Pasta",550,750],["White Sauce Pasta",550,750],
  ].map(([n,h,f]) => ({
    id:`pa-${(n as string).replace(/\s+/g,"-").toLowerCase()}`,
    name:n as string, category:"Pasta", image: pastaImg,
    sizes:[{size:"Half",price:h as number},{size:"Full",price:f as number}],
  } as MenuItem)),

  // SANDWICH
  ...[["Tikka Sandwich",600],["Mexican Sandwich",650],["Malai Boti Sandwich",650],["Kabab Sandwich",650]]
    .map(([n,p]) => single("Sandwich", n as string, p as number, sandwichImg)),

  // BROAST CHICKEN
  ...[
    ["Leg Broast / Grill Leg",380],["Chest Broast / Grill Chest",400],
    ["Quarter Broast",650],["Half Broast",1200],["Full Injected Broast",2400],
    ["Extra Bun (Add-on)",50],["Extra Dip Sauce (Add-on)",50],
  ].map(([n,p]) => single("Broast Chicken", n as string, p as number, broastImg)),

  // FRUIT CHAAT
  single("Fruit Chaat","Fruit Chaat",300, chaatImg),
  single("Fruit Chaat","Russian Salad",400, chaatImg),

  // SHAKES & COLD COFFEE
  ...["Brownie","Love Story","Oreo","Kit Kat","Strawberry","Vanilla","Chocolate","Coffee","Mango","Kulfa","Caramel"]
    .map(n => single("Shakes & Cold Coffee", `${n} Shake`, 400, shakeImg)),
  single("Shakes & Cold Coffee","MFC Special Cold Coffee",500, shakeImg),
  single("Shakes & Cold Coffee","Cold Coffee",400, shakeImg),
  single("Shakes & Cold Coffee","Simple Cold Coffee",400, shakeImg),
  single("Shakes & Cold Coffee","Lotus Special",400, shakeImg),

  // ICE CREAM
  ...["Vanilla","Chocolate","Pesta","Strawberry","Mango","Tutti Fruti","Kulfa","Creamel"]
    .map(n => single("Ice Cream", `${n} Ice Cream`, 250, iceImg)),

  // MARGARITA
  single("Margarita","Fresh Lime Margarita",150, margaritaImg),
  single("Margarita","Mint Margarita",200, margaritaImg),
  single("Margarita","Strawberry Margarita",200, margaritaImg),
  single("Margarita","Blue Berry Margarita",200, margaritaImg),

  // CAKE
  single("Cake","1 Pound Chocolate Cake",600, cakeImg),
  single("Cake","1 Pound Pineapple Cake",600, cakeImg),
  single("Cake","2 Pound Chocolate Cake",1200, cakeImg),
  single("Cake","2 Pound Pineapple Cake",1200, cakeImg),

  // DRINKS (prices not on printed menu — left at 0, hidden price tag)
  { id:"dr-500", name:"Drink 500ml", category:"Drinks", image: drinkImg, sizes:[{size:"500ml",price:0}] },
  { id:"dr-1000", name:"Drink 1 Litre", category:"Drinks", image: drinkImg, sizes:[{size:"1L",price:0}] },
  { id:"dr-1500", name:"Drink 1.5 Litre", category:"Drinks", image: drinkImg, sizes:[{size:"1.5L",price:0}] },
  { id:"dr-2250", name:"Drink 2.25 Litre", category:"Drinks", image: drinkImg, sizes:[{size:"2.25L",price:0}] },

  // ===== DEALS =====
  // Pizza Deals
  ...[
    ["Deal 1","1 Small Lazania Pizza + 1 Zinger Burger + 1 500ml Drink",1150],
    ["Deal 2","1 Tikka Pizza Small + 1 Fajita Pizza Small + 1 Drink 500ml",1150],
    ["Deal 3","1 Tikka Pizza Medium + 1 Fajita Pizza Small + 1000ml Drink",1750],
    ["Deal 4","1 Seekh Kabab Pizza Large + 12 Pc Hot Wings + 1500ml Drink",2450],
    ["Deal 5","1 Tikka Pizza Medium + 1 Fajita Pizza Medium + 1000ml Drink",2350],
    ["Deal 6","1 Tikka Pizza Large + 1 Fajita Pizza Large + 1500ml Drink",2950],
  ].map(([n,d,p]) => ({
    id:`deal-pz-${n}`.replace(/\s+/g,"-").toLowerCase(),
    name:`Pizza ${n}`, category:"Deals", dealGroup:"Pizza Deals", description: d as string,
    image: dealImg, sizes:[{size:"Deal",price:p as number}],
  } as MenuItem)),
  // Lunch & Midnight
  ...[
    ["Deal 1","3 Zinger Burgers + 1 Litre Drink",1200],
    ["Deal 2","1 Medium Tikka Pizza + Half Litre Coke",1170],
    ["Deal 3","1 Large Tikka Pizza + 1 Litre Drink",1550],
    ["Deal 4","4 Zinger Burgers + 1.5 Litre Coke",1600],
    ["Deal 5","1 Large Tikka Pizza + 1 Small Kabab Pizza + 1.5 Litre Coke",2150],
    ["Deal 6","1 Large Lazania Pizza + 1 Large Kabab Pizza + 1 Large Fajita Pizza + 2.25 Litre Coke",4800],
    ["Deal 7","1 Creamy Sandwich + 1 Drink 500ml",700],
    ["Deal 8","1 Family Tikka Pizza + 1 Drink 1.5 Litre",2100],
    ["Deal 9","6 Wings + 6 Nuggets + 1 Small Kabab Pizza + 1 Litre Drink",1350],
    ["Deal 10","1 Shahi Pizza Large + 1 Bonfire Pizza Medium + 1 Litre Drink",2550],
    ["Deal 11","1 Lazania Small + 1 Drink 500ml",750],
    ["Deal 12","1 Paratha Roll + 1 Malai Boti Roll + 1 Shawarma Roll + 1 Zinger Paratha Roll + 1 Litre Drink",1250],
  ].map(([n,d,p]) => ({
    id:`deal-lm-${n}`.replace(/\s+/g,"-").toLowerCase(),
    name:`L&M ${n}`, category:"Deals", dealGroup:"Lunch & Midnight", description: d as string,
    image: dealImg, sizes:[{size:"Deal",price:p as number}],
  } as MenuItem)),
  // 1 Person
  ...[
    ["Deal 1","1 Chicken Burger + 1 500ml Drink",410],
    ["Deal 2","1 Tikka Burger + 1 500ml Drink",410],
    ["Deal 3","1 Zinger Burger + 1 500ml Drink",460],
    ["Deal 4","1 Jalapeno Burger + 1 500ml Drink",440],
    ["Deal 5","1 Chicken Burger + 1 500ml Drink + 1 Small Fries",650],
    ["Deal 6","1 Zinger Burger + 1 Small Fries + 1 500ml Drink",700],
  ].map(([n,d,p]) => ({
    id:`deal-1p-${n}`.replace(/\s+/g,"-").toLowerCase(),
    name:`Solo ${n}`, category:"Deals", dealGroup:"1 Person", description: d as string,
    image: dealImg, sizes:[{size:"Deal",price:p as number}],
  } as MenuItem)),
  // 2 Person
  ...[
    ["Deal 1","2 Shawarma Rolls + 1 500ml Drink",500],
    ["Deal 2","2 Chicken Burgers + 1 500ml Drink",720],
    ["Deal 3","2 Pratha Rolls + 1 500ml Drink",720],
    ["Deal 4","1 Flaming Pasta Full + 1 500ml Drink",780],
    ["Deal 5","4 Pc Behari Roll + 1 500ml Drink",650],
    ["Deal 6","2 Zinger Burgers + 1 500ml Drink",820],
  ].map(([n,d,p]) => ({
    id:`deal-2p-${n}`.replace(/\s+/g,"-").toLowerCase(),
    name:`Duo ${n}`, category:"Deals", dealGroup:"2 Person", description: d as string,
    image: dealImg, sizes:[{size:"Deal",price:p as number}],
  } as MenuItem)),
  // Family
  ...[
    ["Deal 1","5 Zinger Burgers + 1500ml Drink",1950],
    ["Deal 2","2 Small Tikka Pizzas + 4 Zinger Burgers + Large Fries + 1500ml Drink",3050],
    ["Deal 3","1 Large Lazania Pizza + 2 Zinger Burgers + 2 Chicken Burgers + Large Fries + 2.25 Litre Drink",3200],
  ].map(([n,d,p]) => ({
    id:`deal-fam-${n}`.replace(/\s+/g,"-").toLowerCase(),
    name:`Family ${n}`, category:"Deals", dealGroup:"Family", description: d as string,
    image: dealImg, sizes:[{size:"Deal",price:p as number}],
  } as MenuItem)),
  // Student
  ...[
    ["Deal 1","1 Small Pizza Kabab + 6 Pc Wings + 1 500ml Drink",1080],
    ["Deal 2","1 Medium Pizza Kabab + 1 Litre Drink",1450],
    ["Deal 3","1 Large Simple Malai Boti Pizza + 1 Litre Drink",1550],
  ].map(([n,d,p]) => ({
    id:`deal-stu-${n}`.replace(/\s+/g,"-").toLowerCase(),
    name:`Student ${n}`, category:"Deals", dealGroup:"Student", description: d as string,
    image: dealImg, sizes:[{size:"Deal",price:p as number}],
  } as MenuItem)),
];
