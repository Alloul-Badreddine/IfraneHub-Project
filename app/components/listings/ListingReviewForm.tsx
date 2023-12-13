import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { createReview } from '../../api/reviews/reviewService'; // Update the import path


interface ReviewFormProps {
    onSubmit: (rating: number, comment: string) => void;
 //   userId: string;
  //  listingId: string;
  }

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async () => {
    try {
//      const review = await createReview(userId, listingId, rating, comment);
      onSubmit(rating, comment);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h2> Share Your Experience: </h2>
      <div>
        {/* Use the StarRatings component for star ratings */}
        </div>
        <br></br>
    <label>Rating:</label>
 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <StarRatings
  rating={rating}
  starRatedColor="#ffd700"
  // Specify the type
  changeRating={(newRating: number) => setRating(newRating)}
  numberOfStars={5}
  name="rating"
  starDimension="25px" 
/>
      </div>
      <div>
  <label style={{ fontSize: '18px', marginBottom: '8px', display: 'block' }}>
    Comment:
  </label>
  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    style={{
      width: '100%',
      minHeight: '100px',
      padding: '12px',
      borderRadius: '8px',
      border: '2px solid #2596be',  
      fontSize: '16px',
      marginTop: '5px',
      resize: 'vertical',  
      fontFamily: 'Arial, sans-serif',  
    }}
    placeholder="Share your thoughts..."
  />
</div>

<br></br>
    <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#2596be',
          color: 'white',
          padding: '10px',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '5px',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'lightblue')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2596be')}
      >
        Submit
      </button>   
       </div>
  );
};

export default ReviewForm;
