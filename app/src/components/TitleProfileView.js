import React, {Component, Fragment} from 'react';

class TitleProfileView extends Component {
    titleSort(titles) {
        let arrayLength = titles.length;

        for (let i = 0; i < arrayLength; i++) {
            let cleanTitle = titles[i].name.replace('%s', '');
            cleanTitle = cleanTitle.replace(',', '');
            titles[i].name = cleanTitle.trim();
        }

        titles.sort((a, b) => {
            a = a['name'];
            b = b['name'];
            return a == b ? 0 : (a < b ? -1 : 1)
        });

        return titles;
    }

    render() {
        const {profileData} = this.props;
        const sortedTitles = this.titleSort(profileData.titles);

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
                            {sortedTitles.map((title) => {
                                return <div key={title.id} className="title col-md-4 col-6"><a href={`https://wowhead.com/?title=${title.id}`} target="_blank" className="title-rect">{title.name}</a></div>
                            })};
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TitleProfileView;