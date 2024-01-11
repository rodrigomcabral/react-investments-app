export function Header({ children }) {
  const h1Class = {
    marginTop: "4px",
    fontSize: "20px",
    color: "blue",
    textAlign: "center",
  };

  return (
    <header>
      <h1 style={h1Class}>react-investments-app</h1>
    </header>
  );
}
