# TechLearn question types

Every question goes inside a lesson's `exercises` array. The `type` field chooses the interaction. The existing types are still supported: `multiple-choice`, `type-answer`, and `match-pairs`.

## True or false

Use `correct: true` or `correct: false`.

```js
{
  type: "true-false",
  statement: "RAM is used for short-term working data.",
  correct: true,
  explanation: "RAM holds data that the computer is actively using."
}
```

## Multi-select

`correctIndices` contains every correct option index. Indexes start at `0`.

```js
{
  type: "multi-select",
  question: "Which are storage devices?",
  options: ["SSD", "RAM", "HDD", "CPU"],
  correctIndices: [0, 2],
  explanation: "SSDs and HDDs are storage devices."
}
```

## Fill in the blank

Use `accepted` for one or more valid answers. Matching ignores case and surrounding spaces.

```js
{
  type: "fill-blank",
  prompt: "The CPU is the ____ of the computer.",
  accepted: ["brain"],
  hint: "It performs instructions",
  explanation: "The CPU processes instructions."
}
```

## Put items in order

`correctOrder` lists the indexes from `items` in the expected order.

```js
{
  type: "order-items",
  question: "Put the troubleshooting steps in the best order.",
  items: ["Test the fix", "Identify the problem", "Apply a solution"],
  correctOrder: [1, 2, 0],
  explanation: "Identify the problem, apply a solution, then test it."
}
```

## General fields

- `explanation` is shown after the answer is checked.
- `hint` is supported by `type-answer` and `fill-blank`.
- Text answers are compared without regard to case or leading/trailing spaces.