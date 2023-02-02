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
  export type QuestionOpen<Timestamp = number> = {
    kind: "questionOpen";
    gameId?: string;
    questionId?: string;
    index?: number;
    text?: string;
    time?: number;
    layout?: "list" | "grid";
    answers?: Answer[];
    startTime?: Timestamp;
  };
  export type PendingReveal = {
    kind: "pendingReveal";
    gameId?: string;
    questionId?: string;
    index?: number;
    startTime?: number;
  };
  export type QuestionReveal = {
    kind: "questionReveal";
    gameId?: string;
    questionId?: string;
    index?: number;
    text?: string;
    layout?: "list" | "grid";
    answers?: Answer[];
    correctAnswerId?: string;
  };
  export type CurrentRanking = {
    kind: "currentRanking";
    gameId?: string;
    questionId?: string;
    index?: number;
    ranking?: Ranking[];
    hideRanking?: boolean;
  };
}

// /state
export type State =
  | States.NoGame
  | States.PendingStart
  | States.NextQuestionSoon
  | States.QuestionOpen
  | States.PendingReveal
  | States.QuestionReveal
  | States.CurrentRanking;

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
  layout?: "list" | "grid";
  answers?: Answer[];
  correctAnswerId?: string;
  hideRanking?: boolean;
};

// /admin/games/:id/questions[i]/answers[j]
export type Answer = {
  id?: string;
  text?: string;
};

// /answers/:gameId/:questionId/:uid
export type Submission = {
  ts: number;
  answerId: string;
};

// /ranking/:gameId/:questionId
export type Ranking = {
  uid: string;
  rank: number;
  score: number;
  delta: number;
};
