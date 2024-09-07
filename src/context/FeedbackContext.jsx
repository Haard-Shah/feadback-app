import { createContext, useState } from "react"
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1, 
            text: "This review is item 1.",
            rating: 10
        },
        {
            id: 2, 
            text: "This review is item 2.",
            rating: 9
        },
        {
            id: 3, 
            text: "This review is item 3.",
            rating: 7
        },
])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        isBeingEdited: false
    })

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
        //ASK: how this works? with the item spreader and upditem spreader
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
        addFeedbackItem,
        deleteFeedbackItem,
        editFeedbackItem,
        updateFeedbackItem
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext