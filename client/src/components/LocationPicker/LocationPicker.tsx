import GoogleMapReact from 'google-map-react';
import * as React from 'react';
import { SFC } from 'react';

import * as styles from './LocationPicker.scss';

const LocationPicker: SFC<{}> = () => (
    <div className={styles.wrapper}>
        <GoogleMapReact
            bootstrapURLKeys={{
                // TODO: Restrict Google Maps API key
                key: 'AIzaSyAU-Gj-e6WgMYQOA_dsSwX_2yHalMZ_8qU',
                language: 'nl',
            }}
            defaultCenter={{ lat: 51.4473811, lng: 5.4877141 }}
            defaultZoom={17}
            onClick={(...params: any[]) => console.log(params)}
        />
    </div>
);

export default LocationPicker;
