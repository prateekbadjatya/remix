export const meta = () => {
  return [
    { title: "Prateek badjatya" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <i className="fa fa-car"></i>
      <i className="fa fa-car" style={{ fontSize: "48px", color: "red" }}></i>
      <h1>Home Page</h1>
    </>
  );
}
