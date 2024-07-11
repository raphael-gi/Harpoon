# Harpoon
VSCode version of [harpoon](https://github.com/ThePrimeagen/harpoon) made by [ThePrimeagen](https://www.youtube.com/@ThePrimeagen).

## What does harpoon do?
- Open files of your choice immediately by pressing a single key
- Keep your hands on the keyboard and away from your mouse
- Enhance your vim experience inside of vscode

## Setup
``` JSON
{
    "key": "ctrl+e",
    "command": "harpoon.show"
},
{
    "key": "ctrl+h",
    "command": "harpoon.yoink",
    "args": [0]
},
{
    "key": "ctrl+t",
    "command": "harpoon.yoink",
    "args": [1]
},
{
    "key": "ctrl+n",
    "command": "harpoon.yoink",
    "args": [2]
}
```
``` JSON
"vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["<leader>", "a"],
      "commands": ["harpoon.add"]
    }
]
```
