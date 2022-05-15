import { KEYS } from "./constants";

export const getKeyFromMidiCode = (midiCode: number) => KEYS[midiCode - 21]
