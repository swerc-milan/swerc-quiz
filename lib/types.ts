// /users/:id
export type User = {
  name?: string;
  isAdmin?: boolean;
};

export namespace States {
  export type NoGame = null;
  export type PendingStart = {
    kind: "pendingStart";
    name?: string;
  };
}

// /state
export type State = States.NoGame | States.PendingStart;

// /admin/games
export type Games = Record<string, Game>;

// /admin/games/:id
export type Game = {
  name?: string;
};
