import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TripProvider } from "./contexts/TripContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import DestinationsPage from "./pages/DestinationsPage"
import ItineraryPage from "./pages/ItineraryPage"
import BudgetPage from "./pages/BudgetPage"
import TripSummary from "./pages/TripSummary"

function App() {
  return (
    <ThemeProvider>
      <TripProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="itinerary" element={<ItineraryPage />} />
              <Route path="budget" element={<BudgetPage />} />
              <Route path="summary" element={<TripSummary />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TripProvider>
    </ThemeProvider>
  )
}

export default App