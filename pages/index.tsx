import { Game } from "components/Game/Game";
import { Navbar } from "components/Navbar/Navbar";
import { auth } from "lib/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function IndexPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <Game uid={user.uid} />
    </>
  );
}
