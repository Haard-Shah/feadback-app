import { createContext, useState, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        isBeingEdited: false
    })

    useEffect(() => {
        fetchFeedbackData()
    }, [])

    // Fetch feedback data 
    const fetchFeedbackData = async () => {
        const response = await fetch("http://localhost:5000/feedback?_sort=id&_order=desc")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }
    const addFeedbackItem = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const deleteFeedbackItem = (delId) => {
        if(window.confirm('Are you sure you want to delete the item?')) {
            setFeedback(
                feedback.filter((item) => item.id !== delId)
            )
        }
    }

    // Set the item to be edited in context for UI to render it in feedback form component
    const editFeedbackItem = (item) => {
        setFeedbackEdit({
            item, 
            isBeingEdited: true
        })
    }

    const updateFeedbackItem = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...updItem } : item))
        )

        setFeedbackEdit({
            item: {},
            isBeingEdited: false,
        })
    }


    return <FeedbackContext.Provider value ={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedbackItem,
        deleteFeedbackItem,
        editFeedbackItem,
        updateFeedbackItem
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext