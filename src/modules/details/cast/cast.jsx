
import React from "react";
import ContentWrapper from "../../../shared/contentWrapper/contentWrapper";
import avtar from '../../../assets/avatar.png'
import "./style.scss";
import { useSelector } from "react-redux";

const Cast = ({ Cast }) => {

    const { profile } = useSelector((state) => state.homepage.url)
    return (
        <div className="castSection">
            <ContentWrapper><div className="sectionHeading">Top Cast</div></ContentWrapper>
            <ContentWrapper>
                <div className="listItems">
                    {
                        Cast?.map((item) => {
                            const profileImg = item.profile_path ? (profile + item.profile_path) : avtar
                            return <div className="listItem" key={item.id} >
                                <div className="profileImg">
                                    <img src={profileImg} />
                                </div>
                                <div className="name">
                                    {item.name}
                                </div>
                                <div className="character">
                                    {item.character}
                                </div>
                            </div>
                        })
                    }
                </div>

            </ContentWrapper >
        </div >
    );
};

export default Cast;
// profileImg = item.profile_path ? (profile + item.profile_path) : (profile + avtar)