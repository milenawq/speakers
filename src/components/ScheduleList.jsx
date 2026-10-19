import React, { Component } from "react";

class ScheduleList extends Component {
    render() {
        const {
            schedule,
            speakers,
            searchQuery,
            selectedCategory,
            scheduleSort,
            onCategoryChange,
            onSortChange
        } = this.props;

        let filteredSchedule = schedule.filter(talk => {
            const matchesCategory =
                selectedCategory === "All" || talk.category === selectedCategory;

            const matchesSearch =
                talk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                talk.category.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });

        filteredSchedule = [...filteredSchedule].sort((a, b) => {
            if (scheduleSort === "duration") return a.duration - b.duration;
            if (scheduleSort === "seats") return b.availableSeats - a.availableSeats;
            return a.title.localeCompare(b.title);
        });

        return (
            <section>
                <h2>Conference Schedule</h2>

                <div className="filters">
                    <select value={selectedCategory} onChange={onCategoryChange}>
                        <option value="All">All categories</option>
                        <option value="AI">AI</option>
                        <option value="Web">Web</option>
                        <option value="Security">Security</option>
                    </select>

                    <select value={scheduleSort} onChange={onSortChange}>
                        <option value="title">Title: A–Z</option>
                        <option value="duration">Duration: shortest first</option>
                        <option value="seats">Most free seats first</option>
                    </select>
                </div>

                <div className="cards">
                    {filteredSchedule.map(talk => {
                        const speaker = speakers.find(item => item.id === talk.speakerId);

                        return (
                            <article className="card" key={talk.id}>
                                <h3>{talk.title}</h3>
                                <p>Category: {talk.category}</p>
                                <p>Duration: {talk.duration} minutes</p>
                                <p>Free seats: {talk.availableSeats}</p>
                                <p>Speaker: {speaker ? speaker.name : "Unknown"}</p>
                            </article>
                        );
                    })}
                </div>

                {filteredSchedule.length === 0 && <p>No talks found.</p>}
            </section>
        );
    }
}

export default ScheduleList;
