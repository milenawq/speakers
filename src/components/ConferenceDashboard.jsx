import React, { Component } from "react";
import SpeakersList from "./SpeakersList";
import ScheduleList from "./ScheduleList";
import RegistrationPanel from "./RegistrationPanel";
import ConferenceStatistics from "./ConferenceStatistics";

class ConferenceDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speakers: [
                { id: 1, name: "Katerina Petrova", specialization: "AI", experience: 5, rating: 4.5 },
                { id: 2, name: "Ivan Kovalenko", specialization: "Web", experience: 7, rating: 4.7 },
                { id: 3, name: "Maria Shevchenko", specialization: "Security", experience: 4, rating: 4.8 },
                { id: 4, name: "Oleksii Bondar", specialization: "Web", experience: 6, rating: 4.6 }
            ],
            schedule: [
                { id: 1, title: "Introduction to AI", category: "AI", duration: 45, availableSeats: 20, speakerId: 1 },
                { id: 2, title: "Modern React", category: "Web", duration: 60, availableSeats: 15, speakerId: 2 },
                { id: 3, title: "Cybersecurity Basics", category: "Security", duration: 40, availableSeats: 10, speakerId: 3 },
                { id: 4, title: "Advanced Web Development", category: "Web", duration: 50, availableSeats: 12, speakerId: 4 }
            ],
            registrations: [],
            searchQuery: "",
            selectedSpecialization: "All",
            selectedCategory: "All",
            speakerSort: "rating",
            scheduleSort: "title"
        };
    }

    handleSearch = event => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSpecializationChange = event => {
        this.setState({ selectedSpecialization: event.target.value });
    };

    handleCategoryChange = event => {
        this.setState({ selectedCategory: event.target.value });
    };

    handleSpeakerSortChange = event => {
        this.setState({ speakerSort: event.target.value });
    };

    handleScheduleSortChange = event => {
        this.setState({ scheduleSort: event.target.value });
    };

    handleRegistration = (attendeeName, email, scheduleId) => {
        const { schedule, registrations } = this.state;
        const talk = schedule.find(item => item.id === Number(scheduleId));

        if (!attendeeName.trim() || !email.trim() || !talk) {
            return { success: false, message: "Fill in all fields." };
        }

        if (talk.availableSeats <= 0) {
            return { success: false, message: "No seats available." };
        }

        const alreadyRegistered = registrations.some(registration =>
            registration.email.toLowerCase() === email.trim().toLowerCase() &&
            registration.scheduleId === talk.id
        );

        if (alreadyRegistered) {
            return { success: false, message: "You are already registered for this talk." };
        }

        const newRegistration = {
            id: Date.now(),
            attendeeName: attendeeName.trim(),
            email: email.trim().toLowerCase(),
            scheduleId: talk.id
        };

        const updatedSchedule = schedule.map(item =>
            item.id === talk.id
                ? { ...item, availableSeats: item.availableSeats - 1 }
                : item
        );

        this.setState({
            schedule: updatedSchedule,
            registrations: [...registrations, newRegistration]
        });

        return { success: true, message: "Registration successful!" };
    };

    resetFilters = () => {
        this.setState({
            searchQuery: "",
            selectedSpecialization: "All",
            selectedCategory: "All",
            speakerSort: "rating",
            scheduleSort: "title"
        });
    };

    render() {
        const {
            speakers,
            schedule,
            registrations,
            searchQuery,
            selectedSpecialization,
            selectedCategory,
            speakerSort,
            scheduleSort
        } = this.state;

        return (
            <div className="dashboard">
                <h1>Professional Conference</h1>

                <div className="global-search">
                    <input
                        type="text"
                        placeholder="Search speakers and talks..."
                        value={searchQuery}
                        onChange={this.handleSearch}
                    />
                    <button onClick={this.resetFilters}>Reset filters</button>
                </div>

                <SpeakersList
                    speakers={speakers}
                    searchQuery={searchQuery}
                    selectedSpecialization={selectedSpecialization}
                    speakerSort={speakerSort}
                    onSpecializationChange={this.handleSpecializationChange}
                    onSortChange={this.handleSpeakerSortChange}
                />

                <ScheduleList
                    schedule={schedule}
                    speakers={speakers}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    scheduleSort={scheduleSort}
                    onCategoryChange={this.handleCategoryChange}
                    onSortChange={this.handleScheduleSortChange}
                />

                <ConferenceStatistics
                    speakers={speakers}
                    schedule={schedule}
                    registrations={registrations}
                />

                <RegistrationPanel
                    schedule={schedule}
                    onRegister={this.handleRegistration}
                />
            </div>
        );
    }
}

export default ConferenceDashboard;

