import React, { Component } from "react";

class ConferenceStatistics extends Component {
    render() {
        const { speakers, schedule, registrations } = this.props;

        const totalDuration = schedule.reduce((total, talk) => total + talk.duration, 0);

        const totalAvailableSeats = schedule.reduce(
            (total, talk) => total + talk.availableSeats,
            0
        );

        const fullyBookedTalks = schedule.filter(talk => talk.availableSeats === 0).length;

        const allTalksHaveValidDuration = schedule.every(talk => talk.duration > 0);

        return (
            <section className="statistics">
                <h2>Conference Statistics</h2>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>{schedule.length}</h3>
                        <p>Total talks</p>
                    </div>

                    <div className="stat-card">
                        <h3>{speakers.length}</h3>
                        <p>Total speakers</p>
                    </div>

                    <div className="stat-card">
                        <h3>{totalDuration} min</h3>
                        <p>Total duration</p>
                    </div>

                    <div className="stat-card">
                        <h3>{totalAvailableSeats}</h3>
                        <p>Available seats</p>
                    </div>

                    <div className="stat-card">
                        <h3>{registrations.length}</h3>
                        <p>Registrations</p>
                    </div>

                    <div className="stat-card">
                        <h3>{fullyBookedTalks}</h3>
                        <p>Fully booked talks</p>
                    </div>
                </div>

                {!allTalksHaveValidDuration && (
                    <p>Warning: some talks have an invalid duration.</p>
                )}
            </section>
        );
    }
}

export default ConferenceStatistics;
