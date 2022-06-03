import { Key } from "../types/piano"

export const KEYS = [
    'A0', 'A#0', 'B0',
    'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
    'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
    'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
    'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
    'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
    'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7',
    'C8',
] as const

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',] as const

export const CLEFS = {
    TREBLE: 'treble',
    BASS: 'bass',
} as const

export const CLEF_INTERVALS = {
    [CLEFS.BASS]: ['A0', 'C4'],
    [CLEFS.TREBLE]: ['C4', 'C8'],
} as const

export const POSITIONS = {
    SPACE: 'space',
    LINE: 'line',
    LEDGER_LINE: 'ledgerLine'
} as const

export const NOTES_BY_POSITION = {
    [POSITIONS.SPACE]: [
        'A0', 'C1', 'E1', 'G1', 'B1', 'D2', 'F2', 'A2', 'C3', 'E3', 'G3', 'B3', 'D4', 'F4', 'A4', 'C5',
        'E5', 'G5', 'B5', 'D6', 'F6', 'A6', 'C7', 'E7', 'G7', 'B7',
    ] as Key[],
    [POSITIONS.LINE]: [
        'G2', 'H2', 'D3', 'F3', 'A3', 'E4', 'G4', 'B4', 'D5', 'F5',
    ] as Key[],
    [POSITIONS.LEDGER_LINE]: [
        'B0', 'D1', 'F1', 'A1', 'C2', 'E2', 'C4', 'A5', 'C6', 'E6', 'G6', 'B6', 'D7', 'F7', 'A7', 'C8',
    ] as Key[],
} as const

export const COLORS = {
    BLACK: 'black',
    BLUE: 'blue',
    GRAY: 'gray',
    GREEN: 'green',
    RED: 'red',
} as const

export const STAFF_NOTE_COLORS = (({ BLACK, GRAY, GREEN, RED }) => ({ BLACK, GRAY, GREEN, RED }))(COLORS)

export const PIANO_KEY_COLORS = (({ BLUE, GREEN, RED }) => ({ BLUE, GREEN, RED }))(COLORS)
