import { KEYS, NOTES, PIANO_KEY_COLORS } from "../utils/constants"

export type KeyColor = 'black' | 'white'

export type Key = typeof KEYS[number]

export type Note = typeof NOTES[number]

export type PianoKeyColor = typeof PIANO_KEY_COLORS[keyof typeof PIANO_KEY_COLORS]

export type HighlightKeys = {[key: string]: PianoKeyColor}

