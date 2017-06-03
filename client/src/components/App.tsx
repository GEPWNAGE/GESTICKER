import * as React from 'react';
import { SFC } from 'react';
import GoogleMapReact from 'google-map-react';

const App: SFC<{}> = () => (
    <div style={{ width: 400, height: 400 }}>
        <GoogleMapReact
            bootstrapURLKeys={{
                // TODO: Restrict Google Maps API key
                key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                language: 'nl',
            }}
            defaultCenter={{ lat: 51.4473811, lng: 5.4877141 }}
            defaultZoom={17}
        />
    </div>
);

export default App;
