import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import DestinationsPage from "./pages/DestinationsPage"
import ItineraryPage from "./pages/ItineraryPage"
import BudgetPage from "./pages/BudgetPage"
import { TripProvider } from "./contexts/TripContext"

function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="itinerary" element={<ItineraryPage />} />
            <Route path="budget" element={<BudgetPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TripProvider>
  )
}

export default App