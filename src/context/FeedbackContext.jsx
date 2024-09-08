import { createContext, useState, useEffect } from "react"

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
        const response = await fetch("/feedback?_sort=id&_order=desc")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }
    
    // Add Feedback to db and UI
    const addFeedbackItem = async (newFeedback) => {
        const response = await fetch("/feedback", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
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