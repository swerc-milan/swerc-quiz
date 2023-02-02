// /users/:id
export type User = {
  name?: string;
  isAdmin?: boolean;
};

export namespace States {
  export type NoGame = null;
  export type PendingStart = {
    kind: "pendingStart";
    gameId?: string;
    name?: string;
  };
  export type NextQuestionSoon = {
    kind: "nextQuestionSoon";
    gameId?: string;
    questionId?: string;
    index?: number;
    topic?: string;
    time?: number;
  };
}

// /state
export type State =
  | States.NoGame
  | States.PendingStart
  | States.NextQuestionSoon;

// /admin/games
export type Games = Record<string, Game>;

// /admin/games/:id
export type Game = {
  name?: string;
  questions?: Question[];
};

// /admin/games/:id/questions[i]
export type Question = {
  id: string;
  index?: number;
  topic?: string;
  text?: string;
  time?: number;
};
