import React, { Component } from "react";

class RegistrationPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attendeeName: "",
            email: "",
            scheduleId: props.schedule.length > 0 ? String(props.schedule[0].id) : "",
            message: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            message: ""
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { attendeeName, email, scheduleId } = this.state;
        const fields = [attendeeName, email, scheduleId];

        if (!fields.every(field => field.trim() !== "")) {
            this.setState({ message: "Please fill in all fields." });
            return;
        }

        const result = this.props.onRegister(attendeeName, email, scheduleId);

        this.setState({ message: result.message });

        if (result.success) {
            this.setState({ attendeeName: "", email: "" });
        }
    };

    render() {
        const { schedule } = this.props;
        const { attendeeName, email, scheduleId, message } = this.state;

        return (
            <section>
                <h2>Visitor Registration</h2>

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="attendeeName"
                        placeholder="Full name"
                        value={attendeeName}
                        onChange={this.handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleChange}
                    />

                    <select
                        name="scheduleId"
                        value={scheduleId}
                        onChange={this.handleChange}
                    >
                        {schedule.map(talk => (
                            <option key={talk.id} value={talk.id} disabled={talk.availableSeats === 0}>
                                {talk.title} ({talk.availableSeats} seats left)
                            </option>
                        ))}
                    </select>

                    <button type="submit" disabled={schedule.length === 0}>
                        Register
                    </button>
                </form>

                {message && <p>{message}</p>}
            </section>
        );
    }
}

export default RegistrationPanel;
