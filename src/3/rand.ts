import { customAlphabet } from "nanoid";
import { part2 } from ".";

const nanoid = customAlphabet("123456789", 13);

part2([nanoid()]);
