import GoogleMapReact from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';

const LocationPicker: SFC<{}> = () => (
    <div style={{ width: 200, height: 200 }}>
        <GoogleMapReact
            bootstrapURLKeys={{
                // TODO: Restrict Google Maps API key
                key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                language: 'nl',
            }}
            defaultCenter={{ lat: 51.4473811, lng: 5.4877141 }}
            defaultZoom={17}
            onClick={(...params) => console.log(params)}
        />
    </div>
);

export default LocationPicker;
