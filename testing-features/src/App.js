import "./App.css";
import { useEffect, useState, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
const Card = lazy(() => import("./Card"));

function App() {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function dog() {
      try {
        let apiData = await fetch("https://api.waifu.pics/sfw/dance", {
          signal,
        });
        console.log(apiData.status);
        if (apiData.status === 404) {
          console.log("calling error");
          throw new Error("Failed to load information");
        }
        let cat = await apiData.json();
        setCardData(cat);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    dog();

    return () => {
      console.log("Clean up");
      controller.abort();
    };
  }, []);

  return (
    <div className="App">
      <h1>test</h1>
      <ErrorBoundary fallback={<p>Failed to load info</p>}>
        <Card cardData={cardData} error={error} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
