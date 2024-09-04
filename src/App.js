import { useState } from "react"
import {v4 as uuidv4} from 'uuid'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackData from "./data/feedbackData"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)

    const deleteFeedbackItem = (delId) => {
        if(window.confirm('Are you sure you want to delete the item?')) {
            setFeedback(
                feedback.filter((item) => item.id !== delId)
            )
        }
    }

    const addFeedbackItem = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    return (
        <>
            <Header />
            <div className="container">
                <FeedbackForm handleAdd={addFeedbackItem}/>
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} handleDelete={deleteFeedbackItem} />
            </div>
        </>
    )
}

export default App