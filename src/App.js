import { useState } from "react"
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackData from "./data/feedbackData"

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)

    const deleteFeedbackItem = (delId) => {
        if(window.confirm('Are you sure you want to delete the item?')) {
            setFeedback(
                feedback.filter((item) => item.id !== delId)
            )
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <FeedbackList feedback={feedback} handleDelete={deleteFeedbackItem} />
            </div>
        </>
    )
}

export default App