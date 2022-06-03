import { Key } from "../types/piano"
import { Clef, Position } from "../types/staff"
import { getReversedArray, getSubArray } from "./arrayHelper"
import { CLEF_INTERVALS, KEYS, NOTES_BY_POSITION, POSITIONS } from "./constants"

export const getAllNotesInClef = (clef: Clef) =>
    getReversedArray(
        getSubArray(
            [...KEYS], CLEF_INTERVALS[clef] as [Key, Key]
        )
    )

export const getStaffNotes = (clef: Clef) => getAllNotesInClef(clef).filter(note => !note.includes('#'))

export const isSharp = (note?: Key | null) => (note && note.includes('#')) ?? false

export const withoutSharp = (note?: Key | null) => note && note.replace('#', '')

export const getPosition = (key: Key) =>
    Object.values(POSITIONS).find((position: Position) => NOTES_BY_POSITION[position].includes(key))
