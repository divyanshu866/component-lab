import Navbar from "@/components/Landing/Navbar";
import { getSession } from "@/lib/get-session";
import ExamplesHero from "../../components/Examples/ExamplesHero";
import Grid from "../../components/Examples/Grid";
export default async function Examples() {
  const session = await getSession();

  // if (!session) redirect("/sign-in");
  // console.log("SESSION===>", session);
  return (
    <>
      <Navbar />
      <ExamplesHero />
      <Grid />
    </>
  );
}
