MD Notepad PWA App
=======

PWA-app build with:

`Vite` + `React` + `React-router` + `TS` + `marked` + `Mantine`

[app demo]( https://notepad.kurkov.online)

- Notes are stored in browser's IndexedDB with monolith singleton-class service Idb.

- The app uses custom useLocalStorage hook as well as useDebounce hook while autosaving notes and searching through notes

- app is build with [Mantine](https://mantine.dev/) component library

- markdown text is sanitized with `purifyDOM` and rendered with `marked` libs

- The app meets all PWA core checklist requirements
