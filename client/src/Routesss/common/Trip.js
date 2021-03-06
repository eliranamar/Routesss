import React from "react";
import axios from "axios";
import Location from "./Location";
import { Route, Redirect } from "react-router-dom";

class Trip extends React.Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	trip: props.trip,
		// 	user: props.user
		// };
		// console.log(this.state.trip);

		this.getTripData = this.getTripData.bind(this);
	}

	getTripData(e) {
		e.preventDefault();
		let that = this;
		let data = {};
		data.name = document.getElementById("trip-name").value;
		data.type = document.querySelector(
			'input[name = "trip-type"]:checked'
		).value;
		data.user_id = that.props.user.id;
		console.log(data);
		axios
			.post("/trip/addtrip", data)
			.then(function(response) {
				// console.log('testttt');
				console.log(response.data);
				data.trip_id = response.data.insertId;
				that.setState({ trip: data });
				that.props.setTripState(data);
			})
			.catch(function(error) {
				console.log(error);
				if (error.request.status === 401) {
					alert("UNAUTHORIZED. PLEASE LOGIN");
					// history.pushState(null, null, '/');
					// return <Redirect to="/" />;
				}
			});
	}

	render() {
		if (this.props.trip.trip_id) {
			// console.log(this.state.trip);
			// console.log(this.state.trip.id);
			// history.pushState(null, null, '/trip/'+"3"+'/addlocation');
			return <Location setTripState={this.props.setTripState} trip={this.props.trip} />;
		} else {
			return (
				<div id="trip-box" className="container">
					<div className="center-block text-center">
						<form id="add-trip" action="" onSubmit={this.getTripData}>
							<h3>Add Your Trip!</h3>
							<h4>Enter You Trip Name:</h4>
							<fieldset>
								<input
									id="trip-name"
									className="form-control"
									placeholder="Your trip name"
									type="text"
									minLength="3"
									tabIndex="1"
									required
									autoFocus
								/>
							</fieldset>
							<h5>Which Kind Of Traveler Are You?</h5>
							<label className="radio-inline">
								<input
									placeholder="Trip Name``"
									required
									type="radio"
									name="trip-type"
									value="Couple"
								/>Couple | 
								<i className="fa fa-user" />
								<i className="fa fa-user" />
							</label>
							<label className="radio-inline">
								<input type="radio" name="trip-type" value="Friends" />Friends
								Group | 
								<i className="fa fa-users"></i>
							</label>
							<label className="radio-inline">
								<input type="radio" name="trip-type" value="Solo" />Solo
								Traveler | 
								<i className="fa fa-user" />
							</label>
							<br />
							<hr />
							<fieldset>
								<button
									type="submit"
									className="btn btn-primary btn-square"
									data-submit="...Sending"
								>
									Create Trip !
								</button>
							</fieldset>
						</form>
					</div>
					<hr />
				</div>
			);
		}
	}
}

export default Trip;
