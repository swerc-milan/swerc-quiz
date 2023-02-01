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

export type State = States.NoGame | States.PendingStart;
