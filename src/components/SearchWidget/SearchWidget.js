import React, { Component, Fragment } from 'react';
import PlaceInput from './PlaceInput/PlaceInput';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import Grid from '@material-ui/core/Grid';
import DatePicker from './DatePicker/DatePicker';
import es from 'date-fns/locale/es';

class SearchWidget extends Component {
  state = {
    places: [],
    destinationPlaces: [],
    origin: null,
    destination: null,
    departureDate: new Date(),
    returnDate: null,
  }

  async componentDidMount() {
    const placesEndpoint = 'https://m.clickbus.com.mx/api/v1/places.json'; // CAMBIAR A ENV VARIABLE
    const res = await fetch(placesEndpoint);
    const jsonRes = await res.json();
    const places = jsonRes.items;
    const normalizedPlaces = places.reduce((acc, place) => {
      acc[place.id] = place;
      return acc;
    }, {});
    this.setState({ places, normalizedPlaces });
  }

  handleChange = context => async (place, actionMeta) => {
    const { id, slug } = place;
    this.setState({ [context]: slug })
    if (id !== undefined && context === 'origin') { // CAMBIAR A ENV VARIABLE
      const adjacencyEndpoint = `https://api.clickbus.com.mx/api/v1/adjacencylistplace?parameter=departure&placeId=${id}`;
      const res = await fetch(adjacencyEndpoint, {
        headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xpY2tidXMifQ==.YjVjNGRjM2QyYTIwMDkwY2FjNTY1YzJmOTQ4NzRhNTUyNjIwNWM2NWVjOWNlMDYwNWI2ZDAxNjQ0MTcwYTg3Yg==' }
      });
      const adjacencyList = await res.json();
      const destinationPlaces = adjacencyList.reduce((acc, place) =>
        this.state.normalizedPlaces[place.arrival]
        ? [...acc, this.state.normalizedPlaces[place.arrival]]
        : acc, []);
      this.setState({ destinationPlaces });
    }
  };

  handleDateChange = context => date => {
    this.setState({ [context]: date });
  }

  render() {
    const {
      places,
      destinationPlaces,
      departureDate,
      returnDate
    } = this.state;
    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={es}
      >
        <Grid container spacing={24 /* USAR  theme SPACING */} direction="column">
          <Grid item>
            <PlaceInput
              name="origen"
              places={places}
              handleChange={this.handleChange('origin')}
            />
          </Grid>
          <Grid item>
            <PlaceInput
              name="destino"
              places={destinationPlaces}
              handleChange={this.handleChange('destination')}
            />
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={6}>
                <DatePicker
                  handleDateChange={this.handleDateChange('departureDate')}
                  value={departureDate}
                  maxDate={returnDate || undefined}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  handleDateChange={this.handleDateChange('returnDate')}
                  value={returnDate}
                  minDate={departureDate}
                  returning
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

export default SearchWidget;
