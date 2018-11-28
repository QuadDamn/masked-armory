import React, {Component, Fragment} from 'react';

class PetProfileView extends Component {

    getPetLink(petSpellId) {
        return `https://wowhead.com/?spell=${petSpellId}`;
    }

    getPetImage(displayId) {
        return `https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-${displayId}.jpg`;
    }

    render() {
        const {profileData} = this.props;
        const pets = profileData.pets;

        return (
            <Fragment>
                <div id="main-content">
                    <div className="content cont-mounts" id="content">
                        <div className="background dark" />
                        <div className="content-header">
                            <div className="level-name">Level {profileData.level} {profileData.raceName} {profileData.className}</div>
                            <div className="nav-name"><img src="/images/pets.svg" alt=""/>PETS</div>
                        </div>
                        <div className="row mounts">
                            {pets.map((pet) => {
                                return <div className="mount col-md-3 col-sm-4 col-6">
                                    <div className={`mount-image mount-img-quality-${pet.qualityId}`} style={{backgroundImage: `url(${this.getPetImage(pet.displayId)})`}}>
                                        <a href={this.getPetLink(pet.spellId)} />
                                    </div>
                                    <span>{pet.name}</span>
                                </div>
                            })};
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PetProfileView;