import React from 'react';  
import { useHistory } from 'react-router-dom';

import MockImage from 'assets/default-profile.jpg'; 
import { Title, Span } from 'components';

const BlogCard = ({
    data, 
    hoverText = 'Devamını Oku',  
    selected = false, 
}) => {  
    const history = useHistory();
    const go = () => {
        return history.push('/blog-detail/' + data?.seo_friendly_url);
      };  

    return (
        <div className={selected ? 'long-user-card scale-t' : 'long-user-card'}>

            <div className="long-user-card__img-wrapper">
                <img
                    className="long-user-card__img"
                    src={data?.photo ? data?.photo : MockImage}
                />
                <div className="long-user-card__navigator-wrapper">
                    <div
                        className="long-user-card__profile-navigator"
                        onClick={() => go()}
                    >
                        {hoverText}
                    </div>
                </div>
            </div>

            <div className="long-user-card__body">
                <Span underline> <Title textAlign="left" component="h5">
                    {data?.title}
                </Title></Span>
                <div className="long-user-card__location-wrapper">
                    <div className="long-user-card__detail">
                        {data?.detail}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BlogCard;

