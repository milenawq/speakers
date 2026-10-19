import React, { Component } from "react";

class SpeakersList extends Component {
    render() {
        const {
            speakers,
            searchQuery,
            selectedSpecialization,
            speakerSort,
            onSpecializationChange,
            onSortChange
        } = this.props;

        let filteredSpeakers = speakers.filter(speaker => {
            const matchesSpecialization =
                selectedSpecialization === "All" ||
                speaker.specialization === selectedSpecialization;

            const matchesSearch =
                speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                speaker.specialization.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSpecialization && matchesSearch;
        });

        filteredSpeakers = [...filteredSpeakers].sort((a, b) => {
            if (speakerSort === "rating") return b.rating - a.rating;
            if (speakerSort === "experience") return b.experience - a.experience;
            return a.name.localeCompare(b.name);
        });

        return (
            <section>
                <h2>Speakers</h2>

                <div className="filters">
                    <select value={selectedSpecialization} onChange={onSpecializationChange}>
                        <option value="All">All specializations</option>
                        <option value="AI">AI</option>
                        <option value="Web">Web</option>
                        <option value="Security">Security</option>
                    </select>

                    <select value={speakerSort} onChange={onSortChange}>
                        <option value="rating">Rating: highest first</option>
                        <option value="experience">Experience: highest first</option>
                        <option value="name">Name: A–Z</option>
                    </select>
                </div>

                <div className="cards">
                    {filteredSpeakers.map(speaker => (
                        <div className="card" key={speaker.id}>
                            <h3>{speaker.name}</h3>
                            <p>Specialization: {speaker.specialization}</p>
                            <p>Experience: {speaker.experience} years</p>
                            <p>Rating: {speaker.rating}</p>
                        </div>
                    ))}
                </div>

                {filteredSpeakers.length === 0 && <p>No speakers found.</p>}
            </section>
        );
    }
}

export default SpeakersList;
