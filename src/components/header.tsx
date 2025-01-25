export default function Header(): JSX.Element {
  return (
    <div className="py-8 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Tracktor</h1>

      <div className="flex flex-row gap-6 text-3xl justify-center">
        <div className="icon runner">🏃🏻‍♂️</div>
        <div className="icon film">🎬</div>
        <div className="icon books">📚</div>
        <div className="icon laptop">💻</div>
      </div>
    </div>
  );
}
