import { Key, KeyColor, Note } from "../types/piano";
import { KEYS } from "./constants";

export const getRandomKey = () => KEYS[Math.floor(Math.random() * KEYS.length)]

export const getKeyColor = (key: Key): KeyColor => key.slice(0, key.length - 1).includes('#') ? 'black' : 'white'

export const getNoteFromKey = (key: Key): Note => key.slice(0, key.length - 1) as Note
