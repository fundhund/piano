import { KEYS } from "./constants";

export const getKeyFromMidiCode = (midiCode: number) => KEYS[midiCode - 21]

export const MIDI_COMMANDS = {
    NOTE_OFF: 128,
    NOTE_ON: 144,
}
