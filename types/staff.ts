import { CLEFS, POSITIONS, STAFF_NOTE_COLORS } from "../utils/constants"

export type Clef = typeof CLEFS[keyof typeof CLEFS]

export type Position = typeof POSITIONS[keyof typeof POSITIONS]

export type StaffNoteColor = typeof STAFF_NOTE_COLORS[keyof typeof STAFF_NOTE_COLORS]

export type HighlightKeys = {[key: string]: StaffNoteColor}

