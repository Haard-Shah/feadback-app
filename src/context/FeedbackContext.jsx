import { createContext, useState } from "react"
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([{
        id: 1, 
        text: "This item is from context.",
        rating: 10
    }])

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


    return <FeedbackContext.Provider value ={{
        feedback,
        addFeedbackItem,
        deleteFeedbackItem
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext