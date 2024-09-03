import PropTypes from 'prop-types'

function FeedbackStats({ feedback }) {
    let avgRating = 
        feedback.reduce((sum, curr) => {
            return sum + curr.rating
        }, 0) / feedback.length

    avgRating = avgRating.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Avg. Rating: {isNaN(avgRating) ? 0 : avgRating} </h4>
    </div>
  )
}

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired
}

export default FeedbackStats