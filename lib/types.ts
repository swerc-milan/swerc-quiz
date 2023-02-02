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
    imageId?: string;
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
    imageId?: string;
    layout?: "list" | "grid";
    answers?: Answer[];
    correctAnswerId?: string;
    answerCounts?: Record<string, number>;
  };
  export type CurrentRanking = {
    kind: "currentRanking";
    gameId?: string;
    questionId?: string;
    index?: number;
    ranking?: Rank[];
    hideRanking?: boolean;
  };
  export type PendingFinalRanking = {
    kind: "pendingFinalRanking";
    gameId?: string;
    questionId?: string;
  };
  export type FinalRanking = {
    kind: "finalRanking";
    gameId?: string;
    questionId?: string;
    ranking?: Rank[];
    hideFirst?: number;
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
  | States.CurrentRanking
  | States.PendingFinalRanking
  | States.FinalRanking;

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
  imageId?: string;
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
  ranking: Rank[];
  answerCounts: Record<string, number>;
  computedAt: number;
};

// /ranking/:gameId/:questionId/ranking[i]
export type Rank = {
  uid: string;
  rank: number;
  score: number;
  delta: number;
};

// /images/:id
export type Image = {
  kind?: "img";
  url: string;
};
