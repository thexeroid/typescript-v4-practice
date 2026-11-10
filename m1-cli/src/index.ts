import { readFile } from "node:fs/promises";

type Item = {
  name: string;
  price: number;
};

function isItem(x: unknown): x is Item {
  return (
    x !== null &&
    typeof x === "object" &&
    "name" in x &&
    typeof x.name === "string" &&
    "price" in x &&
    typeof x.price === "number"
  );
}

const parseJSONFromFile = async (filePath: string): Promise<Item[]> => {
  const fileContent = await readFile(filePath, "utf-8");
  const parsed: unknown = JSON.parse(fileContent);

  if (!(Array.isArray(parsed) && parsed.every(isItem)))
    throw new Error("Invalid data format");

  return parsed;
};

type Computed = {
  cheapest: string;
  total: number;
};

const compute = (input: Item[]): Computed => {
  if (input.length === 0) throw new Error("The file has no data.");

  let total = 0;
  let cheapest = "";
  let runningMinPrice = Infinity;

  for (const item of input) {
    total += item.price;
    if (runningMinPrice > item.price) {
      runningMinPrice = item.price;
      cheapest = item.name;
    }
  }

  return {
    cheapest,
    total,
  };
};

const app = async () => {
  const [inputPath] = process.argv.slice(2);
  if (!inputPath) throw new Error("The specified path cannot be empty");

  const parsed = await parseJSONFromFile(inputPath);

  const { cheapest, total } = compute(parsed);

  console.log(`
    The cheapest item is: ${cheapest}.
    The total price is: ${total}.
  `);
};

app().catch((err) => console.error(err));
