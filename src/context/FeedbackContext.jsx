import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    isBeingEdited: false,
  });

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  // Fetch feedback data
  const fetchFeedbackData = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc");
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // Add Feedback to db and UI
  const addFeedbackItem = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  const deleteFeedbackItem = async (delId) => {
    if (window.confirm("Are you sure you want to delete the item?")) {
      // Delete from the db
      await fetch(`/feedback/${delId}`, { method: "DELETE" });

      // Delete from the UI
      setFeedback(feedback.filter((item) => item.id !== delId));
    }
  };

  // Set the item to be edited in context for UI to render it in feedback form component
  const editFeedbackItem = (item) => {
    setFeedbackEdit({
      item,
      isBeingEdited: true,
    });
  };

  const updateFeedbackItem = async (id, updItem) => {
    // Update in the DB
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      header: {
        "Content-Type": "applicaiton/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json()

    // Update in the UI
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );

    setFeedbackEdit({
      item: {},
      isBeingEdited: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedbackItem,
        deleteFeedbackItem,
        editFeedbackItem,
        updateFeedbackItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
