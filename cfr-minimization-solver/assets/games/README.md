# 2-player zero-sum sequential game specification JSON-schema

This project defines a standard way of representing 2-player zero-sum sequential games, for use with
applicable game theory algorithms.  

The schema allows the definer to specify the name and description of the game, as well as a set of game states.

The available types of game states are "Chance" states, Decision states for player 1 or 2, or terminal states.

Chance states list a number of actions, which will be chosen with uniform distribution.  Each action
defines the state that the game will proceed to.

Example chance state: 
```
{
  "name": "chance state",
  "player": "chance",
  "actions": [
    {"action 1": "state A"},
    {"action 2": "state B"},
    {"action 3": "state C"}
  ]
}
```

Decision states define the player (either 1 or 2) whose "turn" it is.  They also define the information known
by that player, which may be a subset of the total information available.  The also define a number of actions 
available to that player, and the game states that each action will proceed to.  

Example decision state: 
```
{
  "name": "decision state",
  "player": 1,
  "knowledge": "player 1 knowledge",
  "actions": [
    {"action 1": "state A"},
    {"action 2": "state B"}
  ]
}
```

Terminal States define a resulting utility, written from the perspective of player 1.  For example, a terminal state
with a result of 1 yeilds a utility of 1 for player 1, and inversely -1 for player 2.  A result of -3 yeilds a utility
of -3 for player 1, and inversely 3 for player 2. 

Example terminal state: 
```
{
  "name": "terminal state",
  "result": -1
},
```

Game State names and Action names are arbitrary strings, and can be defined with human readable meanings.

Included are two examples, including a simple "Even or odd" game, as well as [Kuhn poker](https://en.wikipedia.org/wiki/Kuhn_poker).

The JSON-scema validates the structure, but one additional piece of validation is necessary: for any action specified, the
value must match the name of an existing state.  If not, the game contains a broken link.  This is
a known issue in the schema that should be correct.  For now, make sure to validate this manually in 
any software that utilizes this specification.  

Copyright 2021 Mike Peters.  Source code available under Apache License, Version 2.0.