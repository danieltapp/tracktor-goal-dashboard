import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./data/query-client";
import Header from "./components/header";
import { Overview } from "./components/overview";
import StarryNight from "./components/starry-night";
import { Progress } from "./components/progress";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StarryNight />
      <div className="flex align-center justify-center">
        <Header />
      </div>
      <div className="p-6">
        <Overview />
        <Progress />
      </div>
    </QueryClientProvider>
  );
}

export default App;
