import React, { Component } from 'react';
import '../../styles/css/rating.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularFaStar } from '@fortawesome/free-regular-svg-icons';

interface RatingProps {
  stars: number;
  readonly: boolean;
  className?: string;
}

class Rating extends Component<RatingProps> {
  maxStars = 5;

  rate = (rate: number) => {
    console.log(`Rated: ${rate}. To do: rating`);
  };

  render() {
    const stars: any = [];
    let i = 1;
    for (i; i <= this.props.stars; i++) {
      const star = i;
      stars.push(
        <FontAwesomeIcon className="starSize" key={i} onClick={() => this.rate(star)} icon={solidFaStar} />
      );
    }
    for (i; i <= this.maxStars; i++) {
      const star = i;
      stars.push(
        <FontAwesomeIcon
          className="starSize"
          key={star}
          onClick={() => this.rate(star)}
          icon={regularFaStar}
        />
      );
    }
    return <span className={`ratingComponent ${this.props.className}`}>{stars}</span>;
  }
}

export { Rating };
