import { KEYS, NOTES } from "../utils/constants"

export type KeyColor = 'black' | 'white'

export type Key = typeof KEYS[number]

export type Note = typeof NOTES[number]