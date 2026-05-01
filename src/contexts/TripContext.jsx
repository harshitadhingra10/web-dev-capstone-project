import { createContext, useContext, useState, useEffect } from "react"

const TripContext = createContext()

export const useTrip = () => useContext(TripContext)

export const TripProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState([])
  const [budget, setBudget] = useState({ total: 0, expenses: [] })

  useEffect(() => {
    const savedItinerary = localStorage.getItem("itinerary")
    const savedBudget = localStorage.getItem("budget")
    if (savedItinerary) setItinerary(JSON.parse(savedItinerary))
    if (savedBudget) setBudget(JSON.parse(savedBudget))
  }, [])

  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary))
    localStorage.setItem("budget", JSON.stringify(budget))
  }, [itinerary, budget])

  const addToItinerary = (item) => {
    setItinerary([...itinerary, { ...item, id: Date.now() }])
  }

  const removeFromItinerary = (id) => {
    setItinerary(itinerary.filter(item => item.id !== id))
  }

  const addExpense = (expense) => {
    setBudget({
      total: budget.total + expense.amount,
      expenses: [...budget.expenses, { ...expense, id: Date.now() }]
    })
  }

  return (
    <TripContext.Provider value={{
      itinerary, addToItinerary, removeFromItinerary, budget, addExpense
    }}>
      {children}
    </TripContext.Provider>
  )
}