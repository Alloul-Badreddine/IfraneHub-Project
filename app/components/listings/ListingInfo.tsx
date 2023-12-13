'use client';

import dynamic from "next/dynamic";
import { useState } from 'react';
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

import ReviewForm from './ListingReviewForm';
import StarRatings from 'react-star-ratings';






const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface Review {
  user: SafeUser;
  rating: number;
  comment: string;
}

interface ListingInfoProps {
  user: SafeUser,
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
  listingId: string; // Include the listingId in the props

}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  listingId, // Access the listingId from props

}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng

  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (rating: number, comment: string) => {
    const newReview: Review = {
      user: user,
      rating,
      comment,
    };
    setReviews([...reviews, newReview]);
    // You can send the review data to your server/database if needed
  };


  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
  
  {/* Reviews section */}
  <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Avatar src={review.user.image} />
              {review.user.name}
            </div>  
            <br></br>      
                  <StarRatings
                rating={review.rating}
                starRatedColor="#ffd700"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="1px"
                name={`rating-${index}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <br></br><br></br>
              <strong>Comment:</strong> {review.comment}
            </div>

          </li>
        ))}
      </ul>
    </div>


      {/* Review form */}
      <ReviewForm onSubmit={addReview} />
  
      {/* Review form */}


    </div>
  );
  
}
 
export default ListingInfo;