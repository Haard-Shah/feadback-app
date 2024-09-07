import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const {addFeedbackItem, feedbackEdit, updateFeedbackItem} = useContext(FeedbackContext)

    // This allows use to react to changes that are being watched. 
    // By adding things to the dependency of useEffect(.., [<dependincies here>]) we can 'watch' for changes and affect the state of the app. i.e. cause a render or re-render 
    useEffect(() => {
        // This code runs everytime feedbackEdit changes
        if(feedbackEdit.isBeingEdited === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true)
            setMessage('text must be atleast 10 characters')
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 11) {
            const newFeedback = {
                text,
                rating
            }
            if(feedbackEdit.isBeingEdited === true) {
                updateFeedbackItem(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedbackItem(newFeedback)
            }

            setText('')
            setRating(null)
        }

    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service?</h2>
            <RatingSelect select={setRating} selected={rating}/>
            <div className="input-group">
                <input onChange={handleTextChange} type='text' placeholder={'Write a review'} value={text} />
                <Button type='submit' isDisabled={btnDisabled}>
                    Send
                </Button>
            </div>
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm