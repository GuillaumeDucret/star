import { describe, it } from 'vitest'
import { analyse } from '../src/analyse'

const ast = JSON.parse(`{
  "type": "Root",
  "script": {
    "type": "Script",
    "content": {
      "type": "Program",
      "start": 0,
      "end": 11,
      "body": [
        {
          "type": "VariableDeclaration",
          "start": 0,
          "end": 11,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 4,
              "end": 11,
              "id": {
                "type": "Identifier",
                "start": 4,
                "end": 5,
                "name": "a"
              },
              "init": {
                "type": "Literal",
                "start": 8,
                "end": 11,
                "value": "a",
                "raw": "'a'"
              }
            }
          ],
          "kind": "let"
        }
      ],
      "sourceType": "script"
    },
    "start": 0,
    "end": 28
  },
  "template": {
    "type": "Template",
    "fragment": {
      "type": "Fragment",
      "nodes": [
        {
          "type": "Element",
          "name": "div",
          "fragment": {
            "type": "Fragment",
            "nodes": [
              {
                "type": "Text",
                "start": 43,
                "end": 45,
                "raw": "aa"
              }
            ]
          },
          "start": 38,
          "end": 51
        },
        {
          "type": "Text",
          "start": 82,
          "end": 84,
          "raw": "dd"
        }
      ]
    },
    "style": {
      "type": "Style",
      "content": {
        "type": "StyleSheet",
        "loc": null,
        "children": [
          {
            "type": "Rule",
            "loc": null,
            "prelude": {
              "type": "SelectorList",
              "loc": null,
              "children": [
                {
                  "type": "Selector",
                  "loc": null,
                  "children": [
                    {
                      "type": "TypeSelector",
                      "loc": null,
                      "name": "div"
                    }
                  ]
                }
              ]
            },
            "block": {
              "type": "Block",
              "loc": null,
              "children": [
                {
                  "type": "Declaration",
                  "loc": null,
                  "important": false,
                  "property": "color",
                  "value": {
                    "type": "Value",
                    "loc": null,
                    "children": [
                      {
                        "type": "Identifier",
                        "loc": null,
                        "name": "red"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      },
      "start": 51,
      "end": 82
    },
    "end": 95
  }
}`)

describe('analyse()', {}, () => {
    it('simple', {}, () => {
        console.log(JSON.stringify(analyse(ast), undefined, 2))
    })
})
