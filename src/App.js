import { Header } from "./Components/Header";
import { Investments } from "./Components/Investments";
import { Main } from "./Components/Main";

export default function App() {
  console.log("Teste no console do navegador");

  return (
    <>
      <Header></Header>

      <Main>
        <Investments />
      </Main>
    </>
  );
}
