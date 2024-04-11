import Timetable from "react-calendar"
import './styles.css'
import 'react-calendar/dist/Calendar.css'

import { useState } from "react";

function Calendar() {
	const [value, onChange] = useState(new Date());

	const onSaveDates = () => {}

	return (
		<div className="full-screen flex">
			<h1 style={{ marginBottom: "1rem" }}>React Calendar</h1>
			<Timetable 
                className="timetable"
				onChange={onChange}
				value={value}
				defaultView="month"
				returnValue="range"
				showDoubleView={true}
				selectRange={true}
			/>
			<button
				style={{ padding: ".5rem 1rem", marginTop: "1rem" }}
				onClick={onSaveDates}>
				Save
			</button>
			{new Date(value[0]).toDateString() !== "Invalid Date" && (
				<div style={{ padding: "1rem" }}>
					<p style={{ marginBottom: "1rem" }}>
						<strong>Selected dates are:</strong>
					</p>
					<p style={{ marginBottom: "1rem" }}>
						<strong>From:</strong> {new Date(value[0]).toDateString()}
					</p>
					<p>
						<strong>To:</strong> {new Date(value[1]).toDateString()}
					</p>
				</div>
			)}
		</div>
	);
}

export default Calendar;