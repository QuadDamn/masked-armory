import React, {Fragment} from 'react';

const TitleProfileView = (props) => {
        const {profileData} = props;

        return (
            <Fragment>
                <div id="main-content">
                    <div className="content cont-titles" id="content">
                        <div className="background dark" />
                        <div className="content-header">
                            <div className="level-name">Level {profileData.level} {profileData.raceName} {profileData.className}</div>
                            <div className="nav-name"><img src="/images/titles.svg" alt=""/>TITLES</div>
                        </div>
                        <div className="row titles">
                            {profileData.titles.map((title) => {
                                return <div key={title.id} className="title col-md-4 col-6"><a href={`https://wowhead.com/?title=${title.id}`} target="_blank" rel="noopener noreferrer" className="title-rect">{title.name}</a></div>
                            })};
                        </div>
                    </div>
                </div>
            </Fragment>
        );
};

export default TitleProfileView;